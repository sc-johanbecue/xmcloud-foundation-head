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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Search, SearchResult } from 'src/services/Search/SearchService';
import { SearchRequestModel } from './types/searchRequestModel';

interface PreviewSearchRequestModel {
  rfkId: string;
  numberOfResultsPerPage: number;
}

export const MyPreviewSearchManual = ({
  rfkId,
  numberOfResultsPerPage,
}: PreviewSearchRequestModel) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const country = 'ae';
  const language = 'en';
  const overwrittenNumberOfResultsPerPage = numberOfResultsPerPage ?? 9;
  const [searchResults, setSearchResults] = useState<SearchResult>();
  const [query, setQuery] = useState<string>();
  const [page, setPage] = useState<number>();

  async function DoSearch(
    overwrittenQuery: string | undefined,
    overwrittenPage: number | undefined
  ) {
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
              offset: (overwrittenPage - 1) * overwrittenNumberOfResultsPerPage,
              limit: overwrittenNumberOfResultsPerPage,
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
              offset: (overwrittenPage - 1) * overwrittenNumberOfResultsPerPage,
              limit: overwrittenNumberOfResultsPerPage,
              query: {
                keyphrase: overwrittenQuery,
              },
            },
          },
        ],
      },
    };
    const searchResult = await Search(
      overwrittenQuery ? searchRequestModel : searchRequestModelWithoutQuery
    );
    if (searchResult) {
      setSearchResults(searchResult);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    DoSearch('', 0);
  }, []);

  return (
    <>
      <Box>
        <Input
          variant="outline"
          placeholder="Enter Search Term"
          onChange={(e) => {
            setQuery(e.target.value);
            DoSearch(e.target.value, page);
          }}
        />
        <Input
          marginTop={4}
          variant="outline"
          placeholder="Which page?"
          type="number"
          onChange={(e) => {
            setPage(Number(e.target.value));
            DoSearch(e.target.value, Number(e.target.value));
          }}
        />
      </Box>
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
                      objectFit="cover"
                      maxW={{ base: '100%', sm: '200px' }}
                      src={element.image_url}
                      alt={element.name}
                    />

                    <Stack>
                      <CardBody>
                        <Heading size="md">{element.name}</Heading>

                        <Text py="2">{element.description}</Text>
                      </CardBody>

                      <CardFooter>
                        <Button variant="solid" colorScheme="blue">
                          DETAILS
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
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
