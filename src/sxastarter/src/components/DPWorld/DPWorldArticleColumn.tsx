import React from 'react';
import {
  ImageField,
  RichTextField,
  ComponentParams,
  ComponentRendering,
  Image as JssImage,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Description: RichTextField;
  Image: ImageField;
}

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const DPWorldArticleBlockDefaultComponent = (props: ComponentProps): JSX.Element => (
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
        <div className="article-img circle-icon">
          <JssImage
            field={props.fields.Image}
            class="img-fluid lozad-picture"
            style={{ paddingTop: '10px', paddingLeft: '5px', width: '100%', height: '100%' }}
          />
        </div>
        <div className="article-detail text-only">
          <h2></h2>
          <p className="field-description">
            <JssRichText field={props.fields.Description} />
          </p>
        </div>
      </div>
    );
  }

  return <DPWorldArticleBlockDefaultComponent {...props} />;
};
