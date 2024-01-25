import React from 'react';
import {
  Image as JssImage,
  ImageField,
  TextField,
  Text,
  RichTextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Name: TextField;
  Content: RichTextField;
  Products: TextField;
  Label: TextField;
  Summary: RichTextField;
  MasterAsset: ImageField;
  ContentHubUrl: TextField;
}

type LLBGSpotlightProps = {
  params: { [key: string]: string };
  fields: Fields;
};

interface Fields {
  data: {
    datasource: {
      field: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
    };
    contextItem: {
      field: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
    };
  };
}

const LLBGSpotlightDefaultComponent = (props: LLBGSpotlightProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LLBGSpotlightProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const handleClick = (path: any) => {
    window.open(path, 'contentHub');
  };

  if (props.fields) {
    if (sitecoreContext?.pageEditing) {
      return (
        <div className="grid__item grid__item--third offset-bottom">
          <div className="products__item">
            <JssImage
              field={props.fields.MasterAsset}
              className="image image--responsive widthFitContent"
              editable={false}
            />
            <div className="products__content">
              <h2
                property="title"
                className="typography-heading-3 typography-color-brown"
                onClick={() => handleClick(props.fields.ContentHubUrl.value?.toString())}
              >
                <Text field={props.fields.Name} editable={false} />
              </h2>
              <p
                property="content"
                className="products__paragraph typography-text-center textAlignJustify"
              >
                <Text field={props.fields.Summary} editable={false} />
              </p>
              <a href="#" className="button button--outline js-modal-open">
                <Text field={props.fields.Products} editable={false} />
              </a>
            </div>
          </div>
        </div>
      );
    }
  }

  return <LLBGSpotlightDefaultComponent {...props} />;
};
