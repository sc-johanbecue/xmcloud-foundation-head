import React, { useEffect, useState } from 'react';
import { Field, Text as JSSText } from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Box,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Button,
  HStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
  Tag,
} from '@chakra-ui/react';
import { CachedMe, ComposedMe } from 'src/services/Ordercloud/AccountService';
import { useRouter } from 'next/router';
import { Rating } from 'src/shared/_rating';

interface Fields {
  Title: Field<string>;
  Comments: Comment[];
}

interface Comment {
  fields: {
    Comment: Field<string>;
    User: Field<string>;
    Title: Field<string>;
    ReviewDate: Field<string>;
    Flagged: {
      value: boolean;
    };
  };
}

type CommentProps = {
  params: { [key: string]: string };
  fields: Fields;
  rendering: {
    dataSource: string;
  };
};

const CommentsDefaultComponent = (props: CommentProps): JSX.Element => (
  <div className={`component comments ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Comments</span>
    </div>
  </div>
);

export const Default = (props: CommentProps): JSX.Element => {
  const color = useColorModeValue('black', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const labelColor = useColorModeValue('gray.700', 'gray.200');
  const focusBorderColor = useColorModeValue('brand.500', 'brand.200');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = props.params.RenderingIdentifier;
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const router = useRouter();
  const toast = useToast();
  const [me, setMe] = useState<ComposedMe>();

  useEffect(() => {
    async function GetMe() {
      const tmpMe = await CachedMe.read();
      if (tmpMe && !(tmpMe?.isAnon ?? true)) {
        setMe(tmpMe);
      }
    }
    GetMe();
  }, []);

  async function submitReview() {
    const currentLang = router.locale;
    const result = await fetch(process.env.NEXT_PUBLIC_CREATE_COMMENT_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Language: currentLang,
        Title: title,
        Comment: comment,
        Email: me?.Profile?.Email,
        Username: me?.Profile?.FirstName + ' ' + me?.Profile?.LastName,
        Parent: props.rendering.dataSource,
      }),
    });
    setTitle('');
    setComment('');
    onClose();

    toast({
      title: 'Comment Created',
      description: result.ok
        ? 'Your comment is now under review. Once it is checked and approved you will see it here again.'
        : 'Some error occured. Please try again later or contact the website admin',
      status: result.ok ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  if (props.fields) {
    return (
      <>
        <Box
          className={`component comments ${props.params.styles}`}
          id={id ? id : undefined}
          mb={3}
          mt={2}
        >
          <Stack spacing="12">
            <Stack spacing={{ base: '8' }}>
              <Heading
                fontSize={{ base: '2.5rem', md: '3.5rem' }}
                fontWeight="semibold"
                color={color}
              >
                <JSSText field={props.fields.Title} />
              </Heading>
              <HStack spacing="4">
                <Button size="lg" variant="outline" alignSelf="center">
                  See all reviews
                </Button>
                {me?.isAnon ?? true ? (
                  <></>
                ) : (
                  <Button size="lg" colorScheme="brand" onClick={onOpen}>
                    Write a review
                  </Button>
                )}
              </HStack>
            </Stack>
            {props.fields.Comments.length == 0 ? (
              <Box>
                <Text>There are no comments available at the moment...</Text>
              </Box>
            ) : (
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                columnGap="12"
                rowGap={{ base: '10', md: '12' }}
              >
                {props.fields.Comments.map((element, key) => {
                  const publicationDateValue = element.fields.ReviewDate.value;
                  const publicationDate = new Date(
                    publicationDateValue ? publicationDateValue : ''
                  );
                  return (
                    <Box key={key}>
                      <Stack spacing="2.5">
                        <Stack direction="row" spacing="3">
                          <Rating defaultValue={5} size="lg" />
                          <Heading size="md" fontWeight="bold" color={color}>
                            <JSSText field={element.fields.Title} />
                            {element.fields.Flagged.value ? (
                              <Tag ml={2} size={'md'} variant="solid" colorScheme="red">
                                FLAGGED
                              </Tag>
                            ) : (
                              <></>
                            )}
                          </Heading>
                        </Stack>
                        <Text>
                          {' '}
                          <JSSText field={element.fields.Comment} />
                        </Text>
                        <Text color={textColor} fontSize="md">
                          <>
                            by <JSSText field={element.fields.User} />,{' '}
                            {publicationDate.toLocaleDateString()} -{' '}
                            {publicationDate.toLocaleTimeString()}
                          </>
                        </Text>
                      </Stack>
                    </Box>
                  );
                })}
              </SimpleGrid>
            )}
          </Stack>
        </Box>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
          isCentered
          blockScrollOnMount={false}
          trapFocus={false}
        >
          <ModalOverlay />
          <ModalContent borderRadius="xl" mx={{ base: '2.5', lg: '16' }} overflow="hidden">
            <ModalCloseButton
              top="0"
              right="0"
              size="lg"
              borderRadius="none"
              borderBottomLeftRadius="md"
            />
            <ModalBody
              px={{ base: '5', md: '12', lg: '16' }}
              py={{ base: '10', md: '12', lg: '16' }}
              pb={{ base: '6' }}
            >
              <Stack spacing="6">
                <Heading fontSize="2xl" fontWeight="semibold" color={color}>
                  Write a review
                </Heading>
                <Box>
                  <Stack spacing="6">
                    <FormControl id="name">
                      <FormLabel color={labelColor}>Name</FormLabel>
                      <Input
                        name="name"
                        disabled={true}
                        placeholder="Your name"
                        value={me?.Profile?.FirstName + ' ' + me?.Profile?.LastName}
                        focusBorderColor={focusBorderColor}
                      />
                    </FormControl>

                    <FormControl id="email">
                      <FormLabel color={labelColor}>Email</FormLabel>
                      <Input
                        name="email"
                        type="email"
                        disabled={true}
                        placeholder="Your email address"
                        value={me?.Profile?.Email}
                        focusBorderColor={focusBorderColor}
                      />
                    </FormControl>

                    {/* <FormControl id="rating">
                      <FormLabel color={labelColor}>Rating</FormLabel>
                      <Rating defaultValue={2} size="xl" />
                    </FormControl> */}

                    <FormControl id="title">
                      <FormLabel color={labelColor}>Title</FormLabel>
                      <Input
                        name="title"
                        placeholder="Your title"
                        focusBorderColor={focusBorderColor}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>

                    <FormControl id="comment">
                      <FormLabel color={labelColor}>Comment</FormLabel>
                      <Textarea
                        name="comment"
                        placeholder="Your comment"
                        rows={4}
                        focusBorderColor={focusBorderColor}
                        resize="none"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="brand"
                      alignSelf="start"
                      size="lg"
                      onClick={submitReview}
                    >
                      Submit review
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return <CommentsDefaultComponent {...props} />;
};
