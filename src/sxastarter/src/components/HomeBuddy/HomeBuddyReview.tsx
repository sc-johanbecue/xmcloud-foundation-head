import React from 'react';
import {
  ImageField,
  LinkField,
  TextField,
  RichText,
  Text,
  Link as JssLink,
  Image,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  ReviewBy: TextField;
  Quote: RichTextField;
  Contractor: LinkField;
  Text: RichTextField;
  Image: ImageField;
  Rating: ImageField;
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
      <li className="splide__slide d-flex flex-column">
        <div className="reviewCard w-100 d-flex flex-column flex-grow-1">
          <div className="reviewCard__inner bg-white d-flex flex-grow-1 flex-column align-items-center w-100 px-6 px-xl-10 py-8">
            <Image
              field={props.fields.Image}
              className="d-block mb-4"
              aria-hidden="true"
              width="72"
              height="72"
              loading="lazy"
            />
            <h4 className="h4 text-center mb-4 font-weight-medium">
              <Text field={props.fields.ReviewBy} />
            </h4>
            <Image
              field={props.fields.Rating}
              className="d-block mb-4"
              width="152"
              height="24"
              loading="lazy"
            />
            <div className="reviewCard__info d-flex flex-column align-items-center flex-grow-1 mb-md-0">
              <p className="h5 mb-4 font-weight-medium text-center">
                <RichText field={props.fields.Quote} />
              </p>
              <JssLink
                field={props.fields.Contractor}
                rel="nofollow noopener"
                className="defaultLink defaultLink_small defaultLink_blue mt-auto"
              ></JssLink>
            </div>
          </div>
        </div>
      </li>
    );
  }

  return <HomeBuddyReviewDefaultComponent {...props} />;
};
