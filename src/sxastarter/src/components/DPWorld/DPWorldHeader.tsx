import React from 'react';
import { ImageField, TextField, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';

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
                          <a href="/">
                            <img
                              src="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/shared/images/logo-new.svg?rev=76aac004c6f3477084084de0727d6694&amp;h=35&amp;w=157&amp;la=en&amp;hash=A61332E9BE9138E6B37652E3E4A2E745"
                              alt="DP World"
                            />
                          </a>
                        </h2>
                      </div>
                      <div className="utility">
                        <div className="utility-nav">
                          <ul>
                            <li>
                              <a href="/about-us" data-nav="About Us">
                                {' '}
                                About Us
                              </a>
                            </li>
                            <li>
                              <a href="/partnerships" data-nav="Partnerships">
                                {' '}
                                Partnerships
                              </a>
                            </li>
                            <li>
                              <a href="/investors" data-nav="Investors">
                                {' '}
                                Investors
                              </a>
                            </li>
                            <li>
                              <a href="/careers" data-nav="Careers">
                                {' '}
                                Careers
                              </a>
                            </li>
                            <li>
                              <a href="/news" data-nav="News">
                                {' '}
                                News
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="utility-links">
                          <ul>
                            <li className="search-cta">
                              <a href="/search">
                                {' '}
                                <span aria-label="search" className="icon-search icon"></span>
                              </a>{' '}
                            </li>

                            <li className="globe">
                              <a className="globe-cta" href="#">
                                <span aria-label="globe" className="icon-globe icon"></span>
                              </a>
                              <div className="globe-list">
                                <ul>
                                  <li>
                                    <a href="/">Global</a>
                                  </li>
                                  <li>
                                    <a href="/djazair">Algeria, Djazair</a>
                                  </li>
                                  <li>
                                    <a href="/luanda">Angola</a>
                                  </li>
                                  <li>
                                    <a href="/buenos-aires">Argentina</a>
                                  </li>
                                  <li>
                                    <a href="/australia">Australia</a>
                                  </li>
                                  <li>
                                    <a href="/antwerp">Belgium</a>
                                  </li>
                                  <li>
                                    <a href="/santos">Brazil</a>
                                  </li>
                                  <li>
                                    <a href="/chile">Chile</a>
                                  </li>
                                  <li>
                                    <a href="/china">China</a>
                                  </li>
                                  <li>
                                    <a href="/limassol">Cyprus</a>
                                  </li>
                                  <li>
                                    <a href="/dominicana">Dominicana</a>
                                  </li>
                                  <li>
                                    <a href="/ecuador">Ecuador</a>
                                  </li>
                                  <li>
                                    <a href="/egypt">Egypt</a>
                                  </li>
                                  <li>
                                    <a href="/eu-intermodal">EU Intermodal</a>
                                  </li>
                                  <li>
                                    <a href="/hongkong">Hong Kong</a>
                                  </li>
                                  <li>
                                    <a href="/india">India</a>
                                  </li>
                                  <li>
                                    <a href="/indonesia">Indonesia</a>
                                  </li>
                                  <li>
                                    <a href="/malaysia">Malaysia</a>
                                  </li>
                                  <li>
                                    <a href="/mozambique">Mozambique</a>
                                  </li>
                                  <li>
                                    <a href="/pakistan">Pakistan</a>
                                  </li>
                                  <li>
                                    <a href="/peru">Peru</a>
                                  </li>
                                  <li>
                                    <a href="/philippines">Philippines</a>
                                  </li>
                                  <li>
                                    <a href="/constanta">Romania</a>
                                  </li>
                                  <li>
                                    <a href="/rwanda">Rwanda</a>
                                  </li>
                                  <li>
                                    <a href="/saudi-arabia">Saudi Arabia</a>
                                  </li>
                                  <li>
                                    <a href="/senegal">Senegal</a>
                                  </li>
                                  <li>
                                    <a href="/novi-sad">Serbia</a>
                                  </li>
                                  <li>
                                    <a href="/somaliland">Somaliland</a>
                                  </li>
                                  <li>
                                    <a href="/south-korea">South Korea</a>
                                  </li>
                                  <li>
                                    <a href="/tarragona">Spain</a>
                                  </li>
                                  <li>
                                    <a href="/paramaribo">Suriname</a>
                                  </li>
                                  <li>
                                    <a href="/yarimca">Turkiye</a>
                                  </li>
                                  <li>
                                    <a href="/uae">United Arab Emirates</a>
                                  </li>
                                  <li>
                                    <a href="/en/ukraine">Ukraine</a>
                                  </li>
                                  <li>
                                    <a href="/united-kingdom">United Kingdom</a>
                                  </li>
                                  <li>
                                    <a href="/vietnam">Vietnam</a>
                                  </li>
                                </ul>
                                <a href="/about-us/our-locations" className="globe-link">
                                  View map
                                </a>{' '}
                              </div>
                            </li>
                            <li className="contact-cta desktop">
                              <a href="/contact-us">
                                <span aria-label="contact" className="icon-contact icon"></span>
                              </a>
                            </li>
                            <li className="contact-cta mobile">
                              <a href="/contact-us">
                                <span aria-label="contact" className="icon-contact icon"></span>
                              </a>
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
                            <a href="/supply-chain-solutions" data-nav="SOLUTIONS">
                              {' '}
                              SOLUTIONS
                            </a>
                            <div className="main-secondary">
                              <div className="secondary-nav">
                                <div className="row">
                                  <div className=" offset-sm-3 col-sm-3">
                                    <div className="secondary-left">
                                      <ul>
                                        <li>
                                          <a href="/supply-chain-solutions/freight-forwarding-services">
                                            {' '}
                                            FREIGHT FORWARDING
                                          </a>
                                        </li>
                                        <li>
                                          <a href="/supply-chain-solutions/contract-logistics-services">
                                            {' '}
                                            CONTRACT LOGISTICS
                                          </a>
                                        </li>
                                        <li>
                                          <a href="/supply-chain-solutions/market-access">
                                            {' '}
                                            MARKET ACCESS
                                          </a>
                                        </li>
                                        <li>
                                          <a href="/supply-chain-solutions/economic-trade-zone">
                                            {' '}
                                            ECONOMIC ZONES
                                          </a>
                                        </li>
                                        <li>
                                          <a href="/supply-chain-solutions/ports-and-terminals">
                                            {' '}
                                            PORTS &amp; TERMINALS
                                          </a>
                                        </li>
                                        <li>
                                          <a href="/supply-chain-solutions/marine-services">
                                            {' '}
                                            MARINE SERVICES
                                          </a>
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
                                            <a href="/insights/expert-opinions/data-fills-gaps-in-modern-supply-chains">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Woman-in-warehouse.jpg?rev=9ad2b6beb5a44cdb839246a2e7dfaa97&amp;cx=0.54&amp;cy=0.45&amp;cw=330&amp;ch=170&amp;hash=DA35266F30E46262B081157D34F30517"
                                              />
                                            </a>{' '}
                                            <h2>
                                              <a href="/insights/expert-opinions/data-fills-gaps-in-modern-supply-chains">
                                                {' '}
                                                Data Fills The Gaps In Modern Supply Chains
                                              </a>{' '}
                                            </h2>
                                            <p>
                                              Global supply chains are no strangers to disruption,
                                              whether caused by trade disputes, geopolitics or the
                                              unpredictable forces of climate change. Amidst these
                                              challenges, an often-overlooked vulner…
                                            </p>
                                            <a
                                              href="/insights/expert-opinions/data-fills-gaps-in-modern-supply-chains"
                                              className="primary-cta-white"
                                            >
                                              Read more
                                            </a>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="secondary-item">
                                            <a href="/insights/expert-opinions/rail-networks-transform-supply-chains">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Port-of-Maputo.jpeg?rev=8d12394edb244e1999da325711d0d0ee&amp;cx=0.39&amp;cy=0.64&amp;cw=330&amp;ch=170&amp;hash=381D09F196EC979672216998391768DF"
                                              />
                                            </a>{' '}
                                            <h2>
                                              <a href="/insights/expert-opinions/rail-networks-transform-supply-chains">
                                                {' '}
                                                Rail Networks Transform Supply Chains
                                              </a>{' '}
                                            </h2>
                                            <p>
                                              Rail freight has the potential to revolutionise supply
                                              chains in both developed and developing nations,
                                              providing a key role in promoting sustainability and
                                              economic growth.
                                            </p>
                                            <a
                                              href="/insights/expert-opinions/rail-networks-transform-supply-chains"
                                              className="primary-cta-white"
                                            >
                                              Read more
                                            </a>
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
                            <a href="/industries" data-nav="INDUSTRIES">
                              {' '}
                              INDUSTRIES
                            </a>
                            <div className="main-secondary">
                              <div className="secondary-nav">
                                <div className="row">
                                  <div className=" offset-sm-3 col-sm-3">
                                    <div className="secondary-left">
                                      <ul>
                                        <li>
                                          <a href="/industries/automotive-logistics"> AUTOMOTIVE</a>
                                        </li>
                                        <li>
                                          <a href="/industries/healthcare-pharma-logistics">
                                            {' '}
                                            HEALTHCARE
                                          </a>
                                        </li>
                                        <li>
                                          <a href="/industries/perishable-logistics">
                                            {' '}
                                            PERISHABLES
                                          </a>
                                        </li>
                                        <li>
                                          <a href="/industries/technology"> TECHNOLOGY</a>
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
                                            <a href="/insights/expert-opinions/making-healthcare-equity-a-reality">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Healthcare.jpg?rev=388531302ea44fe5991479770e8f01a0&amp;cx=0.6&amp;cy=0.23&amp;cw=330&amp;ch=170&amp;hash=0E4420613F6BADC54D5268A303AA03F2"
                                              />
                                            </a>{' '}
                                            <h2>
                                              <a href="/insights/expert-opinions/making-healthcare-equity-a-reality">
                                                {' '}
                                                Making Healthcare Equity Reality
                                              </a>{' '}
                                            </h2>
                                            <p>
                                              Healthy societies transform economies, yet the
                                              pandemics of the past few years have demonstrated that
                                              healthcare logistics is a complex beast and unique to
                                              that of any other sector.
                                            </p>
                                            <a
                                              href="/insights/expert-opinions/making-healthcare-equity-a-reality"
                                              className="primary-cta-white"
                                            >
                                              Read more
                                            </a>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="secondary-item">
                                            <a href="/insights/expert-opinions/the-future-of-electric-vehicles-is-in-our-supply-chains">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/White-electric-car-charging-164.jpg?rev=8705f31303144c2eba41820382a4a248&amp;cx=0.5&amp;cy=0.41&amp;cw=330&amp;ch=170&amp;hash=19C3812AD1004D850724EDF65B047515"
                                              />
                                            </a>{' '}
                                            <h2>
                                              <a href="/insights/expert-opinions/the-future-of-electric-vehicles-is-in-our-supply-chains">
                                                {' '}
                                                The Future Of EVs Is In Our Supply Chains
                                              </a>{' '}
                                            </h2>
                                            <p>
                                              Electric vehicles (EVs) are proving to be the most
                                              popular replacement for fossil fuel cars. So much so
                                              that by 2030 electric vehicles will represent over 60%
                                              of vehicles sold globally.
                                            </p>
                                            <a
                                              href="/insights/expert-opinions/the-future-of-electric-vehicles-is-in-our-supply-chains"
                                              className="primary-cta-white"
                                            >
                                              Read more
                                            </a>
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
                            <a href="/insights" data-nav="INSIGHTS">
                              {' '}
                              INSIGHTS
                            </a>
                            <div className="main-secondary">
                              <div className="secondary-nav">
                                <div className="row">
                                  <div className=" offset-sm-3 col-sm-3">
                                    <div className="secondary-left">
                                      <ul>
                                        <li>
                                          <a href="/insights/expert-opinions"> EXPERT OPINIONS</a>
                                        </li>
                                        <li>
                                          <a href="/news/blogs"> THOUGHT LEADERSHIP</a>
                                        </li>
                                        <li>
                                          <a href="/insights/whitepapers"> WHITEPAPERS</a>
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
                                            <a href="/investors/annual-report-2022">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/Annual-Report-2022/Annual-report-sample-image.jpg?rev=f503b099b1f14d738cdd8c1278174ac4&amp;cx=0&amp;cy=0&amp;cw=330&amp;ch=170&amp;hash=F66772E63CBD328B4FE4D8617C32A9CE"
                                              />
                                            </a>{' '}
                                            <h2>
                                              <a href="/investors/annual-report-2022">
                                                {' '}
                                                The Smarter Trade Report
                                              </a>{' '}
                                            </h2>
                                            <p>Read our latest annual report and accounts</p>
                                            <a
                                              href="/investors/annual-report-2022"
                                              className="primary-cta-white"
                                            >
                                              Read More
                                            </a>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="secondary-item">
                                            <a href="/insights/our-stories">
                                              {' '}
                                              <img
                                                className="lozad img-fluid"
                                                alt="relatedcontent"
                                                data-src="https://www.dpworld.com/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Woman-collecting-clothes.jpg?rev=d3ccc13036bb43f681868bfdacbbf9e8&amp;cx=0&amp;cy=0&amp;cw=330&amp;ch=170&amp;hash=A3021C4E683E1CE6A0F13303C952F884"
                                              />
                                            </a>{' '}
                                            <h2>
                                              <a href="/insights/our-stories"> Our Stories</a>{' '}
                                            </h2>
                                            <p>
                                              We connect people, markets and nations to change
                                              what&rsquos possible for everyone.
                                            </p>
                                            <a
                                              href="/insights/our-stories"
                                              className="primary-cta-white"
                                            >
                                              Read More
                                            </a>
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
                            <a href="/sustainability" data-nav="SUSTAINABILITY">
                              {' '}
                              SUSTAINABILITY
                            </a>
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
                            <a href="/">
                              <img
                                src="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/shared/images/logo-new.svg?rev=76aac004c6f3477084084de0727d6694&amp;h=35&amp;w=157&amp;la=en&amp;hash=A61332E9BE9138E6B37652E3E4A2E745"
                                alt="DP World"
                              />
                              <span className="l-title"></span>
                            </a>
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
                              <a href="/supply-chain-solutions" data-nav="SOLUTIONS">
                                <i>SOLUTIONS</i>
                              </a>
                              <span style={{ width: '0px' }}>nav</span>

                              <ul>
                                <li>
                                  <a href="/supply-chain-solutions/freight-forwarding-services">
                                    {' '}
                                    FREIGHT FORWARDING
                                  </a>
                                </li>
                                <li>
                                  <a href="/supply-chain-solutions/contract-logistics-services">
                                    {' '}
                                    CONTRACT LOGISTICS
                                  </a>
                                </li>
                                <li>
                                  <a href="/supply-chain-solutions/market-access"> MARKET ACCESS</a>
                                </li>
                                <li>
                                  <a href="/supply-chain-solutions/economic-trade-zone">
                                    {' '}
                                    ECONOMIC ZONES
                                  </a>
                                </li>
                                <li>
                                  <a href="/supply-chain-solutions/ports-and-terminals">
                                    {' '}
                                    PORTS &amp; TERMINALS
                                  </a>
                                </li>
                                <li>
                                  <a href="/supply-chain-solutions/marine-services">
                                    {' '}
                                    MARINE SERVICES
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="level2">
                              <a href="/industries" data-nav="INDUSTRIES">
                                <i>INDUSTRIES</i>
                              </a>
                              <span style={{ width: '0px' }}>nav</span>

                              <ul>
                                <li>
                                  <a href="/industries/automotive-logistics"> AUTOMOTIVE</a>
                                </li>
                                <li>
                                  <a href="/industries/healthcare-pharma-logistics"> HEALTHCARE</a>
                                </li>
                                <li>
                                  <a href="/industries/perishable-logistics"> PERISHABLES</a>
                                </li>
                                <li>
                                  <a href="/industries/technology"> TECHNOLOGY</a>
                                </li>
                              </ul>
                            </li>
                            <li className="level2">
                              <a href="/insights" data-nav="INSIGHTS">
                                <i>INSIGHTS</i>
                              </a>
                              <span style={{ width: '0px' }}>nav</span>

                              <ul>
                                <li>
                                  <a href="/insights/expert-opinions"> EXPERT OPINIONS</a>
                                </li>
                                <li>
                                  <a href="/news/blogs"> THOUGHT LEADERSHIP</a>
                                </li>
                                <li>
                                  <a href="/insights/whitepapers"> WHITEPAPERS</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="/sustainability"> SUSTAINABILITY</a>
                            </li>
                          </ul>
                        </div>
                        <div className="mobi-utility-nav">
                          <ul>
                            <li>
                              <a href="/about-us"> About Us</a>
                            </li>
                            <li>
                              <a href="/partnerships"> Partnerships</a>
                            </li>
                            <li>
                              <a href="/investors"> Investors</a>
                            </li>
                            <li>
                              <a href="/careers"> Careers</a>
                            </li>
                            <li>
                              <a href="/news"> News</a>
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
