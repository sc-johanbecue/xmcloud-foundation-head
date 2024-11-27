import {
  NextImage as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  Text as JSSText,
  ImageField,
  Field,
  LinkField,
  useSitecoreContext,
  LayoutServicePageState,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  Button,
  Text,
  Box,
  HStack,
  RadioGroup,
  Container,
  CardHeader,
  useBreakpointValue,
} from '@chakra-ui/react';
import { DamImageHandler } from './integration/DamImageHandler';
import { useState } from 'react';
import Image from 'next/image';
import { ExtractRenderingParams } from 'src/services/Head/RenderingParamsService';

interface Fields {
  Image: ImageField;
  Title: Field<string>;
  Subtitle: Field<string>;
  Cta: LinkField;
  Text: Field<string>;
  ExternalImage: Field<string>;
}

type CardProps = {
  params: { [key: string]: string };
  fields: Fields;
  rendering: {
    dataSource: string;
  };
};

const PromoDefaultComponent = (props: CardProps): JSX.Element => (
  <div className={`component genericCard ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Card</span>
    </div>
  </div>
);

export const Default = (props: CardProps): JSX.Element => {
  return ImageTopHalfBordered(props);
};

export const ImageTopHalfBordered = (props: CardProps): JSX.Element => {
  const { color, variant, buttonColor, buttonVariant, textColor } = ExtractRenderingParams(
    props.params
  );
  const id = props.params.RenderingIdentifier;
  const [externalImage, setExternalImage] = useState<string>(
    props?.fields?.ExternalImage?.value ?? ''
  );
  const { sitecoreContext } = useSitecoreContext();
  const imageHeight = useBreakpointValue({
    base: 625,
    xs: 480,
    sm: 768,
    md: 992,
    lg: 625,
    xl: 625,
    '2xl': 625,
  });
  const imageWidth = useBreakpointValue({
    base: 625,
    xs: 480,
    sm: 768,
    md: 992,
    lg: 625,
    xl: 625,
    '2xl': 625,
  });

  if (props.fields) {
    return (
      <Box
        className={`component genericCard ${props.params.styles}`}
        // px={6}
        // pb={4}
        pt={2}
        id={id ? id : undefined}
      >
        <DamImageHandler
          itemId={props.rendering.dataSource}
          fieldName="ExternalImage"
          onImageChanged={setExternalImage}
        />
        <Card height={'100%'} colorScheme={color} variant={variant} color={textColor}>
          <CardHeader rounded="lg" padding={0}>
            {externalImage != '' && externalImage.startsWith('http') ? (
              sitecoreContext.pageState == LayoutServicePageState.Normal ? (
                <Image
                  src={externalImage}
                  alt={props?.fields?.Title?.value}
                  sizes="50vw"
                  width={imageHeight}
                  height={imageWidth}
                  quality={80}
                />
              ) : (
                <img
                  src={externalImage}
                  alt={props?.fields?.Title?.value}
                  sizes="50vw"
                  width={imageHeight}
                  height={imageWidth}
                />
              )
            ) : (
              <JssImage
                quality={80}
                field={props.fields.Image}
                sizes="50vw"
                width={imageWidth}
                height={imageHeight}
              />
            )}
          </CardHeader>
          <CardBody padding={0}>
            <Stack padding={4} mt="3" spacing="1">
              <Heading fontSize={{ base: '3xl', sm: '2xl', md: '3xl' }}>
                <JSSText field={props.fields.Title} />
              </Heading>
              <Text
                as="div"
                color={variant == 'solid' ? textColor : color + '.600'}
                fontSize={{ base: 'lg', sm: 'md', md: 'lg' }}
                fontWeight={'bold'}
                noOfLines={sitecoreContext.pageEditing ? 100 : 4}
              >
                <JSSText field={props.fields.Subtitle} />
              </Text>
              <Text noOfLines={sitecoreContext.pageEditing ? 100 : 4} as="div" fontSize={'xl'}>
                <JssRichText field={props.fields.Text} />
              </Text>
            </Stack>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter rounded="lg" paddingX={0}>
            <HStack width={'full'}>
              <Divider ml={4} variant={variant} borderColor="fff" />
              <RadioGroup defaultValue="left">
                {sitecoreContext.pageEditing ? (
                  <Button
                    rounded="full"
                    variant={buttonVariant}
                    colorScheme={buttonColor}
                    size={{ base: 'md', sm: 'lg', md: 'xl' }}
                    p={4}
                  >
                    <JssLink field={props.fields.Cta} />
                  </Button>
                ) : (
                  <Button
                    rounded="full"
                    variant={buttonVariant}
                    colorScheme={buttonColor}
                    size={{ base: 'md', sm: 'lg', md: 'xl' }}
                    href={props.fields.Cta?.value?.href ?? ''}
                    as="a"
                    p={4}
                  >
                    {props.fields.Cta?.value?.text ?? props.fields.Cta?.value?.title}
                  </Button>
                )}
              </RadioGroup>
              <Divider mr={4} variant={variant} borderColor="fff" />
            </HStack>
          </CardFooter>
        </Card>
      </Box>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const ImageBottom = (props: CardProps): JSX.Element => {
  const { color, variant, buttonColor, buttonVariant, textColor } = ExtractRenderingParams(
    props.params
  );
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <Box
        pb={4}
        className={`component genericCard ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <Card height={'100%'} colorScheme={color} variant={variant} color={textColor}>
          <CardBody padding={0}>
            <Stack padding={4} mt="3" spacing="1">
              <Heading size="xxl">
                <JSSText field={props.fields.Title} />
              </Heading>
              <Text
                as="div"
                color={variant == 'solid' ? textColor : color + '.600'}
                fontSize="2xl"
                fontWeight={'bold'}
                noOfLines={5}
              >
                <JSSText field={props.fields.Subtitle} />
              </Text>
              <Text noOfLines={sitecoreContext.pageEditing ? 100 : 5} as="div" fontSize={'xl'}>
                <JssRichText field={props.fields.Text} />
              </Text>
            </Stack>
            <JssImage quality={80} field={props.fields.Image} />
          </CardBody>
          {/* <Divider /> */}
          <CardFooter paddingX={0}>
            <Container>
              <HStack>
                <Divider ml={4} variant={variant} borderColor="fff" />
                <RadioGroup defaultValue="left">
                  {sitecoreContext.pageEditing ? (
                    <Button
                      rounded="full"
                      variant={buttonVariant}
                      colorScheme={buttonColor}
                      size={{ base: 'xl', sm: 'lg' }}
                      p={4}
                    >
                      <JssLink field={props.fields.Cta} />
                    </Button>
                  ) : (
                    <Button
                      rounded="full"
                      variant={buttonVariant}
                      colorScheme={buttonColor}
                      size={{ base: 'xl', sm: 'lg' }}
                      href={props.fields.Cta?.value?.href ?? ''}
                      as="a"
                      p={4}
                    >
                      {props.fields.Cta?.value?.text ?? props.fields.Cta?.value?.title}
                    </Button>
                  )}
                </RadioGroup>
                <Divider mr={4} variant={variant} borderColor="fff" />
              </HStack>
            </Container>
          </CardFooter>
        </Card>
      </Box>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const ImageTopFullBordered = (props: CardProps): JSX.Element => {
  const { color, variant, buttonColor, buttonVariant, textColor } = ExtractRenderingParams(
    props.params
  );
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <Box
        pb={4}
        className={`component genericCard ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <Card height={'100%'} colorScheme={color} variant={variant} color={textColor}>
          <CardBody padding={0}>
            <JssImage quality={80} field={props.fields.Image} />
            <Stack padding={4} mt="3" spacing="1">
              <Heading size="xxl">
                <JSSText field={props.fields.Title} />
              </Heading>
              <Text
                as="div"
                color={variant == 'solid' ? textColor : color + '.600'}
                fontSize="2xl"
                fontWeight={'bold'}
              >
                <JSSText field={props.fields.Subtitle} />
              </Text>
              <Text noOfLines={sitecoreContext.pageEditing ? 100 : 5} as="div" fontSize={'xl'}>
                <JssRichText field={props.fields.Text} />
              </Text>
            </Stack>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter paddingX={0}>
            <Container>
              <HStack>
                <Divider ml={4} variant={variant} borderColor="fff" />
                <RadioGroup defaultValue="left">
                  {sitecoreContext.pageEditing ? (
                    <Button
                      rounded="full"
                      variant={buttonVariant}
                      colorScheme={buttonColor}
                      size={'xl'}
                      p={4}
                    >
                      <JssLink field={props.fields.Cta} />
                    </Button>
                  ) : (
                    <Button
                      rounded="full"
                      variant={buttonVariant}
                      colorScheme={buttonColor}
                      size={'xl'}
                      href={props.fields.Cta?.value?.href ?? ''}
                      as="a"
                      p={4}
                    >
                      {props.fields.Cta?.value?.text ?? props.fields.Cta?.value?.title}
                    </Button>
                  )}
                </RadioGroup>
                <Divider mr={4} variant={variant} borderColor="fff" />
              </HStack>
            </Container>
          </CardFooter>
        </Card>
      </Box>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const ImageLeft = (props: CardProps): JSX.Element => {
  const { color, variant, buttonColor, buttonVariant, textColor } = ExtractRenderingParams(
    props.params
  );
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <Box
        pb={4}
        className={`component genericCard ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          colorScheme={color}
          variant={variant}
          height={'100%'}
          color={textColor}
        >
          <Box width={'full'} position={'relative'}>
            <JssImage field={props.fields.Image} quality={80} width={300} />
          </Box>

          <Stack>
            <CardBody>
              <Heading size="xl">
                {' '}
                <JSSText field={props.fields.Title} />
              </Heading>

              <Text
                as="div"
                color={variant == 'solid' ? textColor : color + '.600'}
                fontSize="2xl"
                fontWeight={'bold'}
              >
                <JSSText field={props.fields.Subtitle} />
              </Text>
              <Text
                noOfLines={sitecoreContext.pageEditing ? 100 : 5}
                as={'div'}
                py="2"
                fontSize={'3xl'}
              >
                <JssRichText field={props.fields.Text} />
              </Text>
            </CardBody>

            <CardFooter>
              <Container>
                <HStack>
                  <Divider ml={4} variant={variant} borderColor="fff" />
                  <RadioGroup defaultValue="left">
                    {sitecoreContext.pageEditing ? (
                      <Button
                        rounded="full"
                        variant={buttonVariant}
                        colorScheme={buttonColor}
                        size={'xl'}
                        p={4}
                      >
                        <JssLink field={props.fields.Cta} />
                      </Button>
                    ) : (
                      <Button
                        rounded="full"
                        variant={buttonVariant}
                        colorScheme={buttonColor}
                        size={'xl'}
                        href={props.fields.Cta?.value?.href ?? ''}
                        as="a"
                        p={4}
                      >
                        {props.fields.Cta?.value?.text ?? props.fields.Cta?.value?.title}
                      </Button>
                    )}
                  </RadioGroup>
                  <Divider mr={4} variant={variant} borderColor="fff" />
                </HStack>
              </Container>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const ImageRight = (props: CardProps): JSX.Element => {
  const { color, variant, buttonColor, buttonVariant, textColor } = ExtractRenderingParams(
    props.params
  );
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <Box
        pb={4}
        height={'100%'}
        className={`component genericCard ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          colorScheme={color}
          variant={variant}
          color={textColor}
          height={'100%'}
        >
          <Stack>
            <CardBody>
              <Heading size="xl">
                <JSSText field={props.fields.Title} />
              </Heading>

              <Text
                as="div"
                color={variant == 'solid' ? textColor : color + '.600'}
                fontSize="2xl"
                fontWeight={'bold'}
              >
                <JSSText field={props.fields.Subtitle} />
              </Text>
              <Text
                noOfLines={sitecoreContext.pageEditing ? 100 : 5}
                as={'div'}
                py="2"
                fontSize={'3xl'}
              >
                <JssRichText field={props.fields.Text} />
              </Text>
            </CardBody>

            <CardFooter>
              <Container>
                <HStack>
                  <Divider ml={4} variant={variant} borderColor="fff" />
                  <RadioGroup defaultValue="left">
                    {sitecoreContext.pageEditing ? (
                      <Button
                        rounded="full"
                        variant={buttonVariant}
                        colorScheme={buttonColor}
                        size={'xl'}
                        p={4}
                      >
                        <JssLink field={props.fields.Cta} />
                      </Button>
                    ) : (
                      <Button
                        rounded="full"
                        variant={buttonVariant}
                        colorScheme={buttonColor}
                        size={'xl'}
                        href={props.fields.Cta?.value?.href ?? ''}
                        as="a"
                        p={4}
                      >
                        {props.fields.Cta?.value?.text ?? props.fields.Cta?.value?.title}
                      </Button>
                    )}
                  </RadioGroup>
                  <Divider mr={4} variant={variant} borderColor="fff" />
                </HStack>
              </Container>
            </CardFooter>
          </Stack>

          <Box width={'full'} position={'relative'} float={'right'}>
            <JssImage field={props.fields.Image} quality={80} width={350} />
          </Box>
        </Card>
      </Box>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const TextOnly = (props: CardProps): JSX.Element => {
  const { color, variant, buttonColor, buttonVariant, textColor } = ExtractRenderingParams(
    props.params
  );
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <Box
        py={2}
        className={`component genericCard ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <Card
          height={'100%'}
          colorScheme={color}
          variant={variant}
          color={textColor}
          mx={2}
          rounded={'10px'}
        >
          <CardBody padding={0}>
            <Stack padding={4} mt="3" spacing="1">
              <Heading size="xxl" textAlign={'center'}>
                <JSSText field={props.fields.Title} />
              </Heading>
              <Text
                textAlign={'center'}
                as="div"
                color={variant == 'solid' ? textColor : color + '.600'}
                fontSize="2xl"
                fontWeight={'bold'}
              >
                <JSSText field={props.fields.Subtitle} />
              </Text>
              <Text noOfLines={sitecoreContext.pageEditing ? 100 : 5} as="div">
                <JssRichText field={props.fields.Text} />
              </Text>
            </Stack>
          </CardBody>
          {/* <Divider /> */}
          {(sitecoreContext.pageEditing || props.fields.Cta.value.href != '') && (
            <CardFooter paddingX={0}>
              <Container>
                <HStack>
                  <Divider ml={4} variant={variant} borderColor="fff" />
                  <RadioGroup defaultValue="left">
                    {sitecoreContext.pageEditing ? (
                      <Button
                        rounded="full"
                        variant={buttonVariant}
                        colorScheme={buttonColor}
                        size={'xl'}
                        p={4}
                      >
                        <JssLink field={props.fields.Cta} />
                      </Button>
                    ) : (
                      <Button
                        rounded="full"
                        variant={buttonVariant}
                        colorScheme={buttonColor}
                        size={'xl'}
                        href={props.fields.Cta?.value?.href ?? ''}
                        as="a"
                        p={4}
                      >
                        {props.fields.Cta?.value?.text ?? props.fields.Cta?.value?.title}
                      </Button>
                    )}
                  </RadioGroup>
                  <Divider mr={4} variant={variant} borderColor="fff" />
                </HStack>
              </Container>
            </CardFooter>
          )}
        </Card>
      </Box>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
