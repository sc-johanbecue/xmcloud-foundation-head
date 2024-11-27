import React from 'react';
import { ImageField, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Logo: ImageField;
}

type AmmegaFooterLinksProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const AmmegaFooterLinksDefaultComponent = (props: AmmegaFooterLinksProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: AmmegaFooterLinksProps): JSX.Element => {
  if (props.fields) {
    return (
      <section id="section-143-11" className=" ct-section">
        <div className="ct-section-inner-wrap">
          <div id="div_block-144-11" className="ct-div-block">
            <JssImage field={props.fields.Logo} className="ct-image" />
          </div>
        </div>
      </section>
    );
  }

  return <AmmegaFooterLinksDefaultComponent {...props} />;
};
