import React from 'react';
import {
  ImageField,
  RichTextField,
  RichText,
  Image,
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: RichTextField;
  Text: RichTextField;
  Image: ImageField;
}

type HomeBuddySurpriseBlockProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddySurpriseBlockDefaultComponent = (
  props: HomeBuddySurpriseBlockProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddySurpriseBlockProps): JSX.Element => {
  if (props.fields) {
    const phSurpriseList = `surpriseList-${props.params.DynamicPlaceholderId}`;

    return (
      <section className="surpriseBlock py-11 py-lg-12" data-analytics-surprise-block>
        <div className="container">
          <h3 className="mb-2 font-weight-bold text-center">
            <RichText field={props.fields.Title} />
          </h3>
          <p className="h4 text-center mb-6 font-weight-medium">
            <RichText field={props.fields.Text} />
          </p>
          <div className="surpriseBlock__inner defaultGrid">
            <ul className="checkList checkList_surpriseBlock defaultGrid">
              <Placeholder name={phSurpriseList} rendering={props.rendering} />
            </ul>
            <div className="surpriseBlock__mediaWrap">
              <picture>
                <source
                  type="image/webp"
                  media="(min-width: 576px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/main-pic-desktop@2x.webp 2x, https://www.homebuddy.com/static/walk-in-showers/main-pic-desktop.webp"
                />
                <source
                  type="image/jpg"
                  media="(min-width: 576px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/main-pic-desktop@2x.jpg 2x, https://www.homebuddy.com/static/walk-in-showers/main-pic-desktop.jpg"
                />
                <source
                  type="image/webp"
                  media="(min-width: 320px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/main-pic-mobile@2x.webp 2x, https://www.homebuddy.com/static/walk-in-showers/main-pic-mobile.webp"
                />
                <source
                  type="image/jpg"
                  media="(min-width: 320px)"
                  srcSet="https://www.homebuddy.com/static/walk-in-showers/main-pic-mobile@2x.jpg 2x, https://www.homebuddy.com/static/walk-in-showers/main-pic-mobile.jpg"
                />
                <Image
                  field={props.fields.Image}
                  className="surpriseBlock__img w-100 rounded d-block"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <HomeBuddySurpriseBlockDefaultComponent {...props} />;
};
