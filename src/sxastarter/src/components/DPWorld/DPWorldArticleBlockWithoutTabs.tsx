import React from 'react';
import {
  TextField,
  ComponentParams,
  ComponentRendering,
  Placeholder,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
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
  const id = props.params.RenderingIdentifier;
  const phKey1 = `articleColumnOne-${props.params.DynamicPlaceholderId}`;
  const phKey2 = `articleColumnTwo-${props.params.DynamicPlaceholderId}`;
  const phKey3 = `articleColumnThree-${props.params.DynamicPlaceholderId}`;
  if (props.fields) {
    return (
      <div className="component">
        <div className="article-block without-tabs">
          <div className="component-content">
            <div className="container-fluid">
              <div className="article-title">
                <h2>
                  <Text field={props.fields.Title} />
                </h2>
              </div>
              <div className="article-block-threecolumn article-column">
                <div className="row article variant-highlight">
                  <div
                    className="col-md-6 col-lg-4 col-12 thumb-style"
                    id={id ? 'articleColumnOne' + id : undefined}
                  >
                    <Placeholder name={phKey1} rendering={props.rendering} />
                  </div>
                  <div
                    className="col-md-6 col-lg-4 col-12 thumb-style"
                    id={id ? 'articleColumnTwo' + id : undefined}
                  >
                    <Placeholder name={phKey2} rendering={props.rendering} />
                  </div>
                  <div
                    className="col-md-6 col-lg-4 col-12 thumb-style"
                    id={id ? 'articleColumnThree' + id : undefined}
                  >
                    <Placeholder name={phKey3} rendering={props.rendering} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <DPWorldArticleBlockDefaultComponent {...props} />;
};
