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

type LynkAndCoHeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LynkAndCoHeaderDefaultComponent = (props: LynkAndCoHeaderProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LynkAndCoHeaderProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="header-bar_headerContainer__Whkhw" style={{ width: '100%' }}>
        <div style={{ height: '72px' }}>
          <header className="header-bar_header__9Zu+o">
            <div className="header-bar_headerCover__9tGKA"></div>
            <span className="logo_logo__yeurP">
              <Link href="/en">
                <div className="image no-hover">
                  <div>
                    <img
                      alt="logo"
                      data-chromatic="ignore"
                      loading="lazy"
                      sizes="(min-width: 1200px) 992px, 768px, 500px, 300px"
                      srcSet="https://owscd-lynkco.azureedge.net/-/jssmedia/lynkco-global-portal/data/media/img/logo.ashx?mw=300&amp;rev=d9e95c0d39af4109abfb2a4305b67d4e 300w"
                      src="https://owscd-lynkco.azureedge.net/-/jssmedia/lynkco-global-portal/data/media/img/logo.ashx?iar=0&amp;rev=d9e95c0d39af4109abfb2a4305b67d4e&amp;hash=518339B64EBB636A8AAC7B8D64B8DECB"
                    ></img>
                  </div>
                </div>
              </Link>
            </span>
            <div className="header-bar_otherLinks__EffnI">
              <Link
                className="header-bar_store__C9onf primary-link white"
                tabIndex={0}
                target=""
                href="/en/help"
              >
                <span className="primary-link__content" tabIndex={-1}>
                  <span className="buttonText">Help</span>
                  <div className="icon-container">
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-3.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"></path>
                      </svg>
                    </span>
                  </div>
                </span>
              </Link>
              <Link
                className="header-bar_loginIcon__d24Cc primary-link white"
                tabIndex={0}
                target=""
                href="/en/login"
              >
                <span className="primary-link__content" tabIndex={-1}>
                  <span className="buttonText">Log in</span>
                  <div className="icon-container">
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                      </svg>
                    </span>
                  </div>
                </span>
              </Link>
            </div>
            <span hidden={false}></span>
          </header>
        </div>
        <div className="mobile-nav-menu_triggerContainer__MNJkw">
          <div className="hit-area">
            <button className="trigger" id="mobile-main-menus-btn">
              <span className="trigger__line">
                <span className="trigger__line__top"></span>
                <span className="trigger__line__bottom"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <LynkAndCoHeaderDefaultComponent {...props} />;
};
