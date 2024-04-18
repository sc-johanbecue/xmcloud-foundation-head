import React from 'react';
import { ImageField, TextField, Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Text: TextField;
  BackgroundColor: TextField;
  Image: ImageField;
}

type BeaulieuTileProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BeaulieuTileDefaultComponent = (props: BeaulieuTileProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: BeaulieuTileProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="margin-bottom-15 ">
        <a
          href="https://www.berryalloc.com/global/en/laminate"
          className="component component-cta-small"
          style={{ padding: '0px' }}
        >
          <Image
            field={props.fields.Image}
            className="img-responsive"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: '-1',
            }}
          />
          <div
            className="display-table center js-equal-cta-small"
            style={{ backgroundColor: props.fields.BackgroundColor.value?.toString() }}
          >
            <div className="display-table-cell">
              <h3 className="cta-title">
                <Text field={props.fields.Title} />
              </h3>
              <p className="cta-text">
                <Text field={props.fields.Text} />
              </p>
            </div>
          </div>
        </a>
      </div>
    );
  }

  return <BeaulieuTileDefaultComponent {...props} />;
};
