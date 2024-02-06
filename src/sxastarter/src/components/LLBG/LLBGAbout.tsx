import React from 'react';
import {
  Image as JssImage,
  RichText as JssRichText,
  ImageField,
  TextField,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Number: TextField;
  Label: TextField;
  Name: TextField;
  Category: TextField;
  Family: TextField;
  ShortDescription: RichTextField;
  LongDescription: RichTextField;
  MasterAsset: ImageField;
}

type LLBGProductInfoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LLBGProductInfoDefaultComponent = (props: LLBGProductInfoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LLBGProductInfoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="row px-md-4 mt-4 no-gutters width100Procent">
        <div className="col-12 mx-auto maxWidth1500px">
          <div className="b2b-homepage-spotlight heightAuto">
            <div className="container-fluid mx-0 px-0">
              <div className="row">
                <div className="col-sm-12 col-md-5 text-center text-md-left pl-5 pr-5 pr-md-0 paddingBottom50px">
                  <h3 className="text-center text-md-left pl-0 pt-5" property="section_3_title">
                    Niet gevonden wat je zocht ?
                  </h3>
                  <p
                    className="text-center text-md-left margin30px040px0"
                    property="section_3_content"
                  >
                    Contacteer ons vandaag nog. Wij helpen u graag verder.
                  </p>
                  <a
                    href="https://www.lalorraine.com/be-nl/consument/contact"
                    className="main-button"
                    property="section_2_button_text"
                  >
                    Contacteer ons
                  </a>
                </div>
                <div className="d-none d-md-block col-md-7">
                  <div className="backgroundAbout">&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <LLBGProductInfoDefaultComponent {...props} />;
};

export const WithText = (props: LLBGProductInfoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            JBE3
            <JssImage field={props.fields.MasterAsset} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText className="promo-text" field={props.fields.ShortDescription} />
              </div>
            </div>
            <div className="field-promotext">
              <JssRichText className="promo-text" field={props.fields.LongDescription} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <LLBGProductInfoDefaultComponent {...props} />;
};
