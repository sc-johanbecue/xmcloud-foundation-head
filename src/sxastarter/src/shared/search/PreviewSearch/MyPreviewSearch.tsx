import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import type { PreviewSearchInitialState } from '@sitecore-search/react';
import {
  FilterEqual,
  WidgetDataType,
  usePreviewSearch,
  widget,
  Suggestion,
} from '@sitecore-search/react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Center,
  Container,
  Divider,
  Grid,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  GridItem,
  CloseButton,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

type ArticleModel = {
  id: string;
  name: string;
  image_url: string;
  url: string;
  source_id?: string;
  description: string;
  type: string;
};

type InitialState = PreviewSearchInitialState<'itemsPerPage'>;
const mySuggestion: Suggestion = {
  name: 'title_context_aware',
  max: 5,
};

export const PreviewSearchBasicComponent = ({ source, defaultItemsPerPage = 6 }) => {
  const [query, setQuery] = useState('');
  const [doSearch, setDoSearch] = useState<boolean>(false);
  const [isSmallScreen] = useMediaQuery('(max-width: 767px)');
  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult,
    queryResult: { isFetching, isLoading },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      itemsPerPage: isSmallScreen ? 2 : defaultItemsPerPage,
    },
    query: (query) => {
      query
        .getRequest()
        .setSearchLimit(isSmallScreen ? 2 : defaultItemsPerPage)
        .addSearchSuggestion(mySuggestion);

      if (source) {
        //'949429'
        query.getRequest().setSearchFilter(new FilterEqual('rfk_source.source_id', source));
      }
    },
  });

  const loading = isLoading || isFetching;
  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDoSearch(true);
      const target = event.target;
      setQuery(target?.value ?? '');
      const targetValue = target?.value.length < 3 ? '' : target?.value;
      onKeyphraseChange({ keyphrase: targetValue });
    },
    [onKeyphraseChange]
  );

  return (
    <Box position={'relative'}>
      <InputGroup>
        <Input
          type="text"
          value={query}
          onFocus={keyphraseHandler}
          onChange={keyphraseHandler}
          autoComplete="off"
          placeholder="Type to search..."
        />
        <InputRightElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputRightElement>
      </InputGroup>

      {doSearch ? (
        <Box
          position={'absolute'}
          left={'0'}
          width={'full'}
          top={'12'}
          ref={widgetRef}
          backgroundColor={'lightgray'}
          rounded={'5px'}
          padding={2}
          zIndex={99}
          height={'300px'}
          overflowX="auto"
        >
          <Tooltip label="Close Preview Search">
            <CloseButton
              size="xl"
              color={'black'}
              float={'right'}
              onClick={() => {
                setDoSearch(false);
              }}
            />
          </Tooltip>
          {loading ? (
            <>
              <Box width={'full'}>
                <Center>
                  <Spinner variant={'brandPrimary'} size={'xxl'} />
                </Center>
              </Box>
            </>
          ) : (
            <></>
          )}
          {!loading ? (
            <Box paddingTop={1}>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
              >
                <GridItem colSpan={1}>
                  <Box padding={2} color={'black'}>
                    <Heading paddingBottom={4} fontWeight={'bold'} textDecor={'underline'}>
                      Did you mean?
                    </Heading>
                    {queryResult.data?.suggestion ? (
                      queryResult.data?.suggestion['title_context_aware']?.map((index, key) => {
                        return (
                          <Text
                            onClick={() => {
                              setQuery(index.text);
                              onKeyphraseChange({ keyphrase: index.text });
                            }}
                            key={key}
                          >
                            {index.text} ({index.freq})
                          </Text>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Grid
                    templateColumns={{
                      base: 'repeat(1, 1fr)',
                      sm: 'repeat(1, 1fr)',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                    }}
                    gap={2}
                    paddingBottom={2}
                    paddingTop={4}
                    paddingRight={2}
                  >
                    {queryResult.data?.content?.map((article, index) => {
                      return (
                        <Box key={index}>
                          <Card height={'100%'}>
                            <CardBody padding={0}>
                              <Stack padding={4} mt="3" spacing="1">
                                <Heading size="md">
                                  {article.name}{' '}
                                  <Badge
                                    size={'md'}
                                    float={'right'}
                                    padding={1}
                                    rounded={'5px'}
                                    colorScheme="brand"
                                  >
                                    {article.type}
                                  </Badge>
                                </Heading>
                              </Stack>

                              {article?.image_url ? (
                                // <Center>
                                <Box paddingLeft={4}>
                                  <Image
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '50%', height: 'auto' }} // optional
                                    src={article.image_url}
                                    alt={article.name}
                                  />
                                </Box>
                              ) : (
                                // </Center>
                                <></>
                              )}
                              <Text as="div" fontSize={'md'} padding={2} noOfLines={[1, 2]}>
                                {article.description}
                              </Text>
                            </CardBody>
                            {/* <Divider /> */}
                            <CardFooter paddingX={0}>
                              <Container>
                                <HStack>
                                  <Divider colorScheme="brand" />
                                  <RadioGroup defaultValue="left">
                                    <Button size={'sm'} colorScheme="monochromLight">
                                      <Link
                                        href={article.url}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          onItemClick({
                                            id: article.id,
                                            index,
                                            sourceId: article.source_id,
                                          });
                                          Router.push(article.url);
                                        }}
                                      >
                                        DETAILS
                                      </Link>
                                    </Button>
                                  </RadioGroup>
                                  <Divider colorScheme="brand" />
                                </HStack>
                              </Container>
                            </CardFooter>
                          </Card>
                        </Box>
                      );
                    })}
                  </Grid>
                </GridItem>
              </Grid>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};
const MyPreviewSearch = widget(
  PreviewSearchBasicComponent,
  WidgetDataType.PREVIEW_SEARCH,
  'content'
);
export default MyPreviewSearch;
