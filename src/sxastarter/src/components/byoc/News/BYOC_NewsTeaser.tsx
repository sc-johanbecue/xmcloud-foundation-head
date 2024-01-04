import { Badge, Heading } from '@chakra-ui/react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { useEffect, useState } from 'react';
import { GetTagItem, TagItem } from 'src/services/XMCloud/TagService';
import { Text, Image } from '@chakra-ui/react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
export default function NewsTeaser(props: {
  Title: string;
  Content: string;
  Tag: string;
  Abstract: string;
  PublicationDate: string;
  Image: {
    src: string;
  };
  datasources?: FEAAS.DataScopes;
}) {
  // const datasource = props?.datasources ? Object.values(props?.datasources)[0] : undefined;
  const { sitecoreContext } = useSitecoreContext();
  const language = sitecoreContext?.language ?? 'en';
  const mappedPublicationDate = new Date(props.PublicationDate);
  const [tagItem, setTagItem] = useState<TagItem>();
  useEffect(() => {
    async function loadTagItem() {
      const tagItem = await GetTagItem(props?.Tag ?? '', language);
      if (tagItem) {
        setTagItem(tagItem);
      }
    }
    loadTagItem();
  }, []);

  return (
    <div className={'component promo'}>
      <div className="component-content">
        <div className="field-promoicon">
          <Image src={props?.Image?.src} />
        </div>
        <div className="promo-text">
          <Heading>{props?.Title}</Heading>
          <div>
            <Badge>{tagItem?.item?.title?.jsonValue?.value}</Badge>
          </div>
          <div>{mappedPublicationDate?.toLocaleDateString()}</div>
          <Text>{props?.Abstract}</Text>
          <div className="field-promolink">{/* <a href={props.fields.Url}>DETAILS</a> */}</div>
        </div>
      </div>
    </div>
  );
}
FEAAS.registerComponent(NewsTeaser, {
  name: 'News Teaser',
  title: 'News Teaser',
  description: 'News Teaser based on News Page Data',
  thumbnail: 'https://feaasstatic.blob.core.windows.net/assets/thumbnails/byoc.svg',
  group: 'News',
  required: [],
  properties: {},
  ui: {},
});
