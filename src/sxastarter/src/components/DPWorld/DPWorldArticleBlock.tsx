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
  params: ComponentParams;
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
      <div className="component">
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
                        <JssLink
                          field={props.fields.Link}
                          className="primary-cta float-none float-md-right mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row article">
                  <div className="col-md-6 col-lg-3 col-12">
                    <Placeholder name="Article1" rendering={props.rendering} />
                  </div>
                  <div className="col-md-6 col-lg-3 col-12">
                    <Placeholder name="Article2" rendering={props.rendering} />
                  </div>
                  <div className="col-md-6 col-lg-3 col-12">
                    <Placeholder name="Article3" rendering={props.rendering} />
                  </div>
                  <div className="col-md-6 col-lg-3 col-12">
                    <Placeholder name="Article4" rendering={props.rendering} />
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
