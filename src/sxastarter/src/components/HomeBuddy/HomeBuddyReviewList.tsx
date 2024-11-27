import React from 'react';
import {
  TextField,
  Text,
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
}

type HomeBuddyReviewListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyReviewListDefaultComponent = (props: HomeBuddyReviewListProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyReviewListProps): JSX.Element => {
  const phReviewList = `reviewList-${props.params.DynamicPlaceholderId}`;

  return (
    <section className="reviews bg-deepBlue05 py-11 py-lg-12">
      <h3 className="px-4 mb-2 text-center">
        <Text field={props.fields.Title} />
      </h3>
      <div className="reviews__inner">
        <div
          id="reviewsGallery"
          className="splide defaultSlider defaultSlider__deepBlue06DotBorder mx-auto mb-8"
        >
          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">
              <svg
                className="splide__arrowImg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.7598 16.8496L12.3854 4.47524L10.2641 6.59656L20.5171 16.8496L10.2641 27.1027L12.3854 29.224L24.7598 16.8496Z"
                  fill="#FA8C16"
                />
              </svg>
            </button>
            <button className="splide__arrow splide__arrow--next">
              <svg
                className="splide__arrowImg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M24.7598 16.8496L12.3854 4.47524L10.2641 6.59656L20.5171 16.8496L10.2641 27.1027L12.3854 29.224L24.7598 16.8496Z"
                  fill="#FA8C16"
                />
              </svg>
            </button>
          </div>
          <div className="splide__track">
            <ul className="splide__list">
              <Placeholder name={phReviewList} rendering={props.rendering} />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  return <HomeBuddyReviewListDefaultComponent {...props} />;
};
