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

type BeaulieuHeaderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BeaulieuHeaderDefaultComponent = (props: BeaulieuHeaderProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: BeaulieuHeaderProps): JSX.Element => {
  if (props.fields) {
    return (
      <>
        <nav className="navigation">
          <div className="navigation-container">
            <div className="navigation-top">
              <div className="container">
                <form
                  action="/global/en/search"
                  autoComplete="off"
                  className="form search"
                  method="get"
                >
                  <input type="text" autoComplete="off" name="search" placeholder="search" />
                  <button
                    className="font-smoothing"
                    data-search-translation="search"
                    data-submit-translation="submit"
                    type="submit"
                    value="search"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </form>
                <ul className="navigation-top-menu">
                  <li className=" navigation-top-menu-item">
                    <a
                      href="https://www.berryalloc.com/global/en/floorfit"
                      target=""
                      title="Floorfit"
                      className="font-smoothing"
                    >
                      Floorfit
                    </a>
                  </li>
                  <li className=" navigation-top-menu-item">
                    <a
                      href="https://www.berryalloc.com/global/en/contact"
                      target=""
                      title="contact us"
                      className="font-smoothing"
                    >
                      contact us
                    </a>
                  </li>
                </ul>
                <a
                  className="navigation-top-menu-item--highlight item-highlight-default"
                  data-js="js-dealer"
                  href="https://www.berryalloc.com/global/en/dealers"
                >
                  find a dealer
                  <span className="fa fa-map-marker"></span>
                </a>
                <a
                  href="https://www.berryalloc.com/global/en/location"
                  className="navigation-top-menu-item--highlight item-highlight-default"
                  data-webid="header-language-picker"
                >
                  Global
                </a>
              </div>
            </div>
            <div className="navigation-bottom">
              <div className="container">
                <a className="navigation-bottom-brand" href="https://www.berryalloc.com/global/en">
                  <img
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    className="js-lazyload"
                    alt="Berryalloc"
                    data-src="/-/media/sites/berryalloc/general/logo/berryalloc-logo_resized.ashx?rev=ba135e6c6f844df59e8fb3f34ac4df2f&amp;h=100&amp;w=500&amp;la=en&amp;hash=A4E1A0B17A210ECA922D9C5BF3F5C17C"
                  />
                </a>
                <ul className="navigation-bottom-menu">
                  <li className="has-submenu navigation-bottom-menu-item">
                    <a
                      href="https://www.berryalloc.com/global/en"
                      target=""
                      title="products"
                      className=""
                    >
                      products
                    </a>
                    <ul className="navigation-bottom-submenu">
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/laminate"
                          target=""
                          title="laminate"
                        >
                          laminate
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/high-pressure-floors"
                          target=""
                          title="high pressure floors"
                        >
                          high pressure floors
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/parquet"
                          target=""
                          title="parquet"
                        >
                          parquet
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/vinyl-planks"
                          target=""
                          title="vinyl planks"
                        >
                          vinyl planks
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/strong-wood-floors"
                          target=""
                          title="strong wood floors"
                        >
                          strong wood floors
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/walls"
                          target=""
                          title="walls"
                        >
                          walls
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/accessories"
                          target=""
                          title="accessories"
                        >
                          accessories
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu navigation-bottom-menu-item">
                    <a href="#" target="" title="inspiration" className="">
                      inspiration
                    </a>
                    <ul className="navigation-bottom-submenu">
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/blog"
                          target=""
                          title="blog"
                        >
                          blog
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/community"
                          target=""
                          title="community"
                        >
                          community
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/harmony-lab"
                          target=""
                          title="Harmony Lab"
                        >
                          Harmony Lab
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/references"
                          target=""
                          title="references"
                        >
                          references
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu navigation-bottom-menu-item">
                    <a
                      href="https://www.berryalloc.com/global/en/type-of-flooring"
                      target=""
                      title="which type of floor?"
                      className=""
                    >
                      which type of floor?
                    </a>
                    <ul className="navigation-bottom-submenu">
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/type-of-flooring/laminate"
                          target=""
                          title="why laminate?"
                        >
                          why laminate?
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/type-of-flooring/high-pressure-floors"
                          target=""
                          title="why high pressure floors?"
                        >
                          why high pressure floors?
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/type-of-flooring/strong-wood-floors"
                          target=""
                          title="Why Strong wood floors?"
                        >
                          Why Strong wood floors?
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/type-of-flooring/parquet"
                          target=""
                          title="why parquet?"
                        >
                          why parquet?
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/type-of-flooring/live-vinyl-planks"
                          target=""
                          title="why live vinyl planks?"
                        >
                          why live vinyl planks?
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/type-of-flooring/pure-vinyl-planks"
                          target=""
                          title="why pure vinyl planks?"
                        >
                          why pure vinyl planks?
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/type-of-flooring/spirit-vinyl-planks"
                          target=""
                          title="why spirit vinyl planks?"
                        >
                          why spirit vinyl planks?
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/type-of-flooring/walls"
                          target=""
                          title="why walls?"
                        >
                          why walls?
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu navigation-bottom-menu-item">
                    <a
                      href="https://www.berryalloc.com/global/en/support"
                      target=""
                      title="customer care &amp; downloads"
                      className=""
                    >
                      customer care & downloads
                    </a>
                    <ul className="navigation-bottom-submenu">
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/support/installation-maintenance"
                          target=""
                          title="installation &amp; maintenance"
                        >
                          installation &amp; maintenance
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/support/download"
                          target=""
                          title="download section"
                        >
                          download section
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/support/faq"
                          target=""
                          title="FAQ"
                        >
                          FAQ
                        </a>
                      </li>
                      <li className="navigation-bottom-menu-subitem">
                        <a
                          className=""
                          href="https://www.berryalloc.com/global/en/support/imagebank"
                          target=""
                          title="image bank &#128272;"
                        >
                          image bank &#128272;
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className=" navigation-bottom-menu-item">
                    <a
                      href="https://berryalloc.com/floorfit?roomvoAutoStart=true"
                      target="_blank"
                      title="visualise in your interior"
                      className=""
                    >
                      visualise in your interior
                    </a>
                  </li>
                  <li className=" navigation-bottom-menu-item">
                    <a
                      href="https://www.berryalloc.com/global/en/sustainability"
                      target=""
                      title="sustainability"
                      className=""
                    >
                      sustainability
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="navigation-mobile hidden-md hidden-lg">
          <div className="container">
            <a className="navigation-bottom-brand" href="https://www.berryalloc.com/global/en">
              <img
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                className="js-lazyload"
                alt="Berryalloc"
                data-src="/-/media/sites/berryalloc/general/logo/berryalloc-logo_resized.ashx?rev=ba135e6c6f844df59e8fb3f34ac4df2f&amp;h=100&amp;w=500&amp;la=en&amp;hash=A4E1A0B17A210ECA922D9C5BF3F5C17C"
              />
            </a>
            <a className="hamburger" href="#">
              <i className="fa fa-bars"></i>
            </a>
            <a
              className="dealer"
              data-js="js-dealer"
              href="https://www.berryalloc.com/global/en/dealers"
            >
              <i className="fa fa-map-marker"></i>
            </a>
            <a className="search" href="#">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>
        <div className="search-mobile">
          <form className="form search" action="/global/en" autoComplete="off" method="post">
            <input id="scController" name="scController" type="hidden" value="BeaulieuHeader" />
            <input id="scAction" name="scAction" type="hidden" value="SiteSearch" />
            <input type="text" autoComplete="off" name="search" placeholder="search" />
            <input
              data-search-translation="search"
              data-submit-translation="submit"
              type="submit"
            />
            <div className="clearfix">&nbsp;</div>
          </form>
        </div>
      </>
    );
  }

  return <BeaulieuHeaderDefaultComponent {...props} />;
};
