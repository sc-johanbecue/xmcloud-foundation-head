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

type DPWorldHeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DPWorldHeaderDefaultComponent = (props: DPWorldHeaderProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: DPWorldHeaderProps): JSX.Element => {
  if (props.fields) {
    return (
      <header className="mainheader">
        <input type="hidden" name="hdnSitename" id="hdnSitename" value="Global_CD_Site" />
        <div className="header-container ">
          <div className="component-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 component">
                  <div className="js-header-sticky header--fixed hide-from-print headroom animated">
                    <div className="header" data-fsize="72">
                      <div className="logo">
                        <h2 className="h1">
                          <Link href="/">
                            <img
                              src="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/shared/images/logo-new.svg?rev=76aac004c6f3477084084de0727d6694&amp;h=35&amp;w=157&amp;la=en&amp;hash=A61332E9BE9138E6B37652E3E4A2E745"
                              alt="DP World"
                            />
                          </Link>
                        </h2>
                      </div>
                      <div className="utility">
                        <div className="utility-nav">
                          <ul>
                            <li>
                              <Link href="/about-us" data-nav="About Us">
                                {' '}
                                About Us
                              </Link>
                            </li>
                            <li>
                              <Link href="/partnerships" data-nav="Partnerships">
                                {' '}
                                Partnerships
                              </Link>
                            </li>
                            <li>
                              <Link href="/investors" data-nav="Investors">
                                {' '}
                                Investors
                              </Link>
                            </li>
                            <li>
                              <Link href="/careers" data-nav="Careers">
                                {' '}
                                Careers
                              </Link>
                            </li>
                            <li>
                              <Link href="/news" data-nav="News">
                                {' '}
                                News
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="utility-links">
                          <ul>
                            <li className="search-cta">
                              <Link href="/search">
                                {' '}
                                <span aria-label="search" className="icon-search icon"></span>
                              </Link>{' '}
                            </li>

                            <li className="globe">
                              <Link className="globe-cta" href="#">
                                <span aria-label="globe" className="icon-globe icon"></span>
                              </Link>
                              <div className="globe-list">
                                <ul>
                                  <li>
                                    <Link href="/">Global</Link>
                                  </li>
                                  <li>
                                    <Link href="/djazair">Algeria, Djazair</Link>
                                  </li>
                                  <li>
                                    <Link href="/luanda">Angola</Link>
                                  </li>
                                  <li>
                                    <Link href="/buenos-aires">Argentina</Link>
                                  </li>
                                  <li>
                                    <Link href="/australia">Australia</Link>
                                  </li>
                                  <li>
                                    <Link href="/antwerp">Belgium</Link>
                                  </li>
                                  <li>
                                    <Link href="/santos">Brazil</Link>
                                  </li>
                                  <li>
                                    <Link href="/chile">Chile</Link>
                                  </li>
                                  <li>
                                    <Link href="/china">China</Link>
                                  </li>
                                  <li>
                                    <Link href="/limassol">Cyprus</Link>
                                  </li>
                                  <li>
                                    <Link href="/dominicana">Dominicana</Link>
                                  </li>
                                  <li>
                                    <Link href="/ecuador">Ecuador</Link>
                                  </li>
                                  <li>
                                    <Link href="/egypt">Egypt</Link>
                                  </li>
                                  <li>
                                    <Link href="/eu-intermodal">EU Intermodal</Link>
                                  </li>
                                  <li>
                                    <Link href="/hongkong">Hong Kong</Link>
                                  </li>
                                  <li>
                                    <Link href="/india">India</Link>
                                  </li>
                                  <li>
                                    <Link href="/indonesia">Indonesia</Link>
                                  </li>
                                  <li>
                                    <Link href="/malaysia">Malaysia</Link>
                                  </li>
                                  <li>
                                    <Link href="/mozambique">Mozambique</Link>
                                  </li>
                                  <li>
                                    <Link href="/pakistan">Pakistan</Link>
                                  </li>
                                  <li>
                                    <Link href="/peru">Peru</Link>
                                  </li>
                                  <li>
                                    <Link href="/philippines">Philippines</Link>
                                  </li>
                                  <li>
                                    <Link href="/constanta">Romania</Link>
                                  </li>
                                  <li>
                                    <Link href="/rwanda">Rwanda</Link>
                                  </li>
                                  <li>
                                    <Link href="/saudi-arabia">Saudi Arabia</Link>
                                  </li>
                                  <li>
                                    <Link href="/senegal">Senegal</Link>
                                  </li>
                                  <li>
                                    <Link href="/novi-sad">Serbia</Link>
                                  </li>
                                  <li>
                                    <Link href="/somaliland">Somaliland</Link>
                                  </li>
                                  <li>
                                    <Link href="/south-korea">South Korea</Link>
                                  </li>
                                  <li>
                                    <Link href="/tarragona">Spain</Link>
                                  </li>
                                  <li>
                                    <Link href="/paramaribo">Suriname</Link>
                                  </li>
                                  <li>
                                    <Link href="/yarimca">Turkiye</Link>
                                  </li>
                                  <li>
                                    <Link href="/uae">United Arab Emirates</Link>
                                  </li>
                                  <li>
                                    <Link href="/en/ukraine">Ukraine</Link>
                                  </li>
                                  <li>
                                    <Link href="/united-kingdom">United Kingdom</Link>
                                  </li>
                                  <li>
                                    <Link href="/vietnam">Vietnam</Link>
                                  </li>
                                </ul>
                                <Link href="/about-us/our-locations" className="globe-link">
                                  View map
                                </Link>{' '}
                              </div>
                            </li>
                            <li className="contact-cta desktop">
                              <Link href="/contact-us">
                                <span aria-label="contact" className="icon-contact icon"></span>
                              </Link>
                            </li>
                            <li className="contact-cta mobile">
                              <Link href="/contact-us">
                                <span aria-label="contact" className="icon-contact icon"></span>
                              </Link>
                            </li>

                            <li className="mo-menu">
                              <div className="mobile-menu-wrapper">
                                <div
                                  className="hamburger hamburger--elastic"
                                  tabIndex={0}
                                  aria-label="Menu"
                                  role="button"
                                >
                                  <div className="hamburger-box">
                                    <div className="hamburger-inner">
                                      <span className="visuallyhidden">Menu</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="main-nav">
                        <ul className="main-nav-ul">
                          <li className="level2">
                            <Link href="/supply-chain-solutions" data-nav="SOLUTIONS">
                              {' '}
                              SOLUTIONS
                            </Link>
                            <div className="main-secondary">
                              <div className="secondary-nav">
                                <div className="row">
                                  <div className=" offset-sm-3 col-sm-3">
                                    <div className="secondary-left">
                                      <ul>
                                        <li>
                                          <Link href="/supply-chain-solutions/freight-forwarding-services">
                                            {' '}
                                            FREIGHT FORWARDING
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="/supply-chain-solutions/contract-logistics-services">
                                            {' '}
                                            CONTRACT LOGISTICS
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="/supply-chain-solutions/market-access">
                                            {' '}
                                            MARKET ACCESS
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="/supply-chain-solutions/economic-trade-zone">
                                            {' '}
                                            ECONOMIC ZONES
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="/supply-chain-solutions/ports-and-terminals">
                                            {' '}
                                            PORTS &amp; TERMINALS
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="/supply-chain-solutions/marine-services">
                                            {' '}
                                            MARINE SERVICES
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="secondary-right">
                                      <p>Related content</p>
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="secondary-item">
                                            <Link href="/insights/expert-opinions/data-fills-gaps-in-modern-supply-chains">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Woman-in-warehouse.jpg?rev=9ad2b6beb5a44cdb839246a2e7dfaa97&amp;cx=0.54&amp;cy=0.45&amp;cw=330&amp;ch=170&amp;hash=DA35266F30E46262B081157D34F30517"
                                              />
                                            </Link>{' '}
                                            <h2>
                                              <Link href="/insights/expert-opinions/data-fills-gaps-in-modern-supply-chains">
                                                {' '}
                                                Data Fills The Gaps In Modern Supply Chains
                                              </Link>{' '}
                                            </h2>
                                            <p>
                                              Global supply chains are no strangers to disruption,
                                              whether caused by trade disputes, geopolitics or the
                                              unpredictable forces of climate change. Amidst these
                                              challenges, an often-overlooked vulner…
                                            </p>
                                            <Link
                                              href="/insights/expert-opinions/data-fills-gaps-in-modern-supply-chains"
                                              className="primary-cta-white"
                                            >
                                              Read more
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="secondary-item">
                                            <Link href="/insights/expert-opinions/rail-networks-transform-supply-chains">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Port-of-Maputo.jpeg?rev=8d12394edb244e1999da325711d0d0ee&amp;cx=0.39&amp;cy=0.64&amp;cw=330&amp;ch=170&amp;hash=381D09F196EC979672216998391768DF"
                                              />
                                            </Link>{' '}
                                            <h2>
                                              <Link href="/insights/expert-opinions/rail-networks-transform-supply-chains">
                                                {' '}
                                                Rail Networks Transform Supply Chains
                                              </Link>{' '}
                                            </h2>
                                            <p>
                                              Rail freight has the potential to revolutionise supply
                                              chains in both developed and developing nations,
                                              providing a key role in promoting sustainability and
                                              economic growth.
                                            </p>
                                            <Link
                                              href="/insights/expert-opinions/rail-networks-transform-supply-chains"
                                              className="primary-cta-white"
                                            >
                                              Read more
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="level2">
                            <Link href="/industries" data-nav="INDUSTRIES">
                              {' '}
                              INDUSTRIES
                            </Link>
                            <div className="main-secondary">
                              <div className="secondary-nav">
                                <div className="row">
                                  <div className=" offset-sm-3 col-sm-3">
                                    <div className="secondary-left">
                                      <ul>
                                        <li>
                                          <Link href="/industries/automotive-logistics">
                                            AUTOMOTIVE
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="/industries/healthcare-pharma-logistics">
                                            HEALTHCARE
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="/industries/perishable-logistics">
                                            PERISHABLES
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="/industries/technology">TECHNOLOGY</Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="secondary-right">
                                      <p>Related content</p>
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="secondary-item">
                                            <Link href="/insights/expert-opinions/making-healthcare-equity-a-reality">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Healthcare.jpg?rev=388531302ea44fe5991479770e8f01a0&amp;cx=0.6&amp;cy=0.23&amp;cw=330&amp;ch=170&amp;hash=0E4420613F6BADC54D5268A303AA03F2"
                                              />
                                            </Link>{' '}
                                            <h2>
                                              <Link href="/insights/expert-opinions/making-healthcare-equity-a-reality">
                                                {' '}
                                                Making Healthcare Equity Reality
                                              </Link>{' '}
                                            </h2>
                                            <p>
                                              Healthy societies transform economies, yet the
                                              pandemics of the past few years have demonstrated that
                                              healthcare logistics is a complex beast and unique to
                                              that of any other sector.
                                            </p>
                                            <Link
                                              href="/insights/expert-opinions/making-healthcare-equity-a-reality"
                                              className="primary-cta-white"
                                            >
                                              Read more
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="secondary-item">
                                            <Link href="/insights/expert-opinions/the-future-of-electric-vehicles-is-in-our-supply-chains">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/White-electric-car-charging-164.jpg?rev=8705f31303144c2eba41820382a4a248&amp;cx=0.5&amp;cy=0.41&amp;cw=330&amp;ch=170&amp;hash=19C3812AD1004D850724EDF65B047515"
                                              />
                                            </Link>{' '}
                                            <h2>
                                              <Link href="/insights/expert-opinions/the-future-of-electric-vehicles-is-in-our-supply-chains">
                                                {' '}
                                                The Future Of EVs Is In Our Supply Chains
                                              </Link>{' '}
                                            </h2>
                                            <p>
                                              Electric vehicles (EVs) are proving to be the most
                                              popular replacement for fossil fuel cars. So much so
                                              that by 2030 electric vehicles will represent over 60%
                                              of vehicles sold globally.
                                            </p>
                                            <Link
                                              href="/insights/expert-opinions/the-future-of-electric-vehicles-is-in-our-supply-chains"
                                              className="primary-cta-white"
                                            >
                                              Read more
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="level2">
                            <Link href="/insights" data-nav="INSIGHTS">
                              {' '}
                              INSIGHTS
                            </Link>
                            <div className="main-secondary">
                              <div className="secondary-nav">
                                <div className="row">
                                  <div className=" offset-sm-3 col-sm-3">
                                    <div className="secondary-left">
                                      <ul>
                                        <li>
                                          <Link href="/insights/expert-opinions">
                                            EXPERT OPINIONS
                                          </Link>
                                        </li>
                                        <li>
                                          <Link href="/news/blogs">THOUGHT LEADERSHIP</Link>
                                        </li>
                                        <li>
                                          <Link href="/insights/whitepapers">WHITEPAPERS</Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="secondary-right">
                                      <p>Related content</p>
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="secondary-item">
                                            <Link href="/investors/annual-report-2022">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/Annual-Report-2022/Annual-report-sample-image.jpg?rev=f503b099b1f14d738cdd8c1278174ac4&amp;cx=0&amp;cy=0&amp;cw=330&amp;ch=170&amp;hash=F66772E63CBD328B4FE4D8617C32A9CE"
                                              />
                                            </Link>{' '}
                                            <h2>
                                              <Link href="/investors/annual-report-2022">
                                                {' '}
                                                The Smarter Trade Report
                                              </Link>{' '}
                                            </h2>
                                            <p>Read our latest annual report and accounts</p>
                                            <Link
                                              href="/investors/annual-report-2022"
                                              className="primary-cta-white"
                                            >
                                              Read More
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="secondary-item">
                                            <Link href="/insights/our-stories">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Woman-collecting-clothes.jpg?rev=d3ccc13036bb43f681868bfdacbbf9e8&amp;cx=0&amp;cy=0&amp;cw=330&amp;ch=170&amp;hash=A3021C4E683E1CE6A0F13303C952F884"
                                              />
                                            </Link>{' '}
                                            <h2>
                                              <Link href="/insights/our-stories"> Our Stories</Link>{' '}
                                            </h2>
                                            <p>
                                              We connect people, markets and nations to change
                                              what&rsquos possible for everyone.
                                            </p>
                                            <Link
                                              href="/insights/our-stories"
                                              className="primary-cta-white"
                                            >
                                              Read More
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <Link href="/sustainability" data-nav="SUSTAINABILITY">
                              {' '}
                              SUSTAINABILITY
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="search">
                        <form id="searchForm" action="/search" noValidate={true}>
                          <input
                            autoComplete="off"
                            type="text"
                            className="search-input"
                            name="q"
                            placeholder="Search..."
                            data-rule-required="true"
                            data-msg-required="Please enter valid text"
                            data-msg-pattern="Please enter valid text"
                            required={false}
                            pattern="^([a-zA-Z0-9 ,-]+)$"
                          />
                          <button className="search-btn" type="submit">
                            <span aria-label="search" className="icon-search icon"></span>
                          </button>
                        </form>
                      </div>

                      <div className="mobi-navigation">
                        <div className="mobi-nav-top">
                          <div className="logo">
                            <Link href="/">
                              <img
                                src="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/shared/images/logo-new.svg?rev=76aac004c6f3477084084de0727d6694&amp;h=35&amp;w=157&amp;la=en&amp;hash=A61332E9BE9138E6B37652E3E4A2E745"
                                alt="DP World"
                              />
                              <span className="l-title"></span>
                            </Link>
                          </div>
                          <div className="close-menu">
                            <div
                              className="hamburger hamburger--elastic is-active"
                              tabIndex={0}
                              aria-label="Menu"
                              role="button"
                            >
                              <div className="hamburger-box">
                                <div className="hamburger-inner">
                                  <span className="visuallyhidden">Close</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mo-search">
                          <form id="mo-searchForm" action="/search" noValidate={false}>
                            <input
                              autoComplete="off"
                              type="text"
                              className="search-input"
                              name="q"
                              placeholder="Search..."
                              data-rule-required="true"
                              data-msg-required="Please enter valid text"
                              data-msg-pattern="Please enter valid text"
                              required={false}
                              pattern="^([a-zA-Z0-9 ,-]+)$"
                            />
                            <button className="search-btn" type="submit">
                              <span aria-label="search" className="icon-search icon"></span>
                            </button>
                          </form>
                        </div>
                        <div className="mobi-main-nav">
                          <ul>
                            <li className="level2">
                              <Link href="/supply-chain-solutions" data-nav="SOLUTIONS">
                                <i>SOLUTIONS</i>
                              </Link>
                              <span style={{ width: '0px' }}>nav</span>

                              <ul>
                                <li>
                                  <Link href="/supply-chain-solutions/freight-forwarding-services">
                                    {' '}
                                    FREIGHT FORWARDING
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/contract-logistics-services">
                                    {' '}
                                    CONTRACT LOGISTICS
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/market-access">
                                    {' '}
                                    MARKET ACCESS
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/economic-trade-zone">
                                    {' '}
                                    ECONOMIC ZONES
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/ports-and-terminals">
                                    {' '}
                                    PORTS &amp; TERMINALS
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/supply-chain-solutions/marine-services">
                                    {' '}
                                    MARINE SERVICES
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            <li className="level2">
                              <Link href="/industries" data-nav="INDUSTRIES">
                                <i>INDUSTRIES</i>
                              </Link>
                              <span style={{ width: '0px' }}>nav</span>

                              <ul>
                                <li>
                                  <Link href="/industries/automotive-logistics"> AUTOMOTIVE</Link>
                                </li>
                                <li>
                                  <Link href="/industries/healthcare-pharma-logistics">
                                    {' '}
                                    HEALTHCARE
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/industries/perishable-logistics"> PERISHABLES</Link>
                                </li>
                                <li>
                                  <Link href="/industries/technology"> TECHNOLOGY</Link>
                                </li>
                              </ul>
                            </li>
                            <li className="level2">
                              <Link href="/insights" data-nav="INSIGHTS">
                                <i>INSIGHTS</i>
                              </Link>
                              <span style={{ width: '0px' }}>nav</span>

                              <ul>
                                <li>
                                  <Link href="/insights/expert-opinions"> EXPERT OPINIONS</Link>
                                </li>
                                <li>
                                  <Link href="/news/blogs"> THOUGHT LEADERSHIP</Link>
                                </li>
                                <li>
                                  <Link href="/insights/whitepapers"> WHITEPAPERS</Link>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <Link href="/sustainability"> SUSTAINABILITY</Link>
                            </li>
                          </ul>
                        </div>
                        <div className="mobi-utility-nav">
                          <ul>
                            <li>
                              <Link href="/about-us"> About Us</Link>
                            </li>
                            <li>
                              <Link href="/partnerships"> Partnerships</Link>
                            </li>
                            <li>
                              <Link href="/investors"> Investors</Link>
                            </li>
                            <li>
                              <Link href="/careers"> Careers</Link>
                            </li>
                            <li>
                              <Link href="/news"> News</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return <DPWorldHeaderDefaultComponent {...props} />;
};
