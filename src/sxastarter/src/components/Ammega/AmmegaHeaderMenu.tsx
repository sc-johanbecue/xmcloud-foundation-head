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

type AmmegaHeaderMenuProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const AmmegaHeaderMenuDefaultComponent = (props: AmmegaHeaderMenuProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: AmmegaHeaderMenuProps): JSX.Element => {
  if (props.fields) {
    return (
      <div id="div_block-4-11" className="ct-div-block">
        <div id="div_block-38-11" className="ct-div-block">
          <div id="new_columns-10-11" className="ct-new-columns">
            <div id="div_block-15-11" className="ct-div-block">
              <a
                id="div_block-11-11"
                className="ct-link"
                href="https://www.ammega.com"
                target="_self"
              >
                <div id="code_block-14-11" className="ct-code-block">
                  <svg
                    className="positionAbsolute width0 height0 overflowHidden"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <defs>
                      <symbol id="icon-ammega-lgo" viewBox="0 0 1662.49 553.81">
                        <g id="Layer_1-2">
                          <path
                            className="cls-2"
                            d="m1244.27,262.46l-11.54,54.31h72.52c-7.59,37.21-34.38,56.68-75.97,56.68s-68.17-32.29-68.17-67.17c0-61.21,51.68-104.8,107.11-104.8,31.93,0,59.11,6.46,78.05,18.68l41.75-51.19c-35.21-23.41-69.05-33.17-120.7-33.17-85.51,0-182.12,68.46-182.12,172.65,0,87.69,69.94,131.77,140.44,131.77,99.71,0,148.19-66.14,164.4-177.76h-145.77Zm231.32,66.24l63.14-93.74,23.56,93.74h-86.7Zm99.7,61.32l10.31,41.93h76.89l-72.26-287.98h-62.5l-193.37,287.98h76.9l28.34-41.93h135.69ZM141.22,184.71l63.14-93.74,23.55,93.74h-86.69Zm99.69,61.32l10.31,41.94h76.89L255.86,0h-62.51L0,287.97h76.9l28.34-41.94h135.67Zm836.22,9.03l-13.11,61.71h-144l-10.48,49.37h148.09l-13.99,65.81h-226.27l61.21-287.98h222.15l-14,65.83h-143.97l-9.61,45.25h143.98Zm-234.86-111.08l-61.21,287.97h-78.17l36.3-170.73-101.65,100.8-58.79-100.79-36.3,170.73h-78.15l45.46-213.92-58.79-100.79-36.29,170.73h-78.17L397.72,0h64.99l64.41,113.13L639.61,0h74.88l-46.17,217.22-56.92-99.98-23.09,22.9,66.58,116.97,112.5-113.13h74.88Z"
                          ></path>
                          <polygon
                            className="cls-1"
                            points="698.26 453.1 676.59 553.81 755.67 553.81 776.65 452.86 698.26 453.1"
                          ></polygon>
                          <path
                            className="cls-2"
                            d="m815.39,509.66c-.21-9.97,3.25-18.51,10.4-25.62,7.14-7.11,15.63-10.59,25.46-10.45,5.73,0,11.03,1.22,15.92,3.66,4.88,2.44,8.91,5.85,12.09,10.24l-4.14,3.29c-5.8-8.06-13.72-12.1-23.77-12.1-8.56,0-15.72,2.97-21.49,8.91s-8.65,13.26-8.65,21.96,2.88,16.14,8.65,22.12c5.76,5.98,13,8.97,21.7,8.97,5.37,0,10.31-1.22,14.8-3.66s8.04-5.82,10.66-10.13v-11.56h-25.78v-5.09h31.3v17.82c-3.04,5.52-7.36,9.85-12.94,13-5.59,3.15-11.71,4.72-18.35,4.72-9.83.21-18.3-3.27-25.41-10.45-7.11-7.18-10.59-15.72-10.45-25.63Z"
                          ></path>
                          <path
                            className="cls-2"
                            d="m1074.8,544.68h-6.47l-23.55-31.41h-17.08v31.41h-5.52v-70.02h23.77c6.44,0,11.58,1.8,15.44,5.41,3.85,3.61,5.78,8.21,5.78,13.79,0,4.95-1.42,9.12-4.24,12.52-2.83,3.39-6.75,5.55-11.78,6.47l23.65,31.83Zm-47.11-65.04v28.65h18.04c4.95,0,8.81-1.31,11.56-3.93,2.76-2.62,4.14-6.08,4.14-10.4s-1.38-7.78-4.14-10.4-6.61-3.93-11.56-3.93h-18.04Z"
                          ></path>
                          <path
                            className="cls-2"
                            d="m1204.02,509.66c-.21-9.97,3.25-18.51,10.4-25.62,7.14-7.11,15.63-10.59,25.46-10.45,9.76-.14,18.25,3.36,25.46,10.5,7.21,7.15,10.72,15.67,10.5,25.57.21,9.9-3.29,18.44-10.5,25.62s-15.7,10.66-25.46,10.45c-9.83.21-18.32-3.27-25.46-10.45-7.14-7.17-10.61-15.71-10.4-25.62Zm66-.1c.14-8.56-2.74-15.88-8.65-21.96s-13.03-9.05-21.38-8.91c-8.42-.14-15.58,2.83-21.49,8.91-5.91,6.08-8.79,13.4-8.65,21.96-.14,8.63,2.74,15.99,8.65,22.07s13.07,9.05,21.49,8.91c8.34.14,15.47-2.85,21.38-8.97,5.91-6.12,8.79-13.45,8.65-22.01Z"
                          ></path>
                          <path
                            className="cls-2"
                            d="m1413.89,517.51v-42.86h5.52v43.08c0,7.15,1.95,12.73,5.84,16.76s9.09,6.05,15.6,6.05,11.6-2.02,15.49-6.05c3.89-4.03,5.84-9.62,5.84-16.76v-43.08h5.52v42.86c0,8.77-2.44,15.67-7.32,20.69s-11.39,7.53-19.52,7.53-14.75-2.51-19.63-7.53c-4.9-5.02-7.34-11.91-7.34-20.69Z"
                          ></path>
                          <path
                            className="cls-2"
                            d="m1610.48,544.68v-70.02h23.77c6.44,0,11.58,1.8,15.44,5.41,3.85,3.61,5.78,8.21,5.78,13.79s-1.91,10.4-5.73,14c-3.82,3.61-8.98,5.41-15.49,5.41h-18.25v31.41h-5.52Zm5.52-36.4h18.04c4.95,0,8.81-1.31,11.56-3.93,2.76-2.62,4.14-6.08,4.14-10.4s-1.38-7.78-4.14-10.4-6.61-3.93-11.56-3.93h-18.04v28.66Z"
                          ></path>
                        </g>
                      </symbol>
                    </defs>
                  </svg>

                  <svg className="icon icon-ammega-lgo">
                    <use xlinkHref="#icon-ammega-lgo"></use>
                  </svg>
                </div>
              </a>
            </div>
            <div id="div_block-12-11" className="ct-div-block">
              <div id="div_block-20-11" className="ct-div-block">
                <nav
                  id="nav_bar"
                  className="oxy-nav-menu  oxy-nav-menu-dropdowns oxy-nav-menu-responsive-dropdowns"
                >
                  <div className="oxy-menu-toggle">
                    <div className="oxy-nav-menu-hamburger-wrap">
                      <div className="oxy-nav-menu-hamburger">
                        <div className="oxy-nav-menu-hamburger-line"></div>
                        <div className="oxy-nav-menu-hamburger-line"></div>
                        <div className="oxy-nav-menu-hamburger-line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="menu-main-menu-container">
                    <ul id="menu-main-menu" className="oxy-nav-menu-list">
                      <li
                        id="menu-item-468"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-468"
                      >
                        <a href="#">
                          <span className="hide">About us</span>
                        </a>
                        <ul className="sub-menu">
                          <li
                            id="menu-item-132"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-132"
                          >
                            <a href="https://www.ammega.com/management-team/">Management Team</a>
                          </li>
                          <li
                            id="menu-item-131"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-131"
                          >
                            <a href="https://www.ammega.com/vision-mission/">
                              Vision &amp; Mission
                            </a>
                          </li>
                          <li
                            id="menu-item-130"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-130"
                          >
                            <a href="https://www.ammega.com/values/">Values</a>
                          </li>
                          <li
                            id="menu-item-1753"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1753"
                          >
                            <a href="https://www.ammega.com/speakup/">SpeakUp Corner</a>
                          </li>
                        </ul>
                      </li>
                      <li
                        id="menu-item-25"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-25"
                      >
                        <a href="https://www.ammega.com/brands/">Brands</a>
                      </li>
                      <li
                        id="menu-item-1772"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1772"
                      >
                        <a href="#">
                          <span className="hide">Sustainability</span>
                        </a>
                        <ul className="sub-menu">
                          <li
                            id="menu-item-1773"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1773"
                          >
                            <a href="https://www.ammega.com/esg-strategy/">ESG STRATEGY</a>
                          </li>
                          <li
                            id="menu-item-1774"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1774"
                          >
                            <a href="https://www.ammega.com/pillars/">ESG PILLARS</a>
                          </li>
                          <li
                            id="menu-item-1775"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1775"
                          >
                            <a href="https://www.ammega.com/policies/">Policies</a>
                          </li>
                          <li
                            id="menu-item-1776"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1776"
                          >
                            <a href="https://www.ammega.com/partnerships-ratings/">
                              PARTNERSHIPS &amp; RATINGS
                            </a>
                          </li>
                          <li
                            id="menu-item-1805"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1805"
                          >
                            <a href="https://www.ammega.com/publications-3/">PUBLICATIONS</a>
                          </li>
                        </ul>
                      </li>
                      <li
                        id="menu-item-23"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-23"
                      >
                        <a href="https://www.ammega.com/news/">News</a>
                      </li>
                      <li
                        id="menu-item-1360"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1360"
                      >
                        <a href="https://www.ammega.com/careers/">Careers</a>
                      </li>
                      <li
                        id="menu-item-1808"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1808"
                      >
                        <a href="https://www.ammega.com/speakup/">SpeakUp</a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div id="div_block-19-11" className="ct-div-block">
                <nav id="nav_bar_contact" className="oxy-nav-menu ">
                  <div className="oxy-menu-toggle">
                    <div className="oxy-nav-menu-hamburger-wrap">
                      <div className="oxy-nav-menu-hamburger">
                        <div className="oxy-nav-menu-hamburger-line"></div>
                        <div className="oxy-nav-menu-hamburger-line"></div>
                        <div className="oxy-nav-menu-hamburger-line"></div>
                      </div>
                    </div>
                  </div>
                  <div className="menu-contact-menu-container">
                    <ul id="menu-contact-menu" className="oxy-nav-menu-list">
                      <li
                        id="menu-item-1798"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1798"
                      >
                        <a href="https://www.ammega.com/contact/">Contact us</a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <AmmegaHeaderMenuDefaultComponent {...props} />;
};
