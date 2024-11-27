import React from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image: ImageField;
}

type HomeBuddyFeatureImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyFeatureImageDefaultComponent = (props: HomeBuddyFeatureImageProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyFeatureImageProps): JSX.Element => {
  if (props.fields) {
    return (
      <li className="features__mediaItem">
        <picture>
          {/* <source
            type="image/webp"
            media="(min-width: 320px)"
            srcSet="/static/walk-in-showers/features/1-desktop@2x.webp 2x, /static/walk-in-showers/features/1-desktop.webp"
          />
          <source
            type="image/jpg"
            media="(min-width: 320px)"
            srcSet="/static/walk-in-showers/features/1-desktop@2x.jpg 2x, /static/walk-in-showers/features/1-desktop.jpg"
          /> */}
          <Image
            field={props.fields.Image}
            className="features__img d-block w-100"
            loading="lazy"
          />
        </picture>
      </li>
    );
  }

  return <HomeBuddyFeatureImageDefaultComponent {...props} />;
};
