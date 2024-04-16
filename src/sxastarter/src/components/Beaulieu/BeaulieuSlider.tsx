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
          <div className=" margin-bottom-15 ">
            <div
              data-component-className="Dlw.ScBase.Website.Slider"
              data-component-parm='{"enableSwiping":false}'
              data-webid="Dlw.ScBase.Website.Slider"
            >
              <div
                id="slider"
                className="carousel slide component-slider js-component-slider"
                data-ride="carousel"
              >
                {/* Indicators */}
                <ol className="carousel-indicators js-carousel-indicators">
                  <li data-target="#slider" data-slide-to="0" className="active"></li>
                  <li data-target="#slider" data-slide-to="1" className=""></li>
                  <li data-target="#slider" data-slide-to="2" className=""></li>
                  <li data-target="#slider" data-slide-to="3" className=""></li>
                  <li data-target="#slider" data-slide-to="4" className=""></li>
                  <li data-target="#slider" data-slide-to="5" className=""></li>
                  <li data-target="#slider" data-slide-to="6" className=""></li>
                </ol>
                {/* Wrapper for slides */}
                <div className="carousel-inner" role="listbox">
                  <div className="item active">
                    <img
                      src="https://www.berryalloc.com/-/media/sites/berryalloc/general/senses/headersenses4.ashx?rev=6b972f4060de4a4db88b461edecbb37c"
                      alt="Discover our strong wood floors "
                      loading="lazy"
                    />
                    <div className="carousel-caption">
                      <div className="display-table center">
                        <div className="display-table-cell">
                          <h2 className="carousel-title">Discover our strong wood floors </h2>
                          <p className="carousel-text"></p>
                          <a
                            href="https://www.berryalloc.com/global/en/strong-wood-floors"
                            className="btn btn-carousel"
                            target=""
                          >
                            find out more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item ">
                    <img
                      src="https://www.berryalloc.com/-/media/sites/berryalloc/header-1410x650/ba_banner_homepage_dpl2023_1410x650.ashx?rev=826ebdb0eb3243f0a3e9f33641de5b87"
                      alt="discover our laminate floors"
                      loading="lazy"
                    />
                    <div className="carousel-caption">
                      <div className="display-table center">
                        <div className="display-table-cell">
                          <h2 className="carousel-title">discover our laminate floors</h2>
                          <p className="carousel-text">
                            Premium quality floors for a lifetime of joy.
                          </p>
                          <a
                            href="https://www.berryalloc.com/global/en/laminate"
                            className="btn btn-carousel"
                            target=""
                          >
                            Find out more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item ">
                    <img
                      src="https://www.berryalloc.com/-/media/sites/berryalloc/home-page-pics/ber_floorfit_2022_webbanner_1410x650.ashx?rev=bebd197603d54f539d428093b5a3de8e"
                      alt="discover Floorfit"
                      loading="lazy"
                    />
                    <div className="carousel-caption">
                      <div className="display-table center">
                        <div className="display-table-cell">
                          <h2 className="carousel-title">discover Floorfit</h2>
                          <p className="carousel-text">Find a floor that fits you</p>
                          <a
                            href="https://www.berryalloc.com/global/en/floorfit"
                            className="btn btn-carousel"
                            target=""
                          >
                            Find out more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item ">
                    <img
                      src="https://www.berryalloc.com/-/media/sites/berryalloc/header-1410x650/ba_banner_dreamclick_1410x650.ashx?rev=674883ffac2d4fbeb4f42d67def56412"
                      alt="discover our vinyl planks and tiles"
                      loading="lazy"
                    />
                    <div className="carousel-caption">
                      <div className="display-table center">
                        <div className="display-table-cell">
                          <h2 className="carousel-title">discover our vinyl planks and tiles</h2>
                          <p className="carousel-text">A floor for your home, your life</p>
                          <a
                            href="https://www.berryalloc.com/global/en/vinyl-planks"
                            className="btn btn-carousel"
                            target=""
                          >
                            find out more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item ">
                    <img
                      src="https://www.berryalloc.com/-/media/sites/berryalloc/header-1410x650/hpf_website-banner_1410x650.ashx"
                      alt="discover our high pressure floors"
                      loading="lazy"
                    />
                    <div className="carousel-caption">
                      <div className="display-table center">
                        <div className="display-table-cell">
                          <h2 className="carousel-title">discover our high pressure floors</h2>
                          <p className="carousel-text">The world&apos;s strongest floors</p>
                          <a
                            href="https://www.berryalloc.com/global/en/high-pressure-floors"
                            className="btn btn-carousel"
                            target=""
                          >
                            find out more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item ">
                    <img
                      src="https://www.berryalloc.com/-/media/sites/berryalloc/header-1410x650/ba_banner_pqt_-1410x650.ashx?rev=e8527822989e40e08c3fa30392d474ae"
                      alt="discover our parquet collections"
                      loading="lazy"
                    />
                    <div className="carousel-caption">
                      <div className="display-table center">
                        <div className="display-table-cell">
                          <h2 className="carousel-title">discover our parquet collections</h2>
                          <p className="carousel-text"></p>
                          <a
                            href="https://www.berryalloc.com/global/en/parquet"
                            className="btn btn-carousel"
                            target=""
                          >
                            find out more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item ">
                    <img
                      src="https://www.berryalloc.com/-/media/sites/berryalloc/header-1410x650/ba_banner_harmony-lab_-1410x650.ashx?rev=5fd29fad363046298b9930f43f49e4b1"
                      alt="discover Harmony Lab"
                      loading="lazy"
                    />
                    <div className="carousel-caption">
                      <div className="display-table center">
                        <div className="display-table-cell">
                          <h2 className="carousel-title">discover Harmony Lab</h2>
                          <p className="carousel-text"></p>
                          <a
                            href="https://www.berryalloc.com/global/en/harmony-lab"
                            className="btn btn-carousel"
                            target=""
                          >
                            Find out more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Controls */}
                <a
                  className="left carousel-control js-carousel-control"
                  href="#slider"
                  role="button"
                  data-slide="prev"
                >
                  <span className="carousel-control-left" aria-hidden="true"></span>
                  <span className="sr-only">#Previous#</span>
                </a>
                <a
                  className="right carousel-control js-carousel-control"
                  href="#slider"
                  role="button"
                  data-slide="next"
                >
                  <span className="carousel-control-right" aria-hidden="true"></span>
                  <span className="sr-only">#Next#</span>
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
