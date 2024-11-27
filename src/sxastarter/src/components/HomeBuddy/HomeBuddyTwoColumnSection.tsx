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
  SubTitle1: TextField;
  SubTitle2: TextField;
  Text1: RichTextField;
  Text2: RichTextField;
  Image1: ImageField;
  Image2: ImageField;
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
      <section className="safeSolution bg-deepBlue05 py-11 py-lg-12" data-analytics-safe-solution>
        <div className="container">
          <h3 className="mb-6 text-center">
            <Text field={props.fields.Title} />
          </h3>
          <div className="safeSolution__grid">
            <div className="safeSolution__card">
              <picture>
                {/* <source
                  type="image/webp"
                  media="(min-width: 576px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/safe-solution-1-desktop@2x.webp 2x, /static/walk-in-showers/safe-solution-1-desktop.webp"
                />
                <source
                  type="image/jpeg"
                  media="(min-width: 576px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/safe-solution-1-desktop@2x.jpg 2x, /static/walk-in-showers/safe-solution-1-desktop.jpg"
                />
                <source
                  type="image/webp"
                  media="(min-width: 320px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/safe-solution-1-mobile@2x.webp 2x, /static/walk-in-showers/safe-solution-1-mobile.webp"
                />
                <source
                  type="image/jpeg"
                  media="(min-width: 320px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/safe-solution-1-mobile@2x.jpg 2x, /static/walk-in-showers/safe-solution-1-mobile.jpg"
                /> */}
                <Image
                  field={props.fields.Image1}
                  className="safeSolution__img d-block w-100 rounded"
                  loading="lazy"
                />
              </picture>
              <h4 className="mt-4 mt-lg-5">
                <Text field={props.fields.SubTitle1} />
              </h4>
              <p className="safeSolution__txt font-weight-medium mt-2">
                <RichText field={props.fields.Text1} />
              </p>
            </div>
            <div className="safeSolution__card">
              <picture>
                {/* <source
                  type="image/webp"
                  media="(min-width: 576px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/safe-solution-2-desktop@2x.webp 2x, /static/walk-in-showers/safe-solution-2-desktop.webp"
                />
                <source
                  type="image/jpeg"
                  media="(min-width: 576px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/safe-solution-2-desktop@2x.jpg 2x, /static/walk-in-showers/safe-solution-2-desktop.jpg"
                />
                <source
                  type="image/webp"
                  media="(min-width: 320px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/safe-solution-2-mobile@2x.webp 2x, /static/walk-in-showers/safe-solution-2-mobile.webp"
                />
                <source
                  type="image/jpeg"
                  media="(min-width: 320px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/safe-solution-2-mobile@2x.jpg 2x, /static/walk-in-showers/safe-solution-2-mobile.jpg"
                /> */}
                <Image
                  field={props.fields.Image2}
                  className="safeSolution__img d-block w-100 rounded"
                  loading="lazy"
                />
              </picture>
              <h4 className="mt-4 mt-lg-5">
                <Text field={props.fields.SubTitle2} />
              </h4>
              <p className="safeSolution__txt font-weight-medium mt-2">
                <RichText field={props.fields.Text2} />
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <HomeBuddySingleColumnSectionDefaultComponent {...props} />;
};
