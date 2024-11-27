import React from 'react';
import {
  TextField,
  Text,
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Header: TextField;
}

type HomeBuddyHowItWorksListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyHowItWorksListDefaultComponent = (
  props: HomeBuddyHowItWorksListProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyHowItWorksListProps): JSX.Element => {
  const phHomeHowItWorksList = `howItWorksList-${props.params.DynamicPlaceholderId}`;

  return (
    <section className="howItWorks bg-deepBlue05 py-11 py-lg-12" data-analytics-how-it-works>
      <div className="container">
        <h3 className="howItWorks__hdr h3 h2-md mb-6 text-center">
          <Text field={props.fields.Header} />
        </h3>
        <ul className="howItWorks__list mx-auto">
          <Placeholder name={phHomeHowItWorksList} rendering={props.rendering} />
        </ul>
      </div>
    </section>
  );

  return <HomeBuddyHowItWorksListDefaultComponent {...props} />;
};
