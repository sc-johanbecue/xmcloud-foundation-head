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
      <>
        <div className="footer-top">
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
              <h5>Why BerryAlloc?</h5>
              <ul>
                <li>
                  <a href="https://www.berryalloc.com/global/en/about-us">about us</a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/sustainability">sustainability</a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/contact">contact us</a>
                </li>
                <li>
                  <a href="https://careers.bintg.com/?locale=en_GB" target="_blank">
                    careers
                  </a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/blog">blog</a>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
              <h5>Products</h5>
              <ul>
                <li>
                  <a href="https://www.berryalloc.com/global/en/strong-wood-floors">
                    strong wood floors
                  </a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/laminate">laminate</a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/high-pressure-floors">
                    high pressure floors
                  </a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/parquet">parquet</a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/vinyl-planks">
                    vinyl planks &amp; tiles
                  </a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/walls">walls</a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/accessories/laminate-accessories">
                    accessories
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
              <h5>Customer Care &amp; Downloads</h5>
              <ul>
                <li>
                  <a href="https://www.berryalloc.com/global/en/support/installation-maintenance">
                    installation and maintenance
                  </a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/support/download">
                    download section
                  </a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/support/faq">
                    frequently asked questions
                  </a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/support/glossary">glossary</a>
                </li>
                <li>
                  <a href="https://www.berryalloc.com/global/en/support/imagebank">
                    image bank &#128272; (professionals)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="row">
            <div className="col-xs-12 col-sm-6 subscribe">
              <a
                className="font-smoothing"
                href="https://mediacenter.bintg.com/api/wedia/dam/variation?object=blicomrelasset&amp;id=6&amp;variation=original"
                target="_blank"
              >
                cookie policy
              </a>
              <a
                className="font-smoothing"
                href="https://mediacenter.bintg.com/api/wedia/dam/variation?object=blicomrelasset&amp;id=40&amp;variation=original"
                target="_blank"
              >
                privacy policy
              </a>
              <a
                className="font-smoothing"
                href="https://bintg.whispli.com/lp/speakup?locale=en"
                target=""
              >
                Raise a concern
              </a>
            </div>
            <div className="col-xs-12 col-sm-6 social text-right">
              <ul>
                <li>stay connected:</li>
                <li>
                  <a
                    href="https://www.facebook.com/BerryAlloc/?ref=bookmarks"
                    title=""
                    target="_Blank"
                  >
                    <i className="" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/berryalloc/" title="" target="_Blank">
                    <i className="" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.pinterest.com/BerryAlloc/" title="" target="_Blank">
                    <i className="" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/user/BerryAlloc" title="" target="_Blank">
                    <i className="" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/BerryAlloc" title="" target="_Blank">
                    <i className="" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/berryalloc-nv" title="" target="_Blank">
                    <i className="" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
              <a className="btag" href="https://www.bintg.com/">
                <img
                  src="https://www.berryalloc.com/-/media/sites/berryalloc/home-page-pics/beaulieu-tag.ashx?rev=48af7db1330549e08d2a5f262137d56e"
                  alt="beaulieu international group"
                />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <BeaulieuFooterDefaultComponent {...props} />;
};
