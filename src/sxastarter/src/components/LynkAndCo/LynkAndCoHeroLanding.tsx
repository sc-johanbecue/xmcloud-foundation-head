import React from 'react';
import {
  Image as JssImage,
  ImageField,
  Text,
  TextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Text: TextField;
  Image: ImageField;
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
//        'url("https://owscd-lynkco.azureedge.net/-/jssmedia/lynkco-global-portal/master/global/campaign-assets/ltob_2/lynkco_webb_header_conversion2_en_2000x1300.ashx?h=1300&amp;iar=0&amp;w=2000&amp;rev=417f1a7fb9fd4168898d8d4094a5a245&amp;hash=13E7D238CFAA8ECDE34D74F186CA462B")',
export const Default = (props: LynkAndCoHeroLandingProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const backgroundStyle = { backgroundImage: `url('${props?.fields?.Image?.value?.src}')` };
  const modifyImageProps = {
    ...props.fields.Image,
    editable: props?.fields?.Image?.editable
      ?.replace(`width="${props?.fields?.Image?.value?.width}"`, 'width="100%"')
      .replace(`height="${props?.fields?.Image?.value?.height}"`, 'height="100%"'),
  };

  if (props.fields) {
    return (
      <div className="hero-landing" style={backgroundStyle}>
        {sitecoreContext.pageEditing ? (
          <JssImage
            field={modifyImageProps}
            style={{ opacity: '0.0', width: '100%', height: '20px' }}
          />
        ) : (
          ''
        )}

        <div className="full-width grid">
          <h1 className="big-title">
            <p>
              <span className="type-h1 is-visible">
                <Text field={props.fields.Title} />
              </span>
            </p>
          </h1>
          <div className="body-text">
            <Text field={props.fields.Text} />
          </div>
        </div>
      </div>
    );
  }

  return <LynkAndCoHeroLandingDefaultComponent {...props} />;
};
