import React from 'react';
import { Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: TextField;
}

type LynkAndCoCTABannerProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LynkAndCoCTABannerDefaultComponent = (props: LynkAndCoCTABannerProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LynkAndCoCTABannerProps): JSX.Element => {
  if (props.fields) {
    return (
      <div
        className="cta-banner link-true padding-top-tiny padding-bottom-tiny green center grid"
        style={{ width: '100%' }}
      >
        <div className="action">
          <span className="text">
            <Text field={props.fields.Text} />
          </span>
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M1 11.1111H18.3189L13.9433 6.72333L15.6667 5L23 12.3333L15.6667 19.6667L13.9433 17.9433L18.3189 13.5556H1V11.1111Z"
                fill="black"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    );
  }

  return <LynkAndCoCTABannerDefaultComponent {...props} />;
};
