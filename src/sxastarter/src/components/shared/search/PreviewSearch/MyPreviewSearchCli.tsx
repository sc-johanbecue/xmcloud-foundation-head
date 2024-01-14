import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Text,
  Link,
  Badge,
  Center,
} from '@chakra-ui/react';

import type { PreviewSearchInitialState } from '@sitecore-search/react';
import { WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { Presence, PreviewSearch } from '@sitecore-search/ui';

import { LoaderAnimation, LoaderContainer, PreviewSearchStyled } from './styled';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

type ArticleModel = {
  id: string;
  name: string;
  image_url: string;
  url: string;
  source_id?: string;
  type: string;
  description: string;
};

type InitialState = PreviewSearchInitialState<'itemsPerPage'>;

export const PreviewSearchBasicComponent = ({ defaultItemsPerPage = 6 }) => {
  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult,
    queryResult: { isFetching, isLoading },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
  });

  const loading = isLoading || isFetching;
  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      onKeyphraseChange({ keyphrase: target.value });
    },
    [onKeyphraseChange]
  );
  return (
    <PreviewSearchStyled.Root>
      <PreviewSearchStyled.Input
        onChange={keyphraseHandler}
        autoComplete="off"
        placeholder="Type to search..."
      />
      <PreviewSearchStyled.Content ref={widgetRef}>
        <Presence present={loading}>
          <LoaderContainer>
            <LoaderAnimation
              aria-busy={loading}
              aria-hidden={!loading}
              focusable="false"
              role="progressbar"
              viewBox="0 0 20 20"
            >
              <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
            </LoaderAnimation>
          </LoaderContainer>
        </Presence>
        <Presence present={!loading}>
          <PreviewSearch.Results defaultQueryResult={queryResult}>
            {({ isFetching: loading, data: { content: articles = [] } = {} }) => (
              <PreviewSearchStyled.Items data-loading={loading}>
                <Presence present={loading}>
                  <LoaderContainer>
                    <LoaderAnimation
                      aria-busy={loading}
                      aria-hidden={!loading}
                      focusable="false"
                      role="progressbar"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                    </LoaderAnimation>
                  </LoaderContainer>
                </Presence>
                {!loading &&
                  articles.map((element, index) => (
                    <PreviewSearchStyled.Item key={element.id} asChild>
                      <PreviewSearchStyled.Link
                        href={element.url}
                        onClick={(e) => {
                          e.preventDefault();
                          onItemClick({ id: element.id, index, sourceId: element.source_id });
                          // add redirection or any action
                        }}
                      >
                        <Card
                          key={index}
                          direction={{ base: 'column', sm: 'row' }}
                          overflow="hidden"
                          variant="outline"
                        >
                          <Stack>
                            <CardBody>
                              <Center>
                                <Image
                                  width={'75'}
                                  height={'75'}
                                  mb={4}
                                  objectFit="cover"
                                  src={element.image_url}
                                  alt={element.name}
                                />
                              </Center>
                              <Heading size="md">
                                {element.name}{' '}
                                <Badge
                                  ml="1"
                                  colorScheme="brand"
                                  rounded={'20'}
                                  paddingX={2}
                                  paddingY={1}
                                  fontWeight={'bold'}
                                >
                                  {element.type}
                                </Badge>
                              </Heading>

                              <Text py="2">{element.description}</Text>
                            </CardBody>

                            <CardFooter>
                              <Link href={element.url} isExternal>
                                Read More <ExternalLinkIcon />
                              </Link>
                              {/* <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => {
                            router.push(element.url);
                          }}
                        >
                          DETAILS
                        </Button> */}
                            </CardFooter>
                          </Stack>
                        </Card>
                      </PreviewSearchStyled.Link>
                    </PreviewSearchStyled.Item>
                  ))}
              </PreviewSearchStyled.Items>
            )}
          </PreviewSearch.Results>
        </Presence>
      </PreviewSearchStyled.Content>
    </PreviewSearchStyled.Root>
  );
};
const PreviewSearchBasicWidget = widget(
  PreviewSearchBasicComponent,
  WidgetDataType.PREVIEW_SEARCH,
  'content'
);
export default PreviewSearchBasicWidget;
