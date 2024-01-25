import React from 'react';
import {
  Image as JssImage,
  RichText as JssRichText,
  ImageField,
  Text,
  TextField,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Number: TextField;
  Label: TextField;
  Name: TextField;
  Category: TextField;
  Family: TextField;
  ShortDescription: RichTextField;
  LongDescription: RichTextField;
  MasterAsset: ImageField;
}

type LLBGProductInfoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LLBGProductInfoDefaultComponent = (props: LLBGProductInfoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LLBGProductInfoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`container ${props.params.styles}`} id={id ? id : undefined}>
        <div className="row">
          <div className="col-lg-6">
            <JssImage field={props.fields.MasterAsset} />
          </div>
          <div className="col-lg-6">
            <div>
              <h1>
                <Text field={props.fields.Name} />
              </h1>
              <p>
                <strong>Label:</strong>&nbsp;
                <Text field={props.fields.Label} />
              </p>
              <p>
                <strong>Number:</strong>&nbsp;
                <Text field={props.fields.Number} />
              </p>
              <p>
                <strong>Category:</strong>&nbsp;
                <Text field={props.fields.Category} />
              </p>
              <p>
                <strong>Family:</strong>&nbsp;
                <Text field={props.fields.Family} />
              </p>
              <p>
                <strong>Ingredients:</strong>
                <br />
                <JssRichText field={props.fields.ShortDescription} />
              </p>
              <p>
                <strong>Description:</strong>
                <br />
                <JssRichText field={props.fields.LongDescription} />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <LLBGProductInfoDefaultComponent {...props} />;
};

export const WithText = (props: LLBGProductInfoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            JBE3
            <JssImage field={props.fields.MasterAsset} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText className="promo-text" field={props.fields.ShortDescription} />
              </div>
            </div>
            <div className="field-promotext">
              <JssRichText className="promo-text" field={props.fields.LongDescription} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <LLBGProductInfoDefaultComponent {...props} />;
};
