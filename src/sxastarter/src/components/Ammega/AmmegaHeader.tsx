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

type AmmegaHeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const AmmegaHeaderDefaultComponent = (props: AmmegaHeaderProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: AmmegaHeaderProps): JSX.Element => {
  if (props.fields) {
    return (
      <div id="div_block-1-11" className="ct-div-block">
        <div id="div_block-35-11" className="ct-div-block">
          <a
            id="link-125-11"
            className="ct-link"
            href="https://www.linkedin.com/company/ammega/"
            target="_blank"
          >
            <div id="fancy_icon-3-11" className="ct-fancy-icon">
              <svg id="svg-fancy_icon-3-11">
                <use xlinkHref="#FontAwesomeicon-linkedin"></use>
              </svg>
            </div>
          </a>
          <a
            id="link-127-11"
            className="ct-link"
            href="https://www.youtube.com/channel/UCo6QmO5XyUW8V6XquMiZSCA/videos"
            target="_blank"
          >
            <img
              id="image-130-11"
              alt=""
              src="https://www.ammega.com/wp-content/uploads/youtube-1-1.png"
              className="ct-image"
            />
          </a>
        </div>
      </div>
    );
  }

  return <AmmegaHeaderDefaultComponent {...props} />;
};
