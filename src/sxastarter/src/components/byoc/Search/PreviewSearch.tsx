import { Box, Heading } from '@chakra-ui/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import MyPreviewSearchCli from 'components/shared/search/MyPreviewSearchCli';
export default function PreviewSearchCli(props: {
  rfkId: string;
  title: string;
  datasources?: FEAAS.DataScopes;
}) {
  // const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;

  return (
    <Box>
      <Box>
        <Heading>{props.title}</Heading>
      </Box>
      {props?.rfkId ? <MyPreviewSearchCli rfkId={props.rfkId} /> : <Box>Please add some rfkId</Box>}
    </Box>
  );
}
FEAAS.registerComponent(PreviewSearchCli, {
  name: 'Preview Search Cli',
  title: 'Preview Search Cli',
  description: 'Preview Search Powered by Sitecore Search',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Search',
  required: [],
  properties: {
    title: { type: 'string', title: 'Title' },
    rfkId: { type: 'string', title: 'rfkId' },
  },
  ui: {},
});
