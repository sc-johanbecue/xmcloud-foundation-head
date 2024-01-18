import { Box, Heading } from '@chakra-ui/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import MyBasicSearch from 'src/shared/search/BasicSearch/MyBasicSearch';
import { MyBasicSearchManual } from 'src/shared/search/MyBasicSearchManual';
export default function BasicSearch(props: {
  rfkId: string;
  title: string;
  withoutSdk: boolean;
  withoutSdkUrl: string;
  datasources?: FEAAS.DataScopes;
}) {
  // const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;

  return (
    <Box>
      <Box>
        <Heading>{props.title}</Heading>
      </Box>
      {props.withoutSdk ? (
        <MyBasicSearchManual rfkId={props.rfkId} endpointUrl={props.withoutSdkUrl} />
      ) : props?.rfkId ? (
        <MyBasicSearch rfkId={props.rfkId} />
      ) : (
        <Box>Please add some rfkId</Box>
      )}
    </Box>
  );
}
FEAAS.registerComponent(BasicSearch, {
  name: 'Basic Search',
  title: 'Basic Search',
  description: 'Basic Search Powered by Sitecore Search',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Search',
  required: [],
  properties: {
    title: { type: 'string', title: 'Title' },
    rfkId: { type: 'string', title: 'rfkId' },
    withoutSdk: { type: 'boolean', title: 'Without SDK?' },
    withoutSdkUrl: { type: 'string', title: 'Endpoint Url for non-sdk approach' },
  },
  ui: {},
});
