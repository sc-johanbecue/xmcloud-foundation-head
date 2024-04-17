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
  const phName1 = `CTAOne-${props.params.DynamicPlaceholderId}`;
  const phName2 = `CTATwo-${props.params.DynamicPlaceholderId}`;
  const phName3 = `CTAThree-${props.params.DynamicPlaceholderId}`;
  const phName4 = `CTAFour-${props.params.DynamicPlaceholderId}`;
  const phName5 = `CTAFive-${props.params.DynamicPlaceholderId}`;
  const phName6 = `CTASix-${props.params.DynamicPlaceholderId}`;

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName1} key="cta" rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName2} key="cta" rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName3} key="cta" rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName4} key="cta" rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName5} key="cta" rendering={props.rendering} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Placeholder name={phName6} key="cta" rendering={props.rendering} />
        </div>
      </div>
    </div>
  );

  return <BeaulieuCTAListDefaultComponent {...props} />;
};
