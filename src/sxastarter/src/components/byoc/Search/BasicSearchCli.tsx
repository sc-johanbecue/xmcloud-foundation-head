import { Box, Heading } from '@chakra-ui/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import BasicSearchWidget from 'components/shared/search/BasicSearch';
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
      {props?.rfkId ? <BasicSearchWidget rfkId={props.rfkId} /> : <Box>Please add some rfkId</Box>}
    </Box>
  );
}
FEAAS.registerComponent(PreviewSearchCli, {
  name: 'Basic Search Cli',
  title: 'Basic Search Cli',
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
