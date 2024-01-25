import React from 'react';
import { Image as JssImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

interface Fields {
  Logo: ImageField;
  HappyGateauLogo: ImageField;
  HappyGateauInvertedLogo: ImageField;
}

type LLBGHeaderMenuProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LLBGHeaderMenuDefaultComponent = (props: LLBGHeaderMenuProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LLBGHeaderMenuProps): JSX.Element => {
  if (props.fields) {
    return (
      <nav className="navbar navbar-expand-lg sticky-top navbar-light width100Procent">
        <button
          className="navbar-toggler borderNone"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon color-red"></span>
        </button>
        <Link
          className="navbar-brand d-lg-none marginZeroAuto"
          href="https://www.lalorraine.com/be-nl/consument"
        >
          <JssImage field={props.fields.Logo} />
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link
            href="#"
            className="navbar-close float-right d-lg-none"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-times mt-4 mr-3 fontSize19em"></i>
          </Link>
          <ul className="pt-5 navbar-nav navbar-expand d-lg-none justify-content-left">
            <li className="nav-item dropdown ">
              <Link
                className="nav-link dropdown-toggle navbar-red-country"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-globe mr-2"></i> Belgium (Dutch )
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
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
                <Link
                  className="text-right dropdown-item  country-menu-link"
                  href="/sk-sk/zakaznik"
                >
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
          <ul className="navbar-nav top-menu navbar-expand-sm nav-pills nav-fill d-lg-none  mb-3">
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
          </ul>
          <ul className="navbar-nav main-menu ml-auto flex1">
            <li className="nav-item maxWidth220px">&nbsp;</li>
            <li className="nav-item">
              <Link className="navbar-brand" href="https://www.lalorraine.com/be-nl/consument">
                <JssImage field={props.fields.Logo} />
              </Link>
            </li>
            <li className="nav-item active">
              <Link href="https://www.lalorraine.com/be-nl/consument" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item ">
              <Link href="https://www.lalorraine.com/be-nl/consument/over-ons" className="nav-link">
                Over ons
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                href="https://www.lalorraine.com/be-nl/consument/producten"
                className="nav-link"
              >
                Producten
              </Link>
            </li>
            <li className="nav-item ">
              <Link href="https://www.lalorraine.com/be-nl/consument/winkels" className="nav-link">
                Winkels
              </Link>
            </li>
            <li className="nav-item ">
              <Link href="https://www.lalorraine.com/be-nl/consument/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav main-menu ml-auto">
            <li className="nav-item mr-xl-5">
              <Link className="nav-link" href="http://happygateau.lalorraine.be/nl" target="_blank">
                <JssImage
                  field={props.fields.HappyGateauLogo}
                  className="ml-2 d-none d-lg-block width120px"
                />
                <JssImage
                  field={props.fields.HappyGateauInvertedLogo}
                  className="d-lg-none width120px"
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return <LLBGHeaderMenuDefaultComponent {...props} />;
};

export const WithText = (props: LLBGHeaderMenuProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}></div>
    );
  }

  return <LLBGHeaderMenuDefaultComponent {...props} />;
};
