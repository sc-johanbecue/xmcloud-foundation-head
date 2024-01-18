import React from 'react';
import { Text, useSitecoreContext, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Heading, Divider } from '@chakra-ui/react';

interface Fields {
  data: {
    datasource: {
      field: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
    };
    contextItem: {
      field: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
    };
  };
}

type TitleProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: TitleProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource || props.fields?.data?.contextItem;
  const { sitecoreContext } = useSitecoreContext();

  const text: TextField = {
    value: datasource?.field?.jsonValue?.value,
    editable: datasource?.field?.jsonValue?.editable,
  };
  if (sitecoreContext.pageState !== 'normal' && !text.value) {
    text.value = 'Title field';
  }

  return (
    <div
      className={`component ${props.params.styles}`}
      id={props.params.RenderingIdentifier ? props.params.RenderingIdentifier : undefined}
    >
      <Heading variant={'brandPrimaryInverted'}>
        <Text field={text} />
      </Heading>
      <Divider variant={'brandPrimary'} />
    </div>
  );
};
