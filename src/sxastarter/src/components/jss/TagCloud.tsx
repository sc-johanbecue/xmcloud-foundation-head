import React, { useEffect, useState } from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { TagCloud } from 'react-tagcloud';
import { Box, Center, Heading } from '@chakra-ui/react';

interface Tag {
  value: string;
  count: number;
}

interface Fields {
  data: {
    datasource: {
      Tags: {
        jsonValue: Field<string>;
      };
    };
    contextItem: {
      Content: {
        jsonValue: Field<string>;
      };
    };
  };
}

type TagCloudProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const TagCloudDefaultComponent = (props: TagCloudProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Tag Cloud</span>
    </div>
  </div>
);

export const Default = (props: TagCloudProps): JSX.Element => {
  const [mappedTags, setMappedTags] = useState<Tag[]>([]);

  useEffect(() => {
    const tmpMappedTags: Tag[] = [];
    props?.fields?.data?.datasource?.Tags?.jsonValue?.value?.split('\r\n').map((element) => {
      const regex = new RegExp(element, 'gi');
      const numberOccurrences =
        props?.fields?.data?.contextItem?.Content?.jsonValue?.value?.match(regex)?.length ?? 0;
      if (numberOccurrences > 0) {
        tmpMappedTags.push({ value: element, count: numberOccurrences });
      }
      setMappedTags(tmpMappedTags);
    });
  }, [
    mappedTags,
    props?.fields?.data?.contextItem?.Content?.jsonValue?.value,
    props?.fields?.data?.datasource?.Tags?.jsonValue?.value,
  ]);

  const customRenderer = (tag, size, color) => (
    <span
      key={tag.value}
      style={{
        animation: 'blinker 3s linear infinite',
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${size / 2}em`,
        border: `2px solid ${color}`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
      }}
    >
      {tag.value}
    </span>
  );

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component tagCloud ${props.params.styles}`} id={id ? id : undefined}>
        <Box p={4} mt={14}>
          <Center pb={4}>
            <Heading>Tag Cloud: </Heading>
          </Center>
          <TagCloud
            disableRandomColor={true}
            minSize={12}
            maxSize={30}
            tags={mappedTags}
            randomSeed={42}
            style={{ textAlign: 'center' }}
            customRenderer={customRenderer}
          />
        </Box>
      </div>
    );
  }

  return <TagCloudDefaultComponent {...props} />;
};
