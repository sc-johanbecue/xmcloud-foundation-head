import React from 'react';
import { ImageField, TextField, Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Count: TextField;
  Text: TextField;
  Image: ImageField;
}

type HomeBuddyTrustUsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyTrustUsDefaultComponent = (props: HomeBuddyTrustUsProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyTrustUsProps): JSX.Element => {
  if (props.fields) {
    return (
      <li className="trustUs__item">
        <p className="trustUs__count font-weight-bolder text-center mb-1">
          <Text field={props.fields.Count} />
        </p>
        <div className="trustUs__info d-flex align-items-center justify-content-center">
          <Image
            field={props.fields.Image}
            className="trustUs__img d-block me-2"
            width="24"
            height="24"
            aria-hidden="true"
            loading="lazy"
          />
          <p className="trustUs__txt font-weight-medium text-center">
            <Text field={props.fields.Text} />
          </p>
        </div>
      </li>
    );
  }

  return <HomeBuddyTrustUsDefaultComponent {...props} />;
};
