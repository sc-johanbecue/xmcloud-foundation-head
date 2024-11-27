import React from 'react';
import { ImageField, TextField, Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: TextField;
  Image: ImageField;
}

type HomeBuddySurpriseProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddySurpriseDefaultComponent = (props: HomeBuddySurpriseProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddySurpriseProps): JSX.Element => {
  if (props.fields) {
    return (
      <li className="checkList__item d-flex align-items-center">
        <Image
          field={props.fields.Image}
          className="d-block me-2"
          width="32"
          height="32"
          aria-hidden="true"
          loading="lazy"
        />
        <p className="h4 font-weight-bolder">
          <Text field={props.fields.Text} />
        </p>
      </li>
    );
  }

  return <HomeBuddySurpriseDefaultComponent {...props} />;
};
