import React from 'react';
import {
  Image as JssImage,
  RichText as JssRichText,
  ImageField,
  TextField,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
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

type LLBGHeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LLBGHeaderDefaultComponent = (props: LLBGHeaderProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LLBGHeaderProps): JSX.Element => {
  if (props.fields) {
    return (
      <nav className="navbar navbar-red navbar-expand-lg bg-red my-0 py-0 d-none d-lg-flex width100Procent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" href="/be-nl/professioneel/contact">
              Retailer
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/be-nl/professioneel">
              Professioneel
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" href="/be-nl/consument">
              Consument
            </Link>
          </li>
          <li className="nav-item dropdown  ml-5">
            <Link
              className="nav-link dropdown-toggle navbar-red-country pl-5"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-globe mr-2"></i> Belgium (Dutch)
            </Link>
            <div
              className="dropdown-menu navbar-red-country-dropdown"
              aria-labelledby="navbarDropdown"
            >
              <Link
                className="text-right dropdown-item country-menu-link"
                href="https://www.lalorraine.com/be-fr/consommateur"
              >
                Belgium (French )
              </Link>
              <Link
                className="text-right dropdown-item  country-menu-link"
                href="/cz-cs/spotrebitel"
              >
                Czech republic
              </Link>
              <Link
                className="text-right dropdown-item  country-menu-link"
                href="/pl-pl/dla-konsumentow"
              >
                Poland
              </Link>
              <Link
                className="text-right dropdown-item  country-menu-link"
                href="/hu-hu/fogyasztoi"
              >
                Hungary
              </Link>
              <Link className="text-right dropdown-item  country-menu-link" href="/sk-sk/zakaznik">
                Slovakia
              </Link>
              <Link
                className="text-right dropdown-item  country-menu-link"
                href="/tr-tk/tuketiciler-icin"
              >
                Turkey
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    );
  }

  return <LLBGHeaderDefaultComponent {...props} />;
};

export const WithText = (props: LLBGHeaderProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            JBE3
            <JssImage field={props.fields.MasterAsset} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText className="promo-text" field={props.fields.ShortDescription} />
              </div>
            </div>
            <div className="field-promotext">
              <JssRichText className="promo-text" field={props.fields.LongDescription} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <LLBGHeaderDefaultComponent {...props} />;
};
