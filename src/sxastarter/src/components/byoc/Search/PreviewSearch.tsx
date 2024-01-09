import * as FEAAS from '@sitecore-feaas/clientside/react';
import TestWidget from 'components/shared/search/Test';
export default function NewsTeaser(props: { rfkId: string; datasources?: FEAAS.DataScopes }) {
  // const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;

  return (
    <>
      <TestWidget rfkId={props.rfkId} />
    </>
  );
}
FEAAS.registerComponent(NewsTeaser, {
  name: 'Preview Search',
  title: 'Preview Search',
  description: 'Preview Search Powered by Sitecore Search',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Search',
  required: [],
  properties: {
    rfkId: { type: 'string', title: 'rfkId' },
  },
  ui: {},
});
