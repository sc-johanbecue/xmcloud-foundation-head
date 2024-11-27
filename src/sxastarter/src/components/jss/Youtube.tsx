import {
  NextImage as JssImage,
  ImageField,
  Field,
  useSitecoreContext,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { Box } from '@chakra-ui/react';
import { FaRegCirclePlay } from 'react-icons/fa6';

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
      <Box className={`component image ${props.params.styles}`} id={id ? id : undefined}>
        <Box className="component-content">
          <Box
            _hover={{ cursor: 'pointer' }}
            px={2}
            position={'relative'}
            height={{ base: 204, sm: 204, md: 356, lg: 278 }}
            filter="auto"
            brightness="40%"
            py={2}
          >
            <JssImage
              priority={true}
              onClick={() => setToggler(!toggler)}
              field={props?.fields?.Thumbnail}
              fill
              className="youtube-thumbnail"
            />
          </Box>
          {sitecoreContext.pageState === 'edit' ? (
            <Text field={props.fields.TargetUrl} />
          ) : (
            <FsLightbox toggler={toggler} sources={[props.fields?.TargetUrl?.value]} />
          )}
          <Box
            position={'absolute'}
            top={{ base: '35%', sm: '35%', md: '40%' }}
            right={{ base: '40%', sm: '40%', md: '45%' }}
            _hover={{ cursor: 'pointer' }}
          >
            <FaRegCirclePlay
              onClick={() => setToggler(!toggler)}
              color={'lightgray'}
              fontSize={'7rem'}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return <YoutubeDefault {...props} />;
};
