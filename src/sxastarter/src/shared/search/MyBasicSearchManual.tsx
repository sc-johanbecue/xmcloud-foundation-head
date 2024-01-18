import {
  Input,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  SimpleGrid,
  Stack,
  Image,
  Text,
  Center,
  Spinner,
  Divider,
  Link,
  Badge,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Search, SearchResult } from 'src/services/Search/SearchService';
import { SearchRequestModel } from './types/searchRequestModel';
// import { useRouter } from 'next/router';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface BasicSearchRequestModel {
  rfkId: string;
  numberOfResultsPerPage?: number;
  endpointUrl: string;
}

export const MyBasicSearchManual = ({
  rfkId,
  endpointUrl,
  numberOfResultsPerPage,
}: BasicSearchRequestModel) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const country = 'ae';
  const language = 'en';
  const [searchResults, setSearchResults] = useState<SearchResult>();
  const [query, setQuery] = useState<string>();
  const [page, setPage] = useState<number>();
  const initialNumberResultsPerPage = numberOfResultsPerPage ?? 9;
  const [usedNumberResultsPerPage, setUsedNumberResultsPerPage] = useState<number>(
    numberOfResultsPerPage ?? 9
  );
  const [loadMoreTriggered, setLoadMoreTriggered] = useState<boolean>(false);
  // const router = useRouter();

  useEffect(() => {
    async function DoSearch(
      overwrittenQuery: string | undefined,
      overwrittenPage: number | undefined,
      overwrittenNumberResultsPerPage: number | undefined
    ) {
      if (!overwrittenNumberResultsPerPage) {
        overwrittenNumberResultsPerPage = usedNumberResultsPerPage ?? 9;
      }
      if (!overwrittenPage) {
        overwrittenPage = page ?? 1;
      }
      if (!overwrittenQuery) {
        overwrittenQuery = query ?? '';
      }

      setIsLoading(true);
      if (overwrittenQuery.length <= 3) {
        overwrittenQuery = '';
      }

      const searchRequestModelWithoutQuery: SearchRequestModel = {
        context: {
          locale: {
            country: country,
            language: language,
          },
        },
        widget: {
          items: [
            {
              entity: 'content',
              rfk_id: rfkId,
              search: {
                offset: (overwrittenPage - 1) * overwrittenNumberResultsPerPage,
                limit: overwrittenNumberResultsPerPage,
                content: {},
              },
            },
          ],
        },
      };

      const searchRequestModel: SearchRequestModel = {
        context: {
          locale: {
            country: country,
            language: language,
          },
        },
        widget: {
          items: [
            {
              entity: 'content',
              rfk_id: rfkId,
              search: {
                content: {},
                offset: (overwrittenPage - 1) * overwrittenNumberResultsPerPage,
                limit: overwrittenNumberResultsPerPage,
                query: {
                  keyphrase: overwrittenQuery,
                },
              },
            },
          ],
        },
      };
      const searchResult = await Search(
        overwrittenQuery ? searchRequestModel : searchRequestModelWithoutQuery,
        endpointUrl
      );
      if (searchResult) {
        setSearchResults(searchResult);
      }

      setIsLoading(false);
      await delay(10);
      if (loadMoreTriggered) {
        const element = document.getElementById('loadMore');
        element?.scrollIntoView();
      }
      setLoadMoreTriggered(false);
    }

    const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

    DoSearch(query, page, usedNumberResultsPerPage);
  }, [endpointUrl, loadMoreTriggered, page, query, rfkId, usedNumberResultsPerPage]);

  return (
    <>
      <Box>
        <Input
          variant="outline"
          placeholder="Enter Search Term"
          onChange={(e) => {
            setUsedNumberResultsPerPage(initialNumberResultsPerPage);
            setQuery(e.target.value);
            //DoSearch(e.target.value, page, usedNumberResultsPerPage);
          }}
        />
        <Input
          marginTop={4}
          variant="outline"
          placeholder="Which page?"
          type="number"
          onChange={(e) => {
            setUsedNumberResultsPerPage(initialNumberResultsPerPage);
            setPage(Number(e.target.value));
            //DoSearch(e.target.value, Number(e.target.value), usedNumberResultsPerPage);
          }}
        />
      </Box>
      <Divider />
      <Box paddingTop={4}>
        {isLoading ? (
          <Box paddingTop={4}>
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="brand"
                size="xl"
              />
            </Center>
          </Box>
        ) : searchResults?.widgets?.at(0)?.content ? (
          <>
            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }} spacing={10}>
              {searchResults?.widgets?.at(0)?.content?.map((element, key) => {
                return (
                  <Card
                    key={key}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow="hidden"
                    variant="outline"
                  >
                    <Image
                      objectFit="none"
                      maxW={{ base: '100%', sm: '200px' }}
                      src={element.image_url}
                      alt={element.name}
                    />

                    <Stack>
                      <CardBody>
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
                          Read More <ExternalLinkIcon mx="2px" />
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
                );
              })}
            </SimpleGrid>
            <Divider />
            <Box
              marginTop={4}
              id="loadMore"
              hidden={
                searchResults?.widgets?.at(0)?.content.length ==
                searchResults?.widgets?.at(0)?.total_item
              }
            >
              <Center>
                <Button
                  size={'xl'}
                  onClick={() => {
                    const newNumberResultsPerPage =
                      usedNumberResultsPerPage + initialNumberResultsPerPage;
                    setLoadMoreTriggered(true);
                    setUsedNumberResultsPerPage(newNumberResultsPerPage);
                    // DoSearch(query, page, newNumberResultsPerPage);
                  }}
                  isLoading={isLoading}
                  colorScheme="brand"
                  padding={2}
                  border={'rounded'}
                  variant="solid"
                >
                  Load More
                </Button>
              </Center>
            </Box>
            <Box>
              <Center>
                <Text fontSize={'xxl'} fontWeight={'bold'}>
                  {searchResults?.widgets?.at(0)?.content.length} out of{' '}
                  {searchResults?.widgets?.at(0)?.total_item} results
                </Text>
              </Center>
            </Box>
          </>
        ) : (
          <Box paddingTop={4}>
            <Center>
              <Heading size={'3xl'}>...no results</Heading>
            </Center>
          </Box>
        )}
      </Box>
    </>
  );
};
