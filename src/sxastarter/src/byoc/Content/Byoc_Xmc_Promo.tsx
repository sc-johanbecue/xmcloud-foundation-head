import * as FEAAS from '@sitecore-feaas/clientside/react';
import { SharedPromo } from 'src/shared/_promo';
import { MyImage, MyLink } from 'src/shared/types/sharedTypes';

export default function XmcPromo(props: {
  PromoIcon: MyImage;
  PromoIcon2: MyImage;
  PromoText: string;
  PromoText2: string;
  PromoText3: string;
  PromoLink: MyLink;
  datasources?: FEAAS.DataScopes;
}) {
  return (
    <SharedPromo
      PromoText={props.PromoText}
      PromoText2={props.PromoText2}
      PromoLink={props.PromoLink}
      PromoIcon={props.PromoIcon}
    />
  );
}
FEAAS.registerComponent(XmcPromo, {
  name: 'xmc_promo',
  title: 'XMC Promo',
  description: 'Promo Component',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Content',
  required: [],
  properties: {},
  ui: {},
});
