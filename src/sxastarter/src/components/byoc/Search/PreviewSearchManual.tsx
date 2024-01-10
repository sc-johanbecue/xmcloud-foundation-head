import { Box, Heading } from '@chakra-ui/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { MyPreviewSearchManual } from 'components/shared/search/MyPreviewSearchManual';
export default function PreviewSearchManual(props: {
  rfkId: string;
  title: string;
  numberOfResultsPerPage: number;
  datasources?: FEAAS.DataScopes;
}) {
  // const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;

  return (
    <Box>
      <Box>
        <Heading>{props.title}</Heading>
      </Box>
      {props?.rfkId ? (
        <MyPreviewSearchManual
          rfkId={props.rfkId}
          numberOfResultsPerPage={props.numberOfResultsPerPage}
        />
      ) : (
        <Box>Please add some rfkId</Box>
      )}
    </Box>
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
    title: { type: 'string', title: 'Title' },
    numberOfResultsPerPage: { type: 'number', title: 'Number of Results per Page' },
    rfkId: { type: 'string', title: 'rfkId' },
  },
  ui: {},
});
