import { Box, Heading } from '@chakra-ui/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { IsSearchActivated } from 'src/services/Head/FeatureStatusService';
import MyPreviewSearch from 'src/shared/search/PreviewSearch/MyPreviewSearch';
export default function PreviewSearch(props: {
  rfkId: string;
  title: string;
  source: string;
  datasources?: FEAAS.DataScopes;
}) {
  // const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;

  return (
    <Box>
      <Box>
        <Heading>{props.title}</Heading>
      </Box>
      {!IsSearchActivated() ? (
        <></>
      ) : props?.rfkId ? (
        <MyPreviewSearch rfkId={props.rfkId} source={props.source} />
      ) : (
        <Box>Please add some rfkId</Box>
      )}
    </Box>
  );
}
FEAAS.registerComponent(PreviewSearch, {
  name: 'Preview Search',
  title: 'Preview Search',
  description: 'Preview Search Powered by Sitecore Search',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Search',
  required: [],
  properties: {
    title: { type: 'string', title: 'Title' },
    rfkId: { type: 'string', title: 'rfkId' },
    source: { type: 'string', title: 'source' },
  },
  ui: {},
});
