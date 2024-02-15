import React from 'react';
import Link from 'next/link';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  Text,
  TextField,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Description: TextField;
  ButtonText: TextField;
  Image: ImageField;
  Link: LinkField;
}

type LynkAndCoHeaderZigZagBlockProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LynkAndCoHeaderZigZagBlockDefaultComponent = (
  props: LynkAndCoHeaderZigZagBlockProps
): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LynkAndCoHeaderZigZagBlockProps): JSX.Element => {
  if (props.fields) {
    return (
      <section
        className="ZigZagBlock_mediaBlock__dDKjU grid padding-top-default padding-bottom-default"
        style={{ background: 'rgb(19, 19, 19)', width: '100%' }}
      >
        <section className="ZigZagBlock_mediaBlockItems__I0sk+">
          <article className="ZigZagBlockItem_swap__6+3M7">
            <div className="ZigZagBlockItem_image__EpZME isrounded">
              <JssImage
                field={props.fields.Image}
                data-chromatic="ignore"
                width={1000}
                height={750}
              />
            </div>
            <section className="ZigZagBlockItem_articleDescriptionContainer__I4AuY grid">
              <div className="ZigZagBlockItem_articleDescription__l7v51">
                <div className="ZigZagBlockItem_aligner__+NXjY">
                  <h2>
                    <br className="type-h2" />
                    <span className="type-h2">
                      <Text field={props.fields.Title} />
                    </span>
                  </h2>
                  <div className="body ZigZagBlockItem_articleDescriptionBody__yZny5">
                    <p>
                      <Text field={props.fields.Description} />
                    </p>
                  </div>
                  <Link
                    className="primary-link green"
                    tabIndex={0}
                    href="https://www.lynkco.com/en/business"
                    target=""
                  >
                    <span className="primary-link__content" tabIndex={-1}>
                      <span className="buttonText">
                        <JssLink
                          className="primary-link green"
                          tabIndex={0}
                          field={props.fields.Link}
                          target=""
                        />
                      </span>
                      <div className="icon-container">
                        <span className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M1 11.1111H18.3189L13.9433 6.72333L15.6667 5L23 12.3333L15.6667 19.6667L13.9433 17.9433L18.3189 13.5556H1V11.1111Z"
                              fill="black"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </span>
                  </Link>
                </div>
              </div>
            </section>
          </article>
        </section>
      </section>
    );
  }

  return <LynkAndCoHeaderZigZagBlockDefaultComponent {...props} />;
};
