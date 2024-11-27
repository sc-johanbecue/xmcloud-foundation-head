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

type BeaulieuFooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BeaulieuFooterDefaultComponent = (props: BeaulieuFooterProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: BeaulieuFooterProps): JSX.Element => {
  if (props.fields) {
    return (
      <footer className="footer" data-analytics-footer>
        <div className="footer__container container pt-6 pb-4">
          <div className="footer__wrapper">
            <div className="logo footer__logo mb-8 mb-lg-5">
              <Link href="/" className="logo__container">
                <svg className="logo__img" viewBox="0 0 202 30" fill="none">
                  <path
                    fill="#ffffff"
                    d="M19.26 1.26v21H14.4v-8.61H4.86v8.61H0v-21h4.86v8.28h9.54V1.26h4.86ZM31.58 22.5c-1.7 0-3.23-.35-4.6-1.05a8.05 8.05 0 0 1-4.28-7.26 7.84 7.84 0 0 1 4.29-7.23 9.66 9.66 0 0 1 4.59-1.08c1.7 0 3.22.36 4.56 1.08a7.84 7.84 0 0 1 4.29 7.23 8.05 8.05 0 0 1-4.29 7.26 9.7 9.7 0 0 1-4.56 1.05Zm0-3.84c1.2 0 2.18-.4 2.94-1.2a4.55 4.55 0 0 0 1.17-3.27c0-1.36-.4-2.44-1.17-3.24a3.83 3.83 0 0 0-2.94-1.23c-1.2 0-2.2.41-2.97 1.23a4.44 4.44 0 0 0-1.17 3.24c0 1.36.39 2.45 1.17 3.27.78.8 1.77 1.2 2.97 1.2ZM64.23 5.88c2.02 0 3.62.6 4.8 1.8 1.2 1.18 1.8 2.96 1.8 5.34v9.24h-4.68v-8.52c0-1.28-.27-2.23-.81-2.85-.52-.64-1.27-.96-2.25-.96-1.1 0-1.97.36-2.61 1.08-.64.7-.96 1.75-.96 3.15v8.1h-4.68v-8.52c0-2.54-1.02-3.81-3.06-3.81-1.08 0-1.94.36-2.58 1.08-.64.7-.96 1.75-.96 3.15v8.1h-4.68V6.12h4.47v1.86c.6-.68 1.33-1.2 2.19-1.56a7.53 7.53 0 0 1 5.97.15 5.37 5.37 0 0 1 2.22 1.95 6.65 6.65 0 0 1 2.49-1.95 8 8 0 0 1 3.33-.69ZM91 14.25c0 .06-.02.48-.08 1.26H78.7a3.8 3.8 0 0 0 1.56 2.37c.82.58 1.84.87 3.06.87a6.3 6.3 0 0 0 2.22-.36 5.57 5.57 0 0 0 1.83-1.2l2.49 2.7c-1.52 1.74-3.74 2.61-6.66 2.61-1.82 0-3.43-.35-4.83-1.05A7.9 7.9 0 0 1 74 14.19c0-1.58.37-3 1.1-4.26a7.88 7.88 0 0 1 3.1-2.97 9.06 9.06 0 0 1 4.4-1.08 9 9 0 0 1 4.3 1.02 7.32 7.32 0 0 1 3 2.94 8.55 8.55 0 0 1 1.1 4.41Zm-8.36-4.83c-1.06 0-1.95.3-2.67.9a3.83 3.83 0 0 0-1.32 2.46h7.95a3.9 3.9 0 0 0-3.96-3.36ZM109.87 11.34a5.19 5.19 0 0 1 3.84 5.19c0 1.84-.72 3.26-2.16 4.26-1.42.98-3.5 1.47-6.24 1.47H94.45v-21h10.26c2.56 0 4.52.49 5.88 1.47a4.64 4.64 0 0 1 2.07 3.99 5.04 5.04 0 0 1-2.79 4.62ZM99.28 4.92v4.95h4.83c1.2 0 2.11-.21 2.73-.63a2.1 2.1 0 0 0 .93-1.86c0-.82-.3-1.43-.93-1.83a4.88 4.88 0 0 0-2.73-.63h-4.83Zm5.67 13.68a5.3 5.3 0 0 0 2.88-.63c.66-.42 1-1.07 1-1.95 0-1.74-1.3-2.61-3.88-2.61h-5.67v5.19h5.67ZM133.32 6.12v16.14h-4.44v-1.92a6.37 6.37 0 0 1-5 2.16c-2.13 0-3.8-.61-5.05-1.83-1.24-1.22-1.86-3.03-1.86-5.43V6.12h4.68v8.43c0 2.6 1.1 3.9 3.27 3.9 1.12 0 2.02-.36 2.7-1.08.68-.74 1.02-1.83 1.02-3.27V6.12h4.68ZM154.1 0v22.26h-4.47V20.4c-1.16 1.4-2.84 2.1-5.04 2.1-1.52 0-2.9-.34-4.14-1.02a7.33 7.33 0 0 1-2.88-2.91 8.87 8.87 0 0 1-1.05-4.38c0-1.66.35-3.12 1.05-4.38a7.33 7.33 0 0 1 2.88-2.91 8.47 8.47 0 0 1 4.14-1.02c2.06 0 3.67.65 4.83 1.95V0h4.68Zm-8.7 18.66c1.18 0 2.16-.4 2.94-1.2a4.55 4.55 0 0 0 1.17-3.27c0-1.36-.4-2.44-1.17-3.24a3.89 3.89 0 0 0-2.94-1.23c-1.2 0-2.2.41-2.97 1.23a4.44 4.44 0 0 0-1.17 3.24c0 1.36.39 2.45 1.17 3.27.78.8 1.77 1.2 2.97 1.2ZM174.87 0v22.26h-4.47V20.4c-1.16 1.4-2.84 2.1-5.04 2.1-1.52 0-2.9-.34-4.14-1.02a7.33 7.33 0 0 1-2.88-2.91 8.87 8.87 0 0 1-1.05-4.38c0-1.66.35-3.12 1.05-4.38a7.33 7.33 0 0 1 2.88-2.91 8.47 8.47 0 0 1 4.14-1.02c2.06 0 3.67.65 4.83 1.95V0h4.68Zm-8.7 18.66c1.18 0 2.16-.4 2.94-1.2a4.55 4.55 0 0 0 1.17-3.27c0-1.36-.39-2.44-1.17-3.24a3.89 3.89 0 0 0-2.94-1.23c-1.2 0-2.19.41-2.97 1.23a4.44 4.44 0 0 0-1.17 3.24c0 1.36.39 2.45 1.17 3.27.78.8 1.77 1.2 2.97 1.2ZM195.22 6.12l-7.29 17.13c-.74 1.86-1.66 3.17-2.76 3.93a6.65 6.65 0 0 1-3.93 1.14 8.2 8.2 0 0 1-2.49-.39 5.5 5.5 0 0 1-2-1.08l1.7-3.33a4.06 4.06 0 0 0 2.64 1.02c.64 0 1.16-.16 1.56-.48.4-.3.76-.81 1.08-1.53l.06-.15-6.99-16.26h4.83l4.53 10.95 4.56-10.95h4.5Z"
                  />
                  <path
                    fill="#fa8c16"
                    d="M198.9 22.5a2.85 2.85 0 0 1-2.91-2.94c0-.86.28-1.55.84-2.07a2.87 2.87 0 0 1 2.07-.81c.82 0 1.51.27 2.07.81.56.52.84 1.21.84 2.07a2.85 2.85 0 0 1-2.9 2.94Z"
                  />
                </svg>
              </Link>
            </div>
            <div className="footer__links mb-6 mb-lg-7">
              <ul className="footer__linksList">
                <li className="footer__linksItem mb-4 mb-lg-0">
                  <Link
                    className="footer__linksLink defaultLink defaultLink_orange"
                    href="/terms-of-use"
                  >
                    Terms Of Use
                  </Link>
                </li>
                <li className="footer__linksItem mb-4 mb-lg-0">
                  <Link
                    className="footer__linksLink defaultLink defaultLink_orange"
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="footer__linksItem mb-4 mb-lg-0">
                  <Link
                    className="footer__linksLink defaultLink defaultLink_orange"
                    href="/do-not-sell"
                  >
                    Do Not Sell
                  </Link>
                </li>
                <li className="footer__linksItem mb-4 mb-lg-0">
                  <Link
                    className="footer__linksLink defaultLink defaultLink_orange"
                    href="/careers"
                  >
                    Careers
                  </Link>
                </li>
                <li className="footer__linksItem">
                  <Link
                    className="footer__linksLink defaultLink defaultLink_orange"
                    href="/contact-us"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__mascot mb-6 mb-lg-0">
              <img
                className="footer__mascotImg"
                src="https://www.homebuddy.com/static/shared1/footer_hero.svg"
                alt="HomeBuddy Mascot"
                loading="lazy"
              />
            </div>
            <div className="footer__social mb-4 mb-lg-0">
              <p className="footer__socialTitle mb-4">Follow Us</p>
              <div className="footer__socialGroup">
                <Link
                  className="footer__socialLink"
                  target="_blank"
                  rel="noopener"
                  href="https://www.facebook.com/HomeBuddyCom"
                >
                  <svg width="32" height="32" fill="none">
                    <path
                      fill="#fff"
                      d="M16 0a16 16 0 1 0 0 32 16 16 0 0 0 0-32Zm3.79 11.06h-2.4c-.29 0-.6.37-.6.87v1.74h3l-.45 2.47h-2.56v7.44h-2.84v-7.44h-2.57v-2.47h2.58V12.2c0-2.09 1.45-3.79 3.44-3.79h2.4v2.64Z"
                    />
                  </svg>
                </Link>
                <Link
                  className="footer__socialLink"
                  target="_blank"
                  rel="noopener"
                  href="https://www.instagram.com/homebuddycom"
                >
                  <svg width="32" height="32" fill="none">
                    <path
                      fill="#fff"
                      fill-rule="evenodd"
                      d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16Zm-2.512-15.631a2.884 2.884 0 0 1 2.879-2.878 2.884 2.884 0 0 1 2.878 2.878 2.884 2.884 0 0 1-2.878 2.878 2.884 2.884 0 0 1-2.879-2.878ZM25 15.933v.923c.001 1.027.003 2.048-.057 3.075-.067 1.382-.38 2.607-1.393 3.62-1.01 1.01-2.237 1.325-3.619 1.392-1.044.059-2.082.058-3.126.056h-.871c-1.043.002-2.082.003-3.128-.056-1.382-.067-2.606-.38-3.619-1.393-1.01-1.01-1.325-2.237-1.392-3.619-.06-1.044-.058-2.084-.057-3.127v-.87c-.001-1.043-.002-2.082.057-3.128.067-1.382.38-2.606 1.392-3.619 1.01-1.01 2.237-1.325 3.62-1.392 1.044-.06 2.082-.058 3.126-.057h.871c1.043-.001 2.081-.002 3.128.057 1.381.067 2.606.38 3.618 1.392 1.01 1.01 1.326 2.237 1.393 3.62.059 1.044.058 2.082.056 3.126Zm-13.062.436a4.422 4.422 0 0 0 4.429 4.428 4.422 4.422 0 0 0 4.428-4.428 4.422 4.422 0 0 0-4.428-4.429 4.422 4.422 0 0 0-4.429 4.429Zm8.004-4.61a1.033 1.033 0 0 0 1.99.396 1.033 1.033 0 0 0-.955-1.43c-.573 0-1.035.462-1.035 1.034Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  className="footer__socialLink"
                  target="_blank"
                  rel="noopener"
                  href="https://www.tiktok.com/@homebuddycom"
                >
                  <svg width="32" height="32" fill="none">
                    <path
                      fill="#fff"
                      fill-rule="evenodd"
                      d="M16 0a16 16 0 1 0 0 32 16 16 0 0 0 0-32Zm6.4 14.5.39-.01v-2.65a4.24 4.24 0 0 1-3.9-3.78h-2.27l-.03 11.09c0 1.35-1.2 2.43-2.56 2.43a2.46 2.46 0 1 1 .3-4.9v-2.37h-.07l-.23-.02a4.82 4.82 0 1 0 4.82 4.82V12.6a4.24 4.24 0 0 0 3.55 1.91Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  className="footer__socialLink"
                  target="_blank"
                  rel="noopener"
                  href="https://www.linkedin.com/company/homebuddycom/"
                >
                  <svg width="32" height="32" fill="none">
                    <path
                      d="M16.723.211a16,16,0,1,0,16,16A16,16,0,0,0,16.723.211ZM12.806,22.843H9.566V12.416h3.24Zm-1.64-11.707a1.622,1.622,0,1,1,.042-3.24,1.623,1.623,0,1,1-.042,3.24ZM24.639,22.843H21.4V17.064c0-1.345-.47-2.258-1.642-2.258A1.78,1.78,0,0,0,18.1,16.019a2.292,2.292,0,0,0-.108.81v6.012H14.746v-7.1c0-1.3-.042-2.39-.085-3.327h2.815l.148,1.448h.065a3.751,3.751,0,0,1,3.22-1.683c2.132,0,3.73,1.428,3.73,4.5Z"
                      transform="translate(-0.723 -0.211)"
                      fill="#fff"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="footer__copyright">
              <p className="footer__copyrightText">
                © <span data-footer-copyright-year></span> HomeBuddy.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return <BeaulieuFooterDefaultComponent {...props} />;
};
