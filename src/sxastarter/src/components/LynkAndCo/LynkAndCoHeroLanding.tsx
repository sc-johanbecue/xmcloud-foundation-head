import React from 'react';
import { ImageField, TextField, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';

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

type LynkAndCoHeroLandingProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LynkAndCoHeroLandingDefaultComponent = (props: LynkAndCoHeroLandingProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LynkAndCoHeroLandingProps): JSX.Element => {
  if (props.fields) {
    return (
      <div
        className="hero-landing"
        style={{
          backgroundImage:
            'url("https://owscd-lynkco.azureedge.net/-/jssmedia/lynkco-global-portal/master/global/campaign-assets/ltob_2/lynkco_webb_header_conversion2_en_2000x1300.ashx?h=1300&amp;iar=0&amp;w=2000&amp;rev=417f1a7fb9fd4168898d8d4094a5a245&amp;hash=13E7D238CFAA8ECDE34D74F186CA462B")',
        }}
      >
        <div className="full-width grid">
          <h1 className="big-title">
            <p>
              <span className="type-h1 is-visible">The love of your life. Or a month. </span>
            </p>
          </h1>
          <div className="body-text">
            Get a damn good car that you can keep forever or leave whenever. Subscribe
            month-to-month, borrow, or buy the Lynk &amp; Co 01 and let us handle the insurance,
            maintenance, and more.
          </div>
        </div>
      </div>
    );
  }

  return <LynkAndCoHeroLandingDefaultComponent {...props} />;
};
