import React from 'react';
import { ImageField, TextField, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

interface Fields {
  Number: TextField;
  Label: TextField;
  Name: TextField;
  Category: TextField;
  Family: TextField;
  ShortDescription: RichTextField;
  LongDescription: RichTextField;
  MasterAsset: ImageField;
}

type AmmegaCopyrightFooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const AmmegaCopyrightFooterDefaultComponent = (props: AmmegaCopyrightFooterProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: AmmegaCopyrightFooterProps): JSX.Element => {
  if (props.fields) {
    return (
      <section id="section-136-11" className=" ct-section">
        <div className="ct-section-inner-wrap">
          <div id="div_block-137-11" className="ct-div-block">
            <div id="code_block-139-11" className="ct-code-block">
              <nav id="footer_nav_sec">
                <ul>
                  <li>
                    <Link href="/cookie-policy" title="Home">
                      Cookie-Policy
                    </Link>
                  </li>
                  <span className="white-slash">/</span>
                  <li>
                    <Link href="/disclaimer" title="Blog">
                      Disclaimer
                    </Link>
                  </li>
                  <span className="white-slash">/</span>
                  <li>
                    <Link href="/privacy-policy" title="Work">
                      Privacy-Policy
                    </Link>
                  </li>
                  <span className="white-slash">/</span>
                  <li>
                    <Link href="/general-conditions" title="Resources">
                      General-Conditions
                    </Link>
                  </li>
                </ul>
              </nav>
              <p className="ps"> © 2024 AMMEGA. ALL RIGHTS RESERVED, AMMEGA.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <AmmegaCopyrightFooterDefaultComponent {...props} />;
};
