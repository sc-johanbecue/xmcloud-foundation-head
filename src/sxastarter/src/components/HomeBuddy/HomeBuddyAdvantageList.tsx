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

type HomeBuddyAdvantageListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyAdvantageListDefaultComponent = (
  props: HomeBuddyAdvantageListProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyAdvantageListProps): JSX.Element => {
  const phAdvantageList = `advantageList-${props.params.DynamicPlaceholderId}`;

  return (
    <section className="advantages bg-deepBlue05 py-11 py-lg-12" data-analytics-advantages>
      <div className="container">
        <h3 className="advantages__hdr mb-6 text-center">
          <Text field={props.fields.Title} />
        </h3>
        <ul className="advantages__list">
          <Placeholder name={phAdvantageList} rendering={props.rendering} />
        </ul>
      </div>
    </section>
  );

  return <HomeBuddyAdvantageListDefaultComponent {...props} />;
};
