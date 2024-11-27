import React from 'react';
import {
  TextField,
  Text,
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
}

type HomeBuddyTrustUsListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyTrustUsListDefaultComponent = (props: HomeBuddyTrustUsListProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyTrustUsListProps): JSX.Element => {
  const phTrustUsList = `trustUsList-${props.params.DynamicPlaceholderId}`;

  return (
    <section className="trustUs py-11 py-lg-12" data-analytics-trust-us>
      <div className="container">
        <h3 className="h3 h2-md mb-6 text-center">
          <Text field={props.fields.Title} />
        </h3>
        <ul className="trustUs__list mx-auto">
          <Placeholder name={phTrustUsList} rendering={props.rendering} />
        </ul>
      </div>
    </section>
  );

  return <HomeBuddyTrustUsListDefaultComponent {...props} />;
};
