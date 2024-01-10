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
} from '@chakra-ui/react';
import { useState } from 'react';
import { Search, SearchResult } from 'src/services/Search/SearchService';
import { SearchRequestModel } from './types/searchRequestModel';
import { useRouter } from 'next/router';

interface PreviewSearchRequestModel {
  rfkId: string;
}

export const MyPreviewSearchCli = ({ rfkId }: PreviewSearchRequestModel) => {
  const country = 'ae';
  const language = 'en';
  const [searchResults, setSearchResults] = useState<SearchResult>();
  const [query, setQuery] = useState<string>();
  const router = useRouter();

  async function DoSearch() {
    const searchRequestModel: SearchRequestModel = {
      context: {
        locale: {
          country: country,
          language: language,
        },
        page: {
          uri: router.pathname,
        },
      },
      widget: {
        items: [
          {
            entity: 'content',
            rfk_id: rfkId,
            search: {
              content: '',
              query: {
                keyphrase: query ?? '',
              },
            },
          },
        ],
      },
    };
    const searchResult = await Search(searchRequestModel);
    if (searchResult) {
      setSearchResults(searchResult);
    }
  }

  return (
    <>
      <Box>
        <Input
          variant="outline"
          placeholder="Outline"
          onChange={(e) => {
            setQuery(e.target.value);
            DoSearch();
          }}
        />
      </Box>
      <Box>
        <SimpleGrid columns={3} spacing={10}>
          {searchResults?.widgets[0].content.map((element, key) => {
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
      </Box>
    </>
  );
};
