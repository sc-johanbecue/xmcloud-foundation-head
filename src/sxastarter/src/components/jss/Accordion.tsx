import React from 'react';
import {
  Field,
  Text,
  ComponentRendering,
  ComponentParams,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Accordion, Box, Heading } from '@chakra-ui/react';

interface Fields {
  Title: Field<string>;
}

type AccordionProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const AccordionDefaultComponent = (props: AccordionProps): JSX.Element => (
  <div className={`component faq ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Accordion</span>
    </div>
  </div>
);

export const Default = (props: AccordionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const phKey = `accordion-${props.params.DynamicPlaceholderId}`;
  if (props.fields) {
    return (
      <div className={`component accordion ${props.params.styles}`} id={id ? id : undefined}>
        <Heading variant={'accordion'}>
          <Text field={props.fields.Title} />
        </Heading>
        <Box>
          <Accordion variant={'brandPrimary'}>
            <Placeholder name={phKey} rendering={props.rendering} />
          </Accordion>
        </Box>
      </div>
    );
  }

  return <AccordionDefaultComponent {...props} />;
};
