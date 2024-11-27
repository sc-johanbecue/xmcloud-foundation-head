import React from 'react';
import {
  Field,
  Text,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';

interface Fields {
  Title: Field<string>;
}

type AccordionElementProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const AccordionDefaultComponent = (props: AccordionElementProps): JSX.Element => (
  <div className={`component faq ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Accordion Element</span>
    </div>
  </div>
);

export const Default = (props: AccordionElementProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const phKey = `accordionelement-${props.params.DynamicPlaceholderId}`;
  if (props.fields) {
    return (
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading variant={'accordion'}>
                <Text field={props.fields.Title} />
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <div
            className={`component accordionElement ${props.params.styles}`}
            id={id ? id : undefined}
          >
            <div className="row">
              <Placeholder name={phKey} rendering={props.rendering} />
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>
    );
  }

  return <AccordionDefaultComponent {...props} />;
};
