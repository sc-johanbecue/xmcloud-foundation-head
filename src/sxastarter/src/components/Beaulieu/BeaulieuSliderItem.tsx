import React from 'react';
import {
  ImageField,
  TextField,
  RichTextField,
  LinkField,
  Image as JssImage,
  Link as JssLink,
  RichText,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Text: RichTextField;
  Image: ImageField;
  Link: LinkField;
}

type BeaulieuSliderItemProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BeaulieuSliderItemDefaultComponent = (props: BeaulieuSliderItemProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: BeaulieuSliderItemProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="item active">
        <JssImage field={props.fields.Image} />
        <div className="carousel-caption">
          <div className="display-table center">
            <div className="display-table-cell">
              <h2 className="carousel-title">
                <Text field={props.fields.Title} />
              </h2>
              <p className="carousel-text">
                <RichText field={props.fields.Text} />
              </p>
              <JssLink field={props.fields.Link} className="btn btn-carousel" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <BeaulieuSliderItemDefaultComponent {...props} />;
};
