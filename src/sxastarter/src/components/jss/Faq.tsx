import React from 'react';
import {
  RichText as JssRichText,
  Field,
  Text,
  RichTextField,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Heading,
  Container,
} from '@chakra-ui/react';

interface Fields {
  Title: Field<string>;
  Faqs: FaqItem[];
}

interface FaqItem {
  fields: {
    Question: Field<string>;
    Answer: RichTextField;
  };
}

type FaqProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const FaqDefaultComponent = (props: FaqProps): JSX.Element => (
  <div className={`component faq ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: FaqProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component faq ${props.params.styles}`} id={id ? id : undefined}>
        <Heading variant={'accordion'}>
          <Text field={props.fields.Title} />
        </Heading>
        <div className="component-content">
          {(props?.fields?.Faqs?.length ?? 0) > 0 ? (
            <Accordion variant={'brandPrimary'}>
              {props.fields.Faqs.map((element, key) => {
                return (
                  <AccordionItem key={key}>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <Heading variant={'accordion'}>
                            <Text field={element.fields.Question} />
                          </Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Container variant={'brandPrimary'}>
                        <JssRichText field={element.fields.Answer} />
                      </Container>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            <>
              <Text>No FAQs added...</Text>
            </>
          )}
        </div>
      </div>
    );
  }

  return <FaqDefaultComponent {...props} />;
};
