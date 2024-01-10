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
  thumbnail:
    'https://emea-solution-engineering-demo-hahn.sitecoresandbox.cloud/api/public/content/5c68ccd0b1b14eccb3bd37153b272daf?v=dd57d56b',
  group: 'Search',
  required: [],
  properties: {
    title: { type: 'string', title: 'Title' },
    numberOfResultsPerPage: { type: 'number', title: 'Number of Results per Page' },
    rfkId: { type: 'string', title: 'rfkId' },
  },
  ui: {},
});
