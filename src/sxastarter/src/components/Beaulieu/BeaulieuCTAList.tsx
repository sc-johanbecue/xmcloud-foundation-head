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
  const phKey1 = `CTAOne-${props.params.DynamicPlaceholderId}`;
  const phKey2 = `CTATwo-${props.params.DynamicPlaceholderId}`;
  const phKey3 = `CTAThree-${props.params.DynamicPlaceholderId}`;
  const phKey4 = `CTAFour-${props.params.DynamicPlaceholderId}`;
  const phKey5 = `CTAFive-${props.params.DynamicPlaceholderId}`;
  const phKey6 = `CTASix-${props.params.DynamicPlaceholderId}`;

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phKey1} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phKey2} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phKey3} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phKey4} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phKey5} rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phKey6} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );

  return <BeaulieuCTAListDefaultComponent {...props} />;
};
