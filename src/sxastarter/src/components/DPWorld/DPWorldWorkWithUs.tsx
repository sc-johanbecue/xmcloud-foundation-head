import React from 'react';
import {
  LinkField,
  TextField,
  RichTextField,
  Text,
  Link as JssLink,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Description: RichTextField;
  Link: LinkField;
}

type DPWorldFooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DPWorldFooterDefaultComponent = (props: DPWorldFooterProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: DPWorldFooterProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="component" style={{ padding: '0px' }}>
        <div className="component work-with-us black-variant" id="WhatWeDo">
          <div className="component-content">
            <div className="container-fluid">
              <div className="work-with-us-wrapper">
                <div className="row">
                  <div className="col-12">
                    <div className="workwithus-content-wrapper">
                      <div className="work-with-us-title h3">
                        <Text field={props.fields.Title} />
                      </div>
                      <p>
                        <JssRichText field={props.fields.Description} />
                      </p>
                      <JssLink field={props.fields.Link} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <DPWorldFooterDefaultComponent {...props} />;
};
