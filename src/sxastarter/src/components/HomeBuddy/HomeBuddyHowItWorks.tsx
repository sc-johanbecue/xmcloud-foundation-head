import React from 'react';
import {
  ImageField,
  TextField,
  Text,
  Image,
  RichText,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Header: TextField;
  Text: RichTextField;
  Image: ImageField;
}

type HomeBuddyProjectProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyProjectDefaultComponent = (props: HomeBuddyProjectProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyProjectProps): JSX.Element => {
  if (props.fields) {
    return (
      <li className="howItWorks__item d-flex flex-column align-items-center">
        <Image
          field={props.fields.Image}
          className="howItWorks__img d-block mb-4"
          width="96"
          height="96"
          aria-hidden="true"
          loading="lazy"
        />
        <h4 className="howItWorks__itemHdr d-md-flex flex-column justify-content-center d-xl-block text-center h4 font-weight-bolder mb-4">
          <Text field={props.fields.Header} />
        </h4>
        <p className="howItWorks__txt text-center h5 font-weight-medium">
          <RichText field={props.fields.Text} />
        </p>
      </li>
    );
  }

  return <HomeBuddyProjectDefaultComponent {...props} />;
};
