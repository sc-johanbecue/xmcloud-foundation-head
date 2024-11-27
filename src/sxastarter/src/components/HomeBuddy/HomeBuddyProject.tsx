import React from 'react';
import { ImageField, TextField, Text, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

interface Fields {
  Title: TextField;
  Image: ImageField;
}

type HomeBuddyProjectProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const HomeBuddyProjectDefaultComponent = (props: HomeBuddyProjectProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: HomeBuddyProjectProps): JSX.Element => {
  if (props.fields) {
    return (
      <li className="homeImprovements__item">
        <Link
          href="/walk-in-showers"
          className="homeImprovements__link d-flex flex-column align-items-center px-2 py-4 p-lg-6"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Image
            field={props.fields.Image}
            className="homeImprovements__img d-block"
            width="96"
            height="96"
            loading="lazy"
          />
          <span className="homeImprovements__txt text-center d-flex align-items-center">
            <Text field={props.fields.Title} />
          </span>
        </Link>
      </li>
    );
  }

  return <HomeBuddyProjectDefaultComponent {...props} />;
};
