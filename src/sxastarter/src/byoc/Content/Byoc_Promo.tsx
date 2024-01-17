import * as FEAAS from '@sitecore-feaas/clientside/react';
import { SharedPromo } from 'src/shared/_promo';
import { MyImage, MyLink } from 'src/shared/types/sharedTypes';

export default function ManualPromo(props: {
  title?: string;
  text?: string;
  imageLink?: string;
  ctaLink?: string;
  ctaText?: string;
  datasources?: FEAAS.DataScopes;
}) {
  const customLink: MyLink = {
    href: props?.ctaLink ?? '',
    text: props?.ctaText ?? '',
  };
  const customImage: MyImage = {
    alt: props?.title ?? '',
    src: props?.imageLink ?? '',
  };
  return (
    <SharedPromo
      PromoText={props.title}
      PromoText2={props.text}
      PromoLink={customLink}
      PromoIcon={customImage}
    />
  );
}
FEAAS.registerComponent(ManualPromo, {
  name: 'manual promo',
  title: 'Manual Promo',
  description: 'Promo Component',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'Content',
  required: [],
  properties: {
    title: { type: 'string', title: 'Title' },
    text: { type: 'string', title: 'Description' },
    imageLink: { type: 'string', title: 'Image' },
    ctaLink: { type: 'string', title: 'CTA Link' },
    ctaText: { type: 'string', title: 'CTA Text' },
  },
  ui: {
    title: {
      'ui:autofocus': true,
      'ui:emptyValue': '',
      'ui:placeholder': 'Write some title',
    },
  },
});
