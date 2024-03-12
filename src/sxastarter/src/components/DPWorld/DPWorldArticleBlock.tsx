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
  const phKey1 = `article-1${props.params.DynamicPlaceholderId}`;
  const phKey2 = `article-2${props.params.DynamicPlaceholderId}`;
  const phKey3 = `article-3${props.params.DynamicPlaceholderId}`;
  const phKey4 = `article-4${props.params.DynamicPlaceholderId}`;
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
                  <div className="col-md-6 col-lg-3 col-12" id={id ? 'article1' + id : undefined}>
                    <Placeholder key={phKey1} name={phKey1} rendering={props.rendering} />
                  </div>
                  <div className="col-md-6 col-lg-3 col-12" id={id ? 'article2' + id : undefined}>
                    <Placeholder key={phKey2} name={phKey2} rendering={props.rendering} />
                  </div>
                  <div className="col-md-6 col-lg-3 col-12" id={id ? 'article3' + id : undefined}>
                    <Placeholder key={phKey3} name={phKey3} rendering={props.rendering} />
                  </div>
                  <div className="col-md-6 col-lg-3 col-12" id={id ? 'article4' + id : undefined}>
                    <Placeholder key={phKey4} name={phKey4} rendering={props.rendering} />
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
