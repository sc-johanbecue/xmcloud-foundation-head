import React from 'react';
import {
  ImageField,
  TextField,
  Text,
  Image,
  Field,
  LinkField,
  useSitecoreContext,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  CheckBoxName: TextField;
  CheckBoxValue: TextField;
  Text: TextField;
  Image: ImageField;
  DisableNext: Field<boolean>;
  NextButtonLink: LinkField;
  Message: TextField;
}

type HomeBuddyAdvantageProps = {
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
  const { sitecoreContext } = useSitecoreContext();

  const handleClick = () => {
    const stepMessage = document.getElementById('StepMessage');
    const nextButton = document.getElementById('nextButton');

    if (stepMessage) {
      stepMessage.innerText = props.fields.Message.value as string;
    }

    if (nextButton) {
      if (props.fields.DisableNext.value == true) {
        nextButton.attributes['disabled'].value = true;
      } else {
        nextButton.attributes['disabled'].value = false;
      }
    }
  };

  const ExtraInfoId = `ExtraInfo-${props.params.DynamicPlaceholderId}`;

  const handleExtraClick = () => {
    const extraInfo = document.getElementById(ExtraInfoId);
    if (extraInfo) {
      if (extraInfo.style.visibility == 'hidden') {
        extraInfo.style.visibility = 'visible';
      } else {
        extraInfo.style.visibility = 'hidden';
      }
    }
  };

  if (props.fields) {
    const phId = `StepItem-${props.params.DynamicPlaceholderId}`;

    if (sitecoreContext?.pageEditing) {
      return (
        <>
          <div className="appealReasonStep__item" style={{ gridColumn: 'span 7' }}>
            <div className="QWb89qL6CSRSH4U1BmAQ" onClick={() => handleClick()}>
              <input
                className="KUG9_L5_0hYiLLVaC2JE"
                name={props.fields.CheckBoxName.value?.toString()}
                type="checkbox"
                data-autotest-checkbox-whynewshower-saferbathing=""
                value={props.fields.CheckBoxValue.value?.toString()}
                id={phId}
              />
              <label
                className="rzFupZ8NWXujFtl7GxdV d-flex align-items-center flex-md-column text-md-center px-6 py-4 py-md-6"
                htmlFor="7a53f0b6-53e8-4279-b86b-aa09bb63f369"
              >
                <Image
                  field={props.fields.Image}
                  className="LBG0AiT85WXMV6zqVu65 d-block me-4 me-md-0 mb-md-4"
                  aria-hidden="true"
                />
                <span className="h5 font-weight-medium d-flex align-items-center justify-content-md-center flex-grow-1">
                  <Text field={props.fields.Text} />
                </span>
              </label>
              <div
                id={ExtraInfoId}
                style={{
                  visibility: 'hidden',
                  backgroundColor: '#CCCCCC',
                  zIndex: '100',
                  position: 'absolute',
                  border: '1px solid black',
                  padding: '5px',
                  boxShadow: '3px 5px #CCCCCC',
                }}
              >
                Checkbox Name: <Text field={props.fields.CheckBoxName} />
                <br />
                Checkbox Value: <Text field={props.fields.CheckBoxValue} />
                <br />
                Next Link: <Link field={props.fields.NextButtonLink} />
              </div>
            </div>
          </div>
          <i
            style={{
              top: '10px',
              right: '30px',
              width: '5px',
              height: '5px',
              position: 'relative',
              backgroundColor: 'red',
            }}
            onClick={() => handleExtraClick()}
          ></i>
        </>
      );
    } else {
      return (
        <>
          <div className="appealReasonStep__item">
            <div className="QWb89qL6CSRSH4U1BmAQ" onClick={() => handleClick()}>
              <input
                className="KUG9_L5_0hYiLLVaC2JE"
                name={props.fields.CheckBoxName.value?.toString()}
                type="checkbox"
                data-autotest-checkbox-whynewshower-saferbathing=""
                value={props.fields.CheckBoxValue.value?.toString()}
                id={phId}
              />
              <label
                className="rzFupZ8NWXujFtl7GxdV d-flex align-items-center flex-md-column text-md-center px-6 py-4 py-md-6"
                htmlFor="7a53f0b6-53e8-4279-b86b-aa09bb63f369"
              >
                <Image
                  field={props.fields.Image}
                  className="LBG0AiT85WXMV6zqVu65 d-block me-4 me-md-0 mb-md-4"
                  aria-hidden="true"
                />
                <span className="h5 font-weight-medium d-flex align-items-center justify-content-md-center flex-grow-1">
                  <Text field={props.fields.Text} />
                </span>
              </label>
            </div>
          </div>
        </>
      );
    }
  }

  return <HomeBuddyAdvantageDefaultComponent {...props} />;
};
