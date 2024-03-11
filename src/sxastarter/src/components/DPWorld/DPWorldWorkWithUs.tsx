import React from 'react';
import {
  LinkField,
  TextField,
  RichTextField,
  Text,
  Link as JssLink,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import Link from 'next/link';

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
      <div className="component">
        <div className="component work-with-us black-variant" id="WhatWeDo">
          <div className="component-content">
            <div className="container-fluid">
              <div className="work-with-us-wrapper">
                <div className="row">
                  <div className="col-12">
                    <div className="workwithus-content-wrapper">
                      <div className="work-with-us-title h3">
                        <Text field={props.fields.Title} />
                        CHANGING WHAT&#39;S POSSIBLE, FOR EVERYONE
                      </div>
                      <p>
                        <JssRichText field={props.fields.Description} />
                        Trade is the lifeblood of the global economy, creating opportunities and
                        improving the quality of life for people around the world. DP World exists
                        to make the world’s trade flow better, changing what’s possible for the
                        customers and communities we serve globally.&nbsp;
                      </p>
                      <JssLink field={props.fields.Link} />
                      <Link title="About Us" href="/about-us" className="primary-cta">
                        <span>Learn more about us</span>
                      </Link>
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
