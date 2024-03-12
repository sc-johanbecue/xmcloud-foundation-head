import React from 'react';
import {
  ImageField,
  RichTextField,
  LinkField,
  TextField,
  Text,
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Description: RichTextField;
  Link: LinkField;
  Image: ImageField;
}

type ComponentProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DPWorldArticleDetailDefaultComponent = (props: ComponentProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: ComponentProps): JSX.Element => {
  if (props.fields) {
    return (
      <div>
        <div className="article-img">
          <JssImage field={props.fields.Image} />
        </div>
        <div className="article-detail">
          <h2 className="field-article-title">
            <Text field={props.fields.Title} />
          </h2>
          <p className="field-description">
            <JssRichText field={props.fields.Description} />
          </p>
          <JssLink field={props.fields.Link} />
        </div>
      </div>
    );
  }

  return <DPWorldArticleDetailDefaultComponent {...props} />;
};
