import React from 'react';
import {
  ImageField,
  TextField,
  RichTextField,
  Text,
  RichText,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  data: {
    datasource: {
      Title: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      Introduction: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      Content: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      AdditionalContent: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      Quote: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      Image: {
        jsonValue: {
          value: {
            src: string;
            alt: string;
            width: string;
            height: string;
          };
          editable: string;
        };
      };
    };
    contextItem: {
      Title: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      Introduction: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      Content: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      AdditionalContent: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      Quote: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      Image: {
        jsonValue: {
          value: {
            src: string;
            alt: string;
            width: string;
            height: string;
          };
          editable: string;
        };
      };
    };
  };
}

type BeaulieuArticleProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BeaulieuArticleDefaultComponent = (props: BeaulieuArticleProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: BeaulieuArticleProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const contextItem = props.fields?.data?.contextItem;

  const title = datasource?.Title || contextItem?.Title;
  const content = datasource?.Content || contextItem?.Content;
  const additionalContent = datasource?.AdditionalContent || contextItem?.AdditionalContent;
  const quote = datasource?.Quote || contextItem?.Quote;
  const image = datasource?.Image || contextItem?.Image;

  const titleField: TextField = {
    value: title?.jsonValue?.value,
    editable: title?.jsonValue?.editable,
  };

  const contentField: RichTextField = {
    value: content?.jsonValue?.value,
    editable: content?.jsonValue?.editable,
  };

  const additionalContentField: RichTextField = {
    value: additionalContent?.jsonValue?.value,
    editable: additionalContent?.jsonValue?.editable,
  };

  const quoteField: RichTextField = {
    value: quote?.jsonValue?.value,
    editable: quote?.jsonValue?.editable,
  };

  const imageField: ImageField = {
    value: image?.jsonValue?.value,
    editable: image?.jsonValue?.editable,
  };

  if (props.fields) {
    return (
      <div className="row">
        <div className="container">
          <div className="row  ">
            <div className="col-xs-12 col-sm-6 col-md-8 equal-sm">
              <div className="component component-content-block">
                <h2>
                  <Text field={titleField} />
                </h2>
                <p style={{ textAlign: 'left' }}>
                  <RichText field={contentField} />
                </p>
                <p>
                  <RichText field={additionalContentField} />
                </p>
              </div>
              <div className="component component-quote">
                <div className="quote">
                  <blockquote>
                    <h4>
                      &ldquo;
                      <RichText field={quoteField} />
                      &ldquo;
                    </h4>
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 equal-sm">
              <article className="margin-bottom-15">
                <JssImage
                  field={imageField}
                  className="img-responsive component component-image js-lazyload"
                />
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <BeaulieuArticleDefaultComponent {...props} />;
};
