import React from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image: ImageField;
}

type HomeBuddyReviewProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyReviewDefaultComponent = (props: HomeBuddyReviewProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyReviewProps): JSX.Element => {
  if (props.fields) {
    return (
      <li className="splide__slide">
        <div className="galleryCard">
          <picture>
            {/* <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="https://www.homebuddy.com/static/walk-in-showers/gallery/1-desktop@2x.webp 2x, /static/walk-in-showers/gallery/1-desktop.webp"
            />
            <source
              type="image/jpeg"
              media="(min-width: 576px)"
              srcSet="https://www.homebuddy.com/static/walk-in-showers/gallery/1-desktop@2x.jpg 2x, /static/walk-in-showers/gallery/1-desktop.jpg"
            />
            <source
              type="image/webp"
              media="(min-width: 320px)"
              srcSet="https://www.homebuddy.com/static/walk-in-showers/gallery/1-mobile@2x.webp 2x, /static/walk-in-showers/gallery/1-mobile.webp"
            />
            <source
              type="image/jpeg"
              media="(min-width: 320px)"
              srcSet="https://www.homebuddy.com/static/walk-in-showers/gallery/1-mobile@2x.jpg 2x, /static/walk-in-showers/gallery/1-mobile.jpg"
            /> */}
            <Image
              field={props.fields.Image}
              className="galleryCard__img d-block w-100"
              aria-hidden="true"
              loading="lazy"
            />
          </picture>
        </div>
      </li>
    );
  }

  return <HomeBuddyReviewDefaultComponent {...props} />;
};
