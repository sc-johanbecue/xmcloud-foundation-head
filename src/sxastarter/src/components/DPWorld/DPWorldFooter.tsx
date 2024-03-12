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

type DPWorldFooterProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DPWorldFooterDefaultComponent = (props: DPWorldFooterProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: DPWorldFooterProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="client">
        <footer>
          <div
            className="component footer-container"
            style={{
              backgroundImage:
                'url(https://dpwprod.azureedge.net/-/media/themes/dpwg/dpwg-tenant/shared/dpwg-theme/images/footerlines.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPositionX: '100%',
              backgroundPositionY: '100%',
              backgroundSize: '2260px',
            }}
          >
            <div className="container-fluid" style={{ backgroundColor: 'initial' }}>
              <div className="row">
                <div className="col-12 component" style={{ backgroundColor: 'initial' }}>
                  <div className="component-content">
                    <div className="footer">
                      <div className="footer-utility">
                        <ul></ul>
                      </div>
                      <div className="footer-nav">
                        <div className="footer-nav-block">
                          <ul className="block-half">
                            <li>
                              <Link href="/supply-chain-solutions">Solutions</Link>{' '}
                              <ul>
                                <li>
                                  <Link href="/supply-chain-solutions/freight-forwarding-services">
                                    Freight Forwarding
                                  </Link>{' '}
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/contract-logistics-services">
                                    Contract Logistics
                                  </Link>{' '}
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/market-access">
                                    Market Access
                                  </Link>{' '}
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/economic-trade-zone">
                                    Economic Zones
                                  </Link>{' '}
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/ports-and-terminals">
                                    Ports &amp; Terminals
                                  </Link>{' '}
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/marine-services">
                                    Marine Services
                                  </Link>{' '}
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <ul className="block-half">
                            <li>
                              <Link href="/industries">Industries</Link>{' '}
                              <ul>
                                <li>
                                  <Link href="/industries/automotive-logistics">Automotive</Link>{' '}
                                </li>
                                <li>
                                  <Link href="/industries/perishable-logistics">Perishables</Link>{' '}
                                </li>
                                <li>
                                  <Link href="/industries/healthcare-pharma-logistics">
                                    Healthcare
                                  </Link>{' '}
                                </li>
                                <li>
                                  <Link href="/industries/technology">Technology</Link>{' '}
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <ul className="block-half">
                            <li>
                              <Link href="/insights">Insights</Link>{' '}
                              <ul>
                                <li>
                                  <Link href="/insights/expert-opinions">Expert Insights</Link>{' '}
                                </li>
                                <li>
                                  <Link href="/news/blogs">Thought Leadership</Link>{' '}
                                </li>
                                <li>
                                  <Link href="/insights/whitepapers">Whitepapers</Link>{' '}
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <ul className="block-half">
                            <li>
                              <Link href="/sustainability">Sustainability</Link>{' '}
                              <ul>
                                <li>
                                  <Link href="/sustainability/esg-report-2022">ESG</Link>{' '}
                                </li>
                                <li>
                                  <Link href="/sustainability/climate-change">Climate Change</Link>{' '}
                                </li>
                                <li>
                                  <Link href="/sustainability/education">Education</Link>{' '}
                                </li>
                              </ul>
                            </li>
                          </ul>

                          <ul className="block-full">
                            <li>
                              <Link href="/about-us">About us</Link>
                            </li>
                            <li>
                              <Link href="/partnerships">Partnerships</Link>
                            </li>
                            <li>
                              <Link href="/digital-solutions">Digital Solutions</Link>
                            </li>
                            <li>
                              <Link href="/investors">Investors</Link>
                            </li>
                            <li>
                              <Link href="/careers">Careers</Link>
                            </li>
                            <li>
                              <Link href="/news">News</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="footer-contact">
                          <div className="contact-info">
                            <h3>Contact</h3>
                            <p>We’d love to hear from you</p>
                            <p>
                              <Link href="tel:+97148080800" target="_blank">
                                +971 48 08 08 00
                              </Link>
                            </p>
                          </div>
                          <div className="social-info">
                            <h3>Follow us</h3>
                            <ul>
                              <li>
                                <Link
                                  href="https://www.linkedin.com/company/dp-world/"
                                  target="_blank"
                                >
                                  {' '}
                                  <span aria-label="linkedin" className="icon-linkedin icon"></span>
                                </Link>{' '}
                              </li>
                              <li>
                                <Link href="https://facebook.com/DPWorld" target="_blank">
                                  {' '}
                                  <span aria-label="facebook" className="icon-facebook icon"></span>
                                </Link>{' '}
                              </li>
                              <li>
                                <Link href="https://twitter.com/DP_World" target="_blank">
                                  {' '}
                                  <span aria-label="twitter" className="icon-twitter icon"></span>
                                </Link>{' '}
                              </li>
                              <li>
                                <Link href="https://www.instagram.com/dpworld/" target="_blank">
                                  {' '}
                                  <span aria-label="insta" className="icon-insta icon"></span>
                                </Link>{' '}
                              </li>
                              <li>
                                <Link href="https://www.tiktok.com/@dpworld" target="_blank">
                                  {' '}
                                  <span aria-label="TikTok" className="icon-tiktok icon"></span>
                                </Link>{' '}
                              </li>
                              <li>
                                <Link
                                  href="https://www.youtube.com/user/DPWorldinfo"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {' '}
                                  <span aria-label="youtube" className="icon-youtube icon"></span>
                                </Link>{' '}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="footer-bottom-links">
                        <ul>
                          <li className="">
                            <Link href="/privacy-policy">Privacy Policy</Link>{' '}
                          </li>
                          <li className="">
                            <Link href="/sitemap">Sitemap</Link>{' '}
                          </li>
                          <li className="">
                            <Link href="/terms-and-conditions">Terms and Conditions</Link>{' '}
                          </li>
                          <li className="">
                            <Link href="/whistleblowing-hotline">Whistleblowing Hotline</Link>{' '}
                          </li>
                          <li className="">
                            <Link href="/modern-slavery">Modern Slavery Act</Link>{' '}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return <DPWorldFooterDefaultComponent {...props} />;
};
