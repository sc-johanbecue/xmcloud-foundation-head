import React from 'react';
import {
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

type BeaulieuCTAListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
};

const BeaulieuCTAListDefaultComponent = (props: BeaulieuCTAListProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: BeaulieuCTAListProps): JSX.Element => {
  const phName1 = `ctaOne-${props.params.DynamicPlaceholderId}`;
  const phName2 = `ctaTwo-${props.params.DynamicPlaceholderId}`;
  const phName3 = `ctaThree-${props.params.DynamicPlaceholderId}`;
  const phName4 = `ctaFour-${props.params.DynamicPlaceholderId}`;
  const phName5 = `ctaFive-${props.params.DynamicPlaceholderId}`;
  const phName6 = `ctaSix-${props.params.DynamicPlaceholderId}`;

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName1} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName2} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName3} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName4} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName5} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName6} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );

  return <BeaulieuCTAListDefaultComponent {...props} />;
};
