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
  Text: TextField;
}

type HomeBuddyFeatureListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyFeatureListDefaultComponent = (props: HomeBuddyFeatureListProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyFeatureListProps): JSX.Element => {
  const phFeatureList = `featureList-${props.params.DynamicPlaceholderId}`;
  const phFeatureImageList = `featureImageList-${props.params.DynamicPlaceholderId}`;

  return (
    <section className="features py-11 py-lg-12" data-analytics-features>
      <div className="container">
        <h3 className="font-weight-bold mb-2 text-center">
          <Text field={props.fields.Title} />
        </h3>
        <p className="h4 font-weight-medium text-center mb-6">
          <Text field={props.fields.Text} />
        </p>
        <ul className="features__mediaList defaultGrid">
          <Placeholder name={phFeatureImageList} rendering={props.rendering} />
        </ul>
        <ul className="checkList features__checkList defaultGrid mt-6">
          <Placeholder name={phFeatureList} rendering={props.rendering} />
        </ul>
      </div>
    </section>
  );

  return <HomeBuddyFeatureListDefaultComponent {...props} />;
};
