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

type HomeBuddyAdvantageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyAdvantageDefaultComponent = (props: HomeBuddyAdvantageProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyAdvantageProps): JSX.Element => {
  if (props.fields) {
    return (
      <li className="advantages__item d-flex flex-column align-items-center align-items-md-start">
        <Image
          field={props.fields.Image}
          className="advantages__img advantages__img_portrait d-block mb-4"
          width="32"
          height="32"
          aria-hidden="true"
          loading="lazy"
        />
        <h4 className="advantages__itemHdr h4 font-weight-bolder mb-2 text-center">
          <Text field={props.fields.Title} />
        </h4>
        <p className="advantages__txt h5 font-weight-medium">
          <RichText field={props.fields.Text} />
        </p>
      </li>
    );
  }

  return <HomeBuddyAdvantageDefaultComponent {...props} />;
};
