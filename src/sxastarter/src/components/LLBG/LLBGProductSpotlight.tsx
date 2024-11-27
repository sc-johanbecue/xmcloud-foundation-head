import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  TextField,
  LinkField,
  Text,
  RichTextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Link } from '@chakra-ui/react';

interface Fields {
  Title: TextField;
  Icon: TextField;
  Content: RichTextField;
  Image: ImageField;
  Link: LinkField;
  Label: TextField;
  LongDescription: RichTextField;
  MasterAsset: ImageField;
  ContentHubUrl: TextField;
}

type LLBGSpotlightProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LLBGSpotlightDefaultComponent = (props: LLBGSpotlightProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LLBGSpotlightProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const handleClick = (path: any) => {
    window.open(path, 'contentHub');
  };

  if (props.fields) {
    if (sitecoreContext?.pageEditing) {
      return (
        <div className="col-12 paddingBottom20px">
          <Link
            href={props.fields.Link.value.href}
            className="b2b-homepage-spotlight box-link textDecorationNone"
          >
            <JssImage
              field={props.fields.MasterAsset}
              className="width100Procent"
              editable={false}
            />
            <h3 onClick={() => handleClick(props.fields.ContentHubUrl.value?.toString())}>
              <Text field={props.fields.Label} editable={false} />
            </h3>
            <div className="marginBottom100px textAlignJustify">
              <Text field={props.fields.LongDescription} editable={false} />
            </div>
            <div className="positionAbsolute bottom40px width90Procent left50Procent transformTranslateXMinus50Procent">
              <span className="main-button-new">
                <JssLink field={props.fields.Link} />
              </span>
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="col-12">
          <Link
            href={props.fields.Link.value.href}
            className="b2b-homepage-spotlight box-link textDecorationNone"
          >
            <JssImage field={props.fields.MasterAsset} className="width100Procent" />
            <h3>
              <Text field={props.fields.Label} />
            </h3>
            <div className="marginBottom100px">
              <Text field={props.fields.LongDescription} />
            </div>
            <div className="positionAbsolute bottom40px width90Procent left50Procent transformTranslateXMinus50Procent">
              <span className="main-button-new">
                <JssLink field={props.fields.Link} />
              </span>
            </div>
          </Link>
        </div>
      );
    }
  }

  return <LLBGSpotlightDefaultComponent {...props} />;
};

export const OverwriteDefault = (props: LLBGSpotlightProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="col-12">
        <Link
          href={props.fields.Link.value.href}
          className="b2b-homepage-spotlight box-link textDecorationNone"
        >
          <JssImage field={props.fields.Image} className="width100Procent" />
          <h3>
            <Text field={props.fields.Title} />
          </h3>
          <div className="marginBottom100px">
            <Text field={props.fields.Content} />
          </div>
          <div className="positionAbsolute bottom40px width90Procent left50Procent transformTranslateXMinus50Procent">
            <span className="main-button-new">
              <JssLink field={props.fields.Link} />
            </span>
          </div>
        </Link>
      </div>
    );
  }

  return <LLBGSpotlightDefaultComponent {...props} />;
};
