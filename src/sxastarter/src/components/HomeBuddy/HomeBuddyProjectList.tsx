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

type HomeBuddyProjectListProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyProjectListDefaultComponent = (props: HomeBuddyProjectListProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyProjectListProps): JSX.Element => {
  const phHomeImprovementProjectList = `projectList-${props.params.DynamicPlaceholderId}`;

  return (
    <section className="py-11 py-lg-12">
      <div className="container">
        <h3 className="px-4 px-md-0 mb-6 text-center">
          <Text field={props.fields.Title} />
        </h3>
        <div className="d-flex justify-content-center">
          <ul className="homeImprovements">
            <Placeholder name={phHomeImprovementProjectList} rendering={props.rendering} />
          </ul>
        </div>
      </div>
    </section>
  );

  return <HomeBuddyProjectListDefaultComponent {...props} />;
};
