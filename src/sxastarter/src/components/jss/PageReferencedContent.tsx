import React from 'react';
import {
  Image as JssImage,
  RichText as JssRichText,
  Text as JssText,
  TextField,
  ImageField,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Badge, Text } from '@chakra-ui/react';

interface Fields {
  data: {
    datasource: {
      url: {
        path: string;
        siteName: string;
      };
    };
    contextItem: {
      url: {
        path: string;
        siteName: string;
      };
      marketingText: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      content: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      abstract: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      tag: {
        jsonValue: {
          fields: {
            Title: {
              value: string;
            };
          };
          // editable: string;
        };
      };
      publicationDate: {
        jsonValue: {
          value: string;
          editable: string;
        };
      };
      image: {
        jsonValue: {
          value: {
            src: string;
            alt: string;
            width: string;
            height: string;
          };
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

type ComponentContentProps = {
  id: string;
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component title ${props.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export const Content = (props: TitleProps): JSX.Element => {
  const datasource = props.fields?.data?.contextItem;

  const text: RichTextField = {
    value: datasource?.content != null ? datasource?.content?.jsonValue?.value : 'Content Field',
    editable: datasource?.content?.jsonValue?.editable,
  };

  return (
    <ComponentContent styles={props.params.styles} id={props.params.RenderingIdentifier}>
      <>
        <Text as="div">
          <JssRichText field={text} />
        </Text>
      </>
    </ComponentContent>
  );
};

export const Abstract = (props: TitleProps): JSX.Element => {
  const datasource = props.fields?.data?.contextItem;

  const text: TextField = {
    value: datasource?.abstract != null ? datasource?.abstract?.jsonValue?.value : 'Abstract Field',
    editable: datasource?.abstract?.jsonValue?.editable,
  };

  return (
    <ComponentContent styles={props.params.styles} id={props.params.RenderingIdentifier}>
      <>
        <Text>
          <JssText field={text} />
        </Text>
      </>
    </ComponentContent>
  );
};

export const Tag = (props: TitleProps): JSX.Element => {
  const datasource = props.fields?.data?.contextItem;

  const text: TextField = {
    value: datasource?.tag != null ? datasource?.tag?.jsonValue?.fields?.Title?.value : 'Tag Field',
    //editable: datasource?.tag?.jsonValue?.editable,
  };

  return (
    <ComponentContent styles={props.params.styles} id={props.params.RenderingIdentifier}>
      {datasource?.tag?.jsonValue?.fields?.Title?.value ? (
        <Badge variant={'brandFilled'} fontSize="1.25em">
          <JssText field={text} />
        </Badge>
      ) : (
        <></>
      )}
    </ComponentContent>
  );
};

export const PublicationDate = (props: TitleProps): JSX.Element => {
  const datasource = props.fields?.data?.contextItem;
  const publicationDateValue = datasource?.publicationDate?.jsonValue?.value;
  const publicationDate = new Date(publicationDateValue ? publicationDateValue : '');
  const dateToDisplay = publicationDate.toLocaleDateString();

  return (
    <ComponentContent styles={props.params.styles} id={props.params.RenderingIdentifier}>
      {publicationDateValue != '0001-01-01T00:00:00Z' ? (
        <Text fontWeight={'extrabold'} fontSize={'3xl'}>
          {publicationDateValue ? dateToDisplay : <>Date Field</>}
        </Text>
      ) : (
        <></>
      )}
    </ComponentContent>
  );
};

export const Image = (props: TitleProps): JSX.Element => {
  const datasource = props.fields?.data?.contextItem;

  const JssImageField: ImageField = {
    value: { src: datasource?.image?.jsonValue?.value?.src },
    editable: datasource?.image?.jsonValue?.editable,
  };

  return (
    <div className={`component image ${props.params.styles}`} id={props.params.RenderingIdentifier}>
      <div className="component-content">
        <div className="title-field-image">
          {datasource?.image ? <JssImage field={JssImageField} /> : <>Image Field</>}
        </div>
      </div>
    </div>
  );
};
