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

type AmmegaFooterLinksProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const AmmegaFooterLinksDefaultComponent = (props: AmmegaFooterLinksProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: AmmegaFooterLinksProps): JSX.Element => {
  if (props.fields) {
    return (
      <section id="section-52-11" className=" ct-section">
        <div className="ct-section-inner-wrap">
          <div id="new_columns-54-11" className="ct-new-columns">
            <div id="div_block-55-11" className="ct-div-block">
              <h6 id="headline-65-11" className="ct-headline h-60">
                GROUP
              </h6>
              <div id="div_block-89-11" className="ct-div-block underline"></div>
              <nav
                id="_nav_menu-98-11"
                className="oxy-nav-menu oxy-nav-menu-dropdowns oxy-nav-menu-dropdown-arrow oxy-nav-menu-vertical"
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
                <div className="menu-main-menu-footer-container">
                  <ul id="menu-main-menu-footer" className="oxy-nav-menu-list">
                    <li
                      id="menu-item-389"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-389"
                    >
                      <Link href="https://www.ammega.com/management-team/">Management Team</Link>
                    </li>
                    <li
                      id="menu-item-390"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-390"
                    >
                      <Link href="https://www.ammega.com/vision-mission/">
                        Vision &amp; Mission
                      </Link>
                    </li>
                    <li
                      id="menu-item-1837"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1837"
                    >
                      <Link href="https://www.ammega.com/esg-strategy/">Sustainability</Link>
                    </li>
                    <li
                      id="menu-item-901"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-901"
                    >
                      <Link href="https://www.ammega.com/policies/">Policies</Link>
                    </li>
                    <li
                      id="menu-item-391"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-391"
                    >
                      <Link href="https://www.ammega.com/values/">Values</Link>
                    </li>
                    <li
                      id="menu-item-1369"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1369"
                    >
                      <Link href="https://www.ammega.com/careers/">Careers</Link>
                    </li>
                    <li
                      id="menu-item-1781"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1781"
                    >
                      <Link href="https://www.ammega.com/speakup/">SpeakUp Corner</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div id="div_block-57-11" className="ct-div-block">
              <h6 id="headline-126-11" className="ct-headline h-60">
                CONVEYING
                <br />
                SOLUTIONS
              </h6>
              <div id="div_block-92-11" className="ct-div-block underline"></div>
              <nav
                id="_nav_menu-103-11"
                className="oxy-nav-menu oxy-nav-menu-dropdowns oxy-nav-menu-dropdown-arrow oxy-nav-menu-vertical"
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
                <div className="menu-conveying-solutions-container">
                  <ul id="menu-conveying-solutions" className="oxy-nav-menu-list">
                    <li
                      id="menu-item-181"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-181"
                    >
                      <Link target="_blank" rel="noopener" href="http://www.ammeraalbeltech.com/">
                        Ammeraal Beltech
                      </Link>
                    </li>
                    <li
                      id="menu-item-182"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-182"
                    >
                      <Link target="_blank" rel="noopener" href="http://www.avetm.com">
                        AVE
                      </Link>
                    </li>
                    <li
                      id="menu-item-183"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-183"
                    >
                      <Link target="_blank" rel="noopener" href="https://www.chemprene.com">
                        Chemprene
                      </Link>
                    </li>
                    <li
                      id="menu-item-184"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-184"
                    >
                      <Link target="_blank" rel="noopener" href="https://www.greenbelting.com">
                        Green belting
                      </Link>
                    </li>
                    <li
                      id="menu-item-979"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-979"
                    >
                      <Link
                        target="_blank"
                        rel="noopener"
                        href="https://www.ammeraalbeltech.com/en/products/rapplon-high-performance-flat-belts/"
                      >
                        RAPPLON
                      </Link>
                    </li>
                    <li
                      id="menu-item-185"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-185"
                    >
                      <Link target="_blank" rel="noopener" href="https://www.sampla.com">
                        Sampla
                      </Link>
                    </li>
                    <li
                      id="menu-item-494"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-494"
                    >
                      <Link
                        target="_blank"
                        rel="noopener"
                        href="https://www.ammeraalbeltech.com/en/products/modular-belts/"
                      >
                        uni
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div id="div_block-58-11" className="ct-div-block">
              <h6 id="headline-67-11" className="ct-headline h-60">
                POWER TRANSMISSION SOLUTIONS
              </h6>
              <div id="div_block-90-11" className="ct-div-block underline"></div>
              <nav
                id="_nav_menu-104-11"
                className="oxy-nav-menu oxy-nav-menu-dropdowns oxy-nav-menu-dropdown-arrow oxy-nav-menu-vertical"
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
                <div className="menu-power-transmission-solutions-container">
                  <ul id="menu-power-transmission-solutions" className="oxy-nav-menu-list">
                    <li
                      id="menu-item-188"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-188"
                    >
                      <Link target="_blank" rel="noopener" href="https://megadynegroup.com/en">
                        Megadyne
                      </Link>
                    </li>
                    <li
                      id="menu-item-189"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-189"
                    >
                      <Link target="_blank" rel="noopener" href="http://www.challengept.com">
                        Challenge
                      </Link>
                    </li>
                    <li
                      id="menu-item-190"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-190"
                    >
                      <Link target="_blank" rel="noopener" href="https://helicord.com">
                        Helicord
                      </Link>
                    </li>
                    <li
                      id="menu-item-191"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-191"
                    >
                      <Link target="_blank" rel="noopener" href="https://www.satispa.com/">
                        Sati
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div id="div_block-59-11" className="ct-div-block">
              <h6 id="headline-69-11" className="ct-headline h-60">
                FLUID POWER
                <br />
                SOLUTIONS
              </h6>
              <div id="div_block-96-11" className="ct-div-block underline"></div>
              <nav
                id="_nav_menu-105-11"
                className="oxy-nav-menu oxy-nav-menu-dropdowns oxy-nav-menu-dropdown-arrow oxy-nav-menu-vertical"
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
                <div className="menu-fluid-power-solutions-container">
                  <ul id="menu-fluid-power-solutions" className="oxy-nav-menu-list">
                    <li
                      id="menu-item-187"
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-187"
                    >
                      <Link target="_blank" rel="noopener" href="https://www.jasonindustrial.com">
                        Jason industrial
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <AmmegaFooterLinksDefaultComponent {...props} />;
};
