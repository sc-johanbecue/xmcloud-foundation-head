import React, { useState } from 'react';
import {
  NextImage as JssImage,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Box, Center } from '@chakra-ui/react';
import FsLightbox from 'fslightbox-react';

interface Fields {
  Image: ImageField;
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
}

type ImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props.params.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Banner = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;
  const classHeroBannerEmpty =
    isPageEditing && props.fields?.Image?.value?.class === 'scEmptyImage'
      ? 'hero-banner-empty'
      : '';
  const id = props.params.RenderingIdentifier;

  return (
    <Box
      mb={2}
      height={{ base: 600, sm: 100, md: 250, lg: 350, xl: 600 }}
      className={`component hero-banner ${props.params.styles} ${classHeroBannerEmpty}`}
      id={id ? id : undefined}
    >
      <Center>
        {/* <div className="component-content sc-sxa-image-hero-banner" style={backgroundStyle}> */}
        {/* {sitecoreContext.pageEditing ? <JssImage field={modifyImageProps} /> : ''} */}
        <JssImage loading={'eager'} field={props.fields.Image} quality={80} fill={true} />
        {/* </div> */}
      </Center>
    </Box>
  );
};

export const Default = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (props.fields) {
    const Image = () => (
      <JssImage
        field={props.fields.Image}
        quality={80}
        sizes={'35vw'}
        style={{ objectFit: 'contain', height: 'full', width: 'full' }}
      />
    );
    const id = props.params.RenderingIdentifier;

    return (
      <Box className={`component image ${props.params.styles}`} id={id ? id : undefined} pb={2}>
        {sitecoreContext.pageState === 'edit' || !props.fields.TargetUrl?.value?.href ? (
          <Box height={'full'} width={'full'} position={'relative'}>
            <Image />
          </Box>
        ) : (
          <Box>
            <JssLink field={props.fields.TargetUrl}>
              <Box height={'full'} width={'full'} position={'relative'}>
                <Image />
              </Box>
            </JssLink>
          </Box>
        )}
      </Box>
    );
  }

  return <ImageDefault {...props} />;
};

export const Lightbox = (props: ImageProps): JSX.Element => {
  const [toggler, setToggler] = useState(false);
  const id = props.params.RenderingIdentifier;

  if (props.fields) {
    return (
      <div className={`component image ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <JssImage
            onClick={() => setToggler(!toggler)}
            field={props.fields.Image}
            className="lightbox-image"
          />
          <FsLightbox toggler={toggler} sources={[props.fields.Image.value?.src as string]} />
        </div>
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
