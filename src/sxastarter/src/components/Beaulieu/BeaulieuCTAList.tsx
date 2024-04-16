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

type BeaulieuSliderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BeaulieuSliderDefaultComponent = (props: BeaulieuSliderProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: BeaulieuSliderProps): JSX.Element => {
  if (props.fields) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="margin-bottom-15 ">
                <a
                  href="https://www.berryalloc.com/global/en/laminate"
                  className="component component-cta-small"
                >
                  <img
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    className="img-responsive js-lazyload"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: '-1',
                    }}
                    alt=""
                    data-src="/-/media/sites/berryalloc/home-page-pics/homepage-button-laminate.ashx?rev=e04ea610e04946a08de60d93bf26693f&amp;h=1729&amp;w=3063&amp;la=en&amp;hash=2CFDFF6EB82A9031D9009D8E8D4DEEAB"
                  />
                  <div
                    className="display-table center js-equal-cta-small"
                    style={{ backgroundColor: '#9FB3B1' }}
                  >
                    <div className="display-table-cell">
                      <h3 className="cta-title">laminate</h3>
                      <p className="cta-text">
                        Durable & surprising <br /> Close your eyes and imagine your dream floor
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="margin-bottom-15 ">
                <a
                  href="https://www.berryalloc.com/global/en/high-pressure-floors"
                  className="component component-cta-small"
                >
                  <img
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    className="img-responsive js-lazyload"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: '-1',
                    }}
                    alt=""
                    data-src="/-/media/sites/berryalloc/home-page-pics/productgroups_hpf.ashx?rev=84ba1f67fdb94a978126e22cdf64f41d&amp;h=1729&amp;w=3063&amp;la=en&amp;hash=CB582AA71AE1ADF4AD58678F4C7B00AB"
                  />
                  <div
                    className="display-table center js-equal-cta-small"
                    style={{ backgroundColor: '#83787F' }}
                  >
                    <div className="display-table-cell">
                      <h3 className="cta-title">high pressure floors</h3>
                      <p className="cta-text">
                        The perfect marriage between design and durability.
                        <br />
                        They are the toughest on the market and can stand up to high traffic.
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="margin-bottom-15 ">
                <a
                  href="https://www.berryalloc.com/global/en/parquet"
                  className="component component-cta-small"
                >
                  <img
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    className="img-responsive js-lazyload"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: '-1',
                    }}
                    alt=""
                    data-src="/-/media/sites/berryalloc/home-page-pics/productgroups_pqt.ashx?rev=b3c8627a671b47699b062443a54d1ee8&amp;h=1729&amp;w=3063&amp;la=en&amp;hash=5CE771D912311F849BE7609405E1BFD7"
                  />
                  <div
                    className="display-table center js-equal-cta-small"
                    style={{ backgroundColor: '#CDC8BF' }}
                  >
                    <div className="display-table-cell">
                      <h3 className="cta-title">parquet</h3>
                      <p className="cta-text">
                        The natural choice
                        <br />
                        Create warm spaces with a simple natural touch
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="margin-bottom-15 ">
                <a
                  href="https://www.berryalloc.com/global/en/vinyl-planks"
                  className="component component-cta-small"
                >
                  <img
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    className="img-responsive js-lazyload"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: '-1',
                    }}
                    alt=""
                    data-src="https://www.berryalloc.com/-/media/sites/berryalloc/home-page-pics/productgroups_lvt.ashx?rev=b7286cbf69404789913b81d0176af7cc&amp;h=1729&amp;w=3063&amp;la=en&amp;hash=253164B3311C68FBD01B83EAAD309DEA"
                  />
                  <div
                    className="display-table center js-equal-cta-small"
                    style={{ backgroundColor: '#B6B9AB' }}
                  >
                    <div className="display-table-cell">
                      <h3 className="cta-title">vinyl planks & tiles</h3>
                      <p className="cta-text">
                        A modern classic <br /> Add softness and style to your home
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="margin-bottom-15 ">
                <a
                  href="https://www.berryalloc.com/global/en/walls"
                  className="component component-cta-small"
                >
                  <img
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    className="img-responsive js-lazyload"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: '-1',
                    }}
                    alt="Walls"
                    data-src="/-/media/sites/berryalloc/home-page-pics/walls-product-line-icon_737x415.ashx?rev=53d5c4f9441e4f99b088f645a99f0ec4&amp;h=415&amp;w=737&amp;la=en&amp;hash=DB2EEF8E1C87CC48AE07FD0E37639CC4"
                  />
                  <div
                    className="display-table center js-equal-cta-small"
                    style={{ backgroundColor: '#A6AEB9' }}
                  >
                    <div className="display-table-cell">
                      <h3 className="cta-title">wall panels</h3>
                      <p className="cta-text">
                        Transform your home <br /> Enjoy a new look for your bathroom or kitchen in
                        no time
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="margin-bottom-15 ">
                <a
                  href="https://www.berryalloc.com/global/en/strong-wood-floors"
                  className="component component-cta-small"
                >
                  <img
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    className="img-responsive js-lazyload"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      zIndex: '-1',
                    }}
                    alt=""
                    data-src="/-/media/sites/berryalloc/general/senses/sensescta.ashx?rev=3eb7d0957a8a4c29a1cac9e71a5d00da&amp;h=537&amp;w=830&amp;la=en&amp;hash=D2FDAA3ED59C0023AEBA242540FCB103"
                  />
                  <div
                    className="display-table center js-equal-cta-small"
                    style={{ backgroundColor: '#C49B87' }}
                  >
                    <div className="display-table-cell">
                      <h3 className="cta-title">strong wood floors</h3>
                      <p className="cta-text">
                        Beautiful oak wood veneer floors for maximum strength
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <BeaulieuSliderDefaultComponent {...props} />;
};
