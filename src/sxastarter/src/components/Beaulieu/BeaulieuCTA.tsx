import React from 'react';
import {
  ImageField,
  LinkField,
  TextField,
  RichTextField,
  Image as JssImage,
  RichText,
  Text,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Description: RichTextField;
  Image: ImageField;
  Link: LinkField;
}

type BeaulieuCTAProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BeaulieuCTADefaultComponent = (props: BeaulieuCTAProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: BeaulieuCTAProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="row">
        <div className="container">
          <div className=" margin-top-45 margin-bottom-45 padding-top-50 padding-bottom-50">
            <div className="component-berryalloc-product-finder-banner">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-5 col-md-5">
                    <JssImage field={props.fields.Image} />
                  </div>
                  <div className="col-xs-12 col-sm-7 col-md-7">
                    <div className="text-container js-equal-column" style={{ height: '500px' }}>
                      <h3 className="title">
                        <Text field={props.fields.Title} />
                      </h3>
                      <div className="description">
                        <p>
                          <span style={{ backgroundColor: '#ffffff', color: '#333333' }}>
                            <RichText field={props.fields.Description} />
                          </span>
                        </p>
                      </div>
                      <JssLink field={props.fields.Link} className="btn btn-primary" />
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

  return <BeaulieuCTADefaultComponent {...props} />;
};

export const Left = (props: BeaulieuCTAProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="row">
        <div className="container">
          <div className="margin-top-50 margin-bottom-50 padding-top-50 padding-bottom-50">
            <div className="cta-left">
              <div className="component-cta__media">
                <JssImage field={props.fields.Image} />
              </div>
              <div className="component-cta__content display-table center js-equal-cta">
                <div className="display-table-cell">
                  <h3 className="cta-title">
                    <Text field={props.fields.Title} />
                  </h3>
                  <p className="underscore">__</p>
                  <p className="cta-text">
                    <RichText field={props.fields.Description} />
                  </p>
                  <p>
                    <JssLink field={props.fields.Link} className="btn btn-primary" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <BeaulieuCTADefaultComponent {...props} />;
};

export const Right = (props: BeaulieuCTAProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="row">
        <div className="container">
          <div className="margin-top-50 margin-bottom-50 padding-top-50 padding-bottom-50">
            <div className="cta-right">
              <div className="component-cta__media">
                <JssImage field={props.fields.Image} />
              </div>
              <div className="component-cta__content display-table center js-equal-cta">
                <div className="display-table-cell">
                  <h3 className="cta-title">
                    <Text field={props.fields.Title} />
                  </h3>
                  <p className="underscore">__</p>
                  <p className="cta-text">
                    <RichText field={props.fields.Description} />
                  </p>
                  <p>
                    <JssLink field={props.fields.Link} className="btn btn-primary" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <BeaulieuCTADefaultComponent {...props} />;
};
