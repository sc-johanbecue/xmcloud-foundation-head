import React from 'react';
import {
  ImageField,
  TextField,
  RichTextField,
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';

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
  rendering: ComponentRendering & { params: ComponentParams };
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
  const phSliderItems = `sliderItems-${props.params.DynamicPlaceholderId}`;

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
                  <Placeholder name={phSliderItems} rendering={props.rendering} />
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
