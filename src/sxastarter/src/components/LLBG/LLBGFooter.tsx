import React from 'react';
import { Image as JssImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

interface Fields {
  Logo: ImageField;
  GroupLogo: ImageField;
  InstagramLogo: ImageField;
  FacebookLogo: ImageField;
}

type LLBGFooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LLBGFooterDefaultComponent = (props: LLBGFooterProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: LLBGFooterProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="container-fluid footer-bg">
        <div className="row">
          <div className="col-12 footer-menu-image"></div>
          <div className="col-12 text-center footer-menu-sm px-0">
            <Link href="https://www.lalorraine.com/be-nl/consument/legal/juridische-kennisgeving">
              Juridische kennisgeving
            </Link>{' '}
            |
            <Link href="https://www.lalorraine.com/be-nl/consument/juridisch/privacy-policy">
              Privacy policy
            </Link>{' '}
            |
            <Link href="https://www.lalorraine.com/be-nl/consument/juridisch/cookie-policy">
              Cookie policy
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col text-center paddingTop30px">
            <div className="footer-social">
              <Link
                href="https://www.facebook.com/lalorrainevers"
                title="Facebook "
                target="_blank"
              >
                <JssImage
                  field={props.fields.FacebookLogo}
                  className="width100Procent maxWidth210px"
                  alt="Facebook Logo"
                />
              </Link>
              <Link
                href="https://www.instagram.com/lalorrainebelgium/"
                title="Instagram"
                target="_blank"
              >
                <JssImage
                  field={props.fields.InstagramLogo}
                  className="width100Procent maxWidth210px"
                  alt="Instagram Logo"
                />
              </Link>
            </div>
            <JssImage
              field={props.fields.Logo}
              className="width30Procent maxWidth160px marginLeft10px floatLeft"
              alt="La Lorraine"
            />
            <Link
              href="http://www.llbg.com/BE/nl"
              target="_blank"
              className="margin20px10px0 floatRight displayBlock"
            >
              <JssImage
                field={props.fields.GroupLogo}
                className="width100Procent maxWidth210px"
                alt="La Lorraine Bakery Broup"
              />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col text-center copyrightFooterDiv">© La Lorraine Bakery Group 2024</div>
        </div>
      </div>
    );
  }

  return <LLBGFooterDefaultComponent {...props} />;
};

export const WithText = (props: LLBGFooterProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}></div>
    );
  }

  return <LLBGFooterDefaultComponent {...props} />;
};
