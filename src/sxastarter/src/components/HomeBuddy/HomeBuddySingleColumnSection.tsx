import React from 'react';
import {
  ImageField,
  TextField,
  Text,
  RichTextField,
  RichText,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Text: RichTextField;
  Image: ImageField;
}

type HomeBuddySingleColumnSectionProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddySingleColumnSectionDefaultComponent = (
  props: HomeBuddySingleColumnSectionProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddySingleColumnSectionProps): JSX.Element => {
  if (props.fields) {
    return (
      <section className="walkNewShower py-11 py-lg-12" data-analytics-walk-new-shower>
        <div className="container">
          <h3 className="font-weight-bold mb-2 text-center">
            <Text field={props.fields.Title} />
          </h3>
          <p className="h4 font-weight-medium text-center mb-6">
            <RichText field={props.fields.Text} />
          </p>
          <picture>
            <source
              type="image/webp"
              media="(min-width: 576px)"
              srcSet="https://www.homebuddy.com/static/walk-in-showers/walk-in-new-shower-desktop@2x.webp 2x, /static/walk-in-showers/walk-in-new-shower-desktop.webp"
            />
            <source
              type="image/jpeg"
              media="(min-width: 576px)"
              srcSet="https://www.homebuddy.com/static/walk-in-showers/walk-in-new-shower-desktop@2x.jpg 2x, /static/walk-in-showers/walk-in-new-shower-desktop.jpg"
            />
            <source
              type="image/webp"
              media="(min-width: 320px)"
              srcSet="https://www.homebuddy.com/static/walk-in-showers/walk-in-new-shower-mobile@2x.webp 2x, /static/walk-in-showers/walk-in-new-shower-mobile.webp"
            />
            <source
              type="image/jpeg"
              media="(min-width: 320px)"
              srcSet="https://www.homebuddy.com/static/walk-in-showers/walk-in-new-shower-mobile@2x.jpg 2x, /static/walk-in-showers/walk-in-new-shower-mobile.jpg"
            />
            <Image
              field={props.fields.Image}
              className="walkNewShower__img d-block w-100 rounded"
              loading="lazy"
            />
          </picture>
        </div>
      </section>
    );
  }

  return <HomeBuddySingleColumnSectionDefaultComponent {...props} />;
};
