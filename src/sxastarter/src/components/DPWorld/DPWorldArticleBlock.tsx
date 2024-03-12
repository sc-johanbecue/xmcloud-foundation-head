import React from 'react';
import {
  LinkField,
  TextField,
  ComponentParams,
  ComponentRendering,
  Placeholder,
  Text,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Link: LinkField;
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
  const phKey1 = `articleOne-${props.params.DynamicPlaceholderId}`;
  const phKey2 = `articleTwo-${props.params.DynamicPlaceholderId}`;
  const phKey3 = `articleThree-${props.params.DynamicPlaceholderId}`;
  const phKey4 = `articleFour-${props.params.DynamicPlaceholderId}`;
  if (props.fields) {
    return (
      <div className="component" id={id ? id : undefined}>
        <div className="article-block">
          <div className="component-content">
            <div className="container-fluid">
              <div className="article-block-fourcolumn article-column">
                <div className="article-title">
                  <div className="row">
                    <div className="col-12 col-md-8">
                      <h2 className="field-heading">
                        <Text field={props.fields.Title} />
                      </h2>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="clearfix">
                        <JssLink field={props.fields.Link} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row article">
                  <div className="col-md-6 col-lg-3 col-12" id={id ? 'articleOne' + id : undefined}>
                    <Placeholder name={phKey1} rendering={props.rendering} />
                  </div>
                  <div className="col-md-6 col-lg-3 col-12" id={id ? 'articleTwo' + id : undefined}>
                    <Placeholder name={phKey2} rendering={props.rendering} />
                  </div>
                  <div
                    className="col-md-6 col-lg-3 col-12"
                    id={id ? 'articleThree' + id : undefined}
                  >
                    <Placeholder name={phKey3} rendering={props.rendering} />
                  </div>
                  <div
                    className="col-md-6 col-lg-3 col-12"
                    id={id ? 'articleFour' + id : undefined}
                  >
                    <Placeholder name={phKey4} rendering={props.rendering} />
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
