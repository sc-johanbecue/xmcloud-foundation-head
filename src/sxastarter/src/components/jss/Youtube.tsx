import {
  Image as JssImage,
  ImageField,
  Field,
  useSitecoreContext,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { Box } from '@chakra-ui/react';

interface Fields {
  TargetUrl: Field<string>;
  Thumbnail: ImageField;
}

type YoutubeProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const YoutubeDefault = (props: YoutubeProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Youtube</span>
    </div>
  </div>
);

export const Default = (props: YoutubeProps): JSX.Element => {
  return Lightbox(props);
};

export const Lightbox = (props: YoutubeProps): JSX.Element => {
  const [toggler, setToggler] = useState(false);
  const id = props.params.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();

  if (props.fields) {
    return (
      <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <Box _hover={{ cursor: 'pointer' }}>
            <JssImage
              onClick={() => setToggler(!toggler)}
              field={props?.fields?.Thumbnail}
              className="youtube-thumbnail"
            />
            {sitecoreContext.pageState === 'edit' ? (
              <Text field={props.fields.TargetUrl} />
            ) : (
              <FsLightbox toggler={toggler} sources={[props.fields?.TargetUrl?.value]} />
            )}
          </Box>
        </div>
      </div>
    );
  }

  return <YoutubeDefault {...props} />;
};
