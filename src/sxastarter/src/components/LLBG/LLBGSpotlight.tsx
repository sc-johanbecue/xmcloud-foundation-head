import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  TextField,
  LinkField,
  Text,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Icon: TextField;
  Content: RichTextField;
  Image: ImageField;
  Link: LinkField;
}

type LLBGSpotlightProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LLBGSpotlightDefaultComponent = (props: LLBGSpotlightProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo JBE1</span>
    </div>
  </div>
);

export const Default = (props: LLBGSpotlightProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="row px-2 px-lg-4 marginTop80px">
        <div className="col-12 mx-auto px-0 maxWidth1500px">
          <div className="b2b-homepage-spotlight pb-1 b2b-product-container height100Procent">
            <JssImage field={props.fields.Image} className="d-none d-md-block width100Procent" />
            <h4>
              <span className={'icon-llbg ' + props.fields.Icon.value}></span>
              <Text field={props.fields.Title} />
            </h4>
            <JssImage field={props.fields.Image} className="d-md-none width100Procent" />
            <p className="text-center text-lg-left margin20px">
              <Text field={props.fields.Content} />
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <LLBGSpotlightDefaultComponent {...props} />;
};

export const WithButton = (props: LLBGSpotlightProps): JSX.Element => {
  if (props.fields) {
    // const backgroundStyle = {
    //   background: `url('${props.fields.Image.value?.src}') left bottom / cover no-repeat;`,
    // };

    return (
      <div className="row px-2 px-lg-4 mt-1">
        <div className="col-12 mx-auto px-0 maxWidth1500px">
          <div className="b2b-homepage-spotlight pt-5 pb-1">
            <div className="container-fluid text-left">
              <div className="row d-none d-lg-flex">
                <div className="col-4 pl-5 py-5">
                  <h3 className="mx-0 px-0 mt-2 text-left">
                    <Text field={props.fields.Title} />
                  </h3>
                  <div>
                    <Text field={props.fields.Content} className="mx-0 my-4 text-left" />
                  </div>
                  <JssLink
                    field={props.fields.Link}
                    className="main-button my-4 mx-auto d-inline-block"
                  />
                </div>
                <div className="col-8 py-5">
                  <div className="minHeight300px width100Procent height100Procent">
                    <JssImage
                      field={props.fields.Image}
                      className="minHeight300px width100Procent height100Procent"
                    />
                  </div>
                </div>
              </div>
              <div className="row d-lg-none">
                <div className="col-12 d-md-none">
                  <JssImage field={props.fields.Image} className="width100Procent" />
                </div>
                <div className="col-10 offset-1 d-none d-md-block d-lg-none">
                  <JssImage field={props.fields.Image} className="width100Procent" />
                </div>
                <div className="col-12 col-md-10 offset-md-1 py-2 text-center">
                  <h3 className="mx-0 px-0 mt-1 text-center text-md-left">
                    <Text field={props.fields.Title} />
                  </h3>
                  <p className="mx-0 my-2 text-center  text-md-left">
                    <Text field={props.fields.Content} />
                  </p>
                  <JssLink
                    field={props.fields.Link}
                    className="main-button my-4 mx-auto d-inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <LLBGSpotlightDefaultComponent {...props} />;
};
