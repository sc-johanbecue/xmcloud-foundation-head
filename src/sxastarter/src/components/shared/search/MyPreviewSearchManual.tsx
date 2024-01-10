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
}

export const MyPreviewSearchManual = ({ rfkId }: PreviewSearchRequestModel) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const country = 'ae';
  const language = 'en';
  const [searchResults, setSearchResults] = useState<SearchResult>();

  async function DoSearch(overwrittenQuery: string) {
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
    DoSearch('');
  }, []);

  return (
    <>
      <Box>
        <Input
          variant="outline"
          placeholder="Outline"
          onChange={(e) => {
            DoSearch(e.target.value);
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
            <SimpleGrid columns={3} spacing={10}>
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
