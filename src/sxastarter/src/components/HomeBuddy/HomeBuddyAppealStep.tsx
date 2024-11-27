import React, { useEffect } from 'react';
import {
  TextField,
  Text,
  LinkField,
  Link as JssLink,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Question: TextField;
  Button: LinkField;
  Percentage: TextField;
}

type HomeBuddyAdvantageProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyAdvantageDefaultComponent = (props: HomeBuddyAdvantageProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyAdvantageProps): JSX.Element => {
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      const progress = document.getElementById('appealFormProgress');
      if (progress) {
        progress.setAttribute('value', props.fields.Percentage.value?.toString() as string);
        progress.innerText = props.fields.Percentage.value?.toString() + '%';
      }
    }
  });

  if (props.fields) {
    const phStepItems = `stepItems-${props.params.DynamicPlaceholderId}`;
    return (
      <div data-step-name="/AppealReason">
        <div className="appealReasonStep px-4 py-6">
          <h4 className="text-center mb-4 mb-lg-6">
            <Text field={props.fields.Question} />
          </h4>
          <div className="appealReasonStep__list mx-auto">
            <Placeholder name={phStepItems} rendering={props.rendering} />
          </div>
          <div className="text-center mt-4 mt-md-6">
            <JssLink
              id="nextButton"
              field={props.fields.Button}
              className="customButton customButton_primary customButton_large"
            >
              {/* <button
                className="customButton customButton_primary customButton_large"
                type="submit"
                disabled
                data-autotest-button-submit-next=""
              >
                <span className="customButton__inner">
                  <span className="customButton__text">{props.fields.Button.value.title}</span>
                </span>
              </button> */}
            </JssLink>
          </div>
          <div
            id="StepMessage"
            className="px-0 px-md-8 mt-2 mt-md-0 mb-4 h4 text-center text-orangeDeep100"
          ></div>
        </div>
      </div>
    );
  }

  return <HomeBuddyAdvantageDefaultComponent {...props} />;
};
