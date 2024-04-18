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
    dataSource: {
      Title: TextField;
      Introduction: RichTextField;
      Content: RichTextField;
      AdditionalContent: RichTextField;
      Quote: RichTextField;
      Image: ImageField;
    };
    contextItem: {
      Title: TextField;
      Introduction: RichTextField;
      Content: RichTextField;
      AdditionalContent: RichTextField;
      Quote: RichTextField;
      Image: ImageField;
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
  const title = props.fields?.data.dataSource.Title || props.fields?.data.contextItem.Title;
  const content = props.fields?.data.dataSource.Content || props.fields?.data.contextItem.Content;
  const additionalContent =
    props.fields?.data.dataSource.AdditionalContent ||
    props.fields?.data.contextItem.AdditionalContent;
  const quote = props.fields?.data.dataSource.Quote || props.fields?.data.contextItem.Quote;
  const image = props.fields?.data.dataSource.Image || props.fields?.data.contextItem.Image;

  if (props.fields) {
    return (
      <div className="row">
        <div className="container">
          <div className="row  ">
            <div className="col-xs-12 col-sm-6 col-md-8 equal-sm">
              <div className="component component-content-block">
                <h2>
                  <Text field={title} />
                </h2>
                <p style={{ textAlign: 'left' }}>
                  <RichText field={content} />
                </p>
                <p>
                  <RichText field={additionalContent} />
                </p>
              </div>
              <div className="component component-quote">
                <div className="quote">
                  <blockquote>
                    <h4>
                      &ldquo;
                      <RichText field={quote} />
                      &ldquo;
                    </h4>
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 equal-sm">
              <article className="margin-bottom-15">
                <JssImage
                  field={image}
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
