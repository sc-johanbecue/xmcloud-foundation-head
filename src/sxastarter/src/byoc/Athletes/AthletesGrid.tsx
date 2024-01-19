import * as FEAAS from '@sitecore-feaas/clientside/react';
import { Box, Button, Center, Heading, SimpleGrid } from '@chakra-ui/react';
import { CardWithAvatar } from 'src/shared/_cardWithAvatar';
import { UserInfo } from 'src/shared/_userInfo';

export default function AthletesGrid(props: {
  title: string;
  limit: number;
  datasources?: FEAAS.DataScopes;
}) {
  const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;
  const results = datasource?.data?.allAthlete?.results;
  const numberResultsToShow = props?.limit <= 0 ? results.length : props?.limit;
  return (
    <Box>
      <Center mb={2}>
        <Heading size={'2xl'}>{props.title}</Heading>
      </Center>
      <SimpleGrid columns={3} spacing={10}>
        {results?.slice(0, numberResultsToShow)?.map((element: any, key: string) => {
          const imageUrl = element?.featuredImage?.results[0]?.fileUrl as string;
          const name = element?.athleteName;
          const quote = element?.athleteQuote;
          return (
            <CardWithAvatar key={key} avatarProps={{ src: imageUrl, name }}>
              <UserInfo mt="3" name={name} bio={quote} isVerified={false} />
              {/* <FollowerCount my="4" count={followerCount} /> */}
              <Button variant="tertiary" colorScheme="brand" rounded="full" size="lg" width="full">
                Details
              </Button>
            </CardWithAvatar>
          );
        })}
      </SimpleGrid>
      {/* <div>{JSON.stringify(datasource?.data?.allAthlete?.results[0], null, 2)}</div> */}
    </Box>
  );
}
FEAAS.registerComponent(AthletesGrid, {
  name: 'Athletes Grid',
  title: 'Athletes Grid',
  description: 'Get Athletes from CHUB 1',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Athletes',
  required: [],
  properties: {
    title: { type: 'string', title: 'Title' },
    limit: {
      type: 'integer',
      title: 'Limit',
      default: 6,
    },
  },
  ui: {
    title: {
      'ui:autofocus': true,
      'ui:emptyValue': '',
      'ui:placeholder': 'Write some title',
    },
  },
});
