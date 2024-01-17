import * as FEAAS from '@sitecore-feaas/clientside/react';
import { useEffect, useState } from 'react';
import { GetTagItem, TagItem } from 'src/services/XMCloud/TagService';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { SharedNewsTeaser } from 'src/shared/_newsTeaser';
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
  const [tagItem, setTagItem] = useState<TagItem>();
  useEffect(() => {
    async function loadTagItem() {
      const tagItem = await GetTagItem(props?.Tag ?? '', language);
      if (tagItem) {
        setTagItem(tagItem);
      }
    }
    loadTagItem();
  }, [language, props?.Tag]);

  return (
    <>
      <SharedNewsTeaser
        publicationDate={props.PublicationDate}
        abstract={props.Abstract}
        image={props?.Image?.src}
        tag={tagItem?.item?.title?.jsonValue?.value ?? props?.Tag}
        title={props?.Title}
      />
      <pre>{JSON.stringify(props.datasources, null, 2)}</pre>
    </>
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
