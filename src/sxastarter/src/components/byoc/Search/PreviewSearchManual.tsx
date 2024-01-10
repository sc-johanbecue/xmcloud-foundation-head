import { Box } from '@chakra-ui/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { MyPreviewSearchCli } from 'components/shared/search/MyPreviewSearchManual';
export default function PreviewSearchManual(props: {
  rfkId: string;
  datasources?: FEAAS.DataScopes;
}) {
  // const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;

  return (
    <>
      {props?.rfkId ? <MyPreviewSearchCli rfkId={props.rfkId} /> : <Box>Please add some rfkId</Box>}
    </>
  );
}
FEAAS.registerComponent(PreviewSearchManual, {
  name: 'Preview Search Manual',
  title: 'Preview Search Manual',
  description: 'Preview Search Powered by Sitecore Search',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Search',
  required: [],
  properties: {
    rfkId: { type: 'string', title: 'rfkId' },
  },
  ui: {},
});
