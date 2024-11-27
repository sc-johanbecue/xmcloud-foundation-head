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
      <div className="herobanner-wrapper">
        <div className="component-content">
          <div className="herobanner owl-carousel owl-theme" data-slider-id="1">
            <div className="herobanner-item">
              <div className="herobanner-img">
                <picture className="img-fluid">
                  <source
                    className="owl-lazy"
                    data-srcset="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Freight-train-on-the-railroad.jpg?rev=bc57f3b96f544eccabc44bacd2d87efd&amp;cx=0.52&amp;cy=0.52&amp;cw=1920&amp;ch=950&amp;hash=523EFDD637E2F08248BD5ABA36E1C991"
                    media="(min-width: 768px)"
                  ></source>
                  <source
                    className="owl-lazy"
                    data-srcset="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Freight-train-on-the-railroad.jpg?rev=bc57f3b96f544eccabc44bacd2d87efd&amp;cx=0.52&amp;cy=0.52&amp;cw=767&amp;ch=1480&amp;hash=6BD2FB6BEAFE1F489ABB70F385BC245C"
                    media="(max-width: 767px)"
                  ></source>
                  <img
                    className="owl-lazy img-fluid"
                    data-src="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Freight-train-on-the-railroad.jpg?rev=bc57f3b96f544eccabc44bacd2d87efd&amp;cx=0.52&amp;cy=0.52&amp;cw=1920&amp;ch=950&amp;hash=523EFDD637E2F08248BD5ABA36E1C991"
                    alt="banner"
                  />
                </picture>
              </div>
              <div className="herobanner-copy">
                <div className="copy-wrapper">
                  <p className="bannertitle">WE&#39;RE ALWAYS MOVING</p>
                  <p className="bannersubtitle">
                    A leading provider of end-to-end supply chain solutions, we help trade flow
                    across the globe.
                  </p>
                </div>
              </div>
            </div>
            <div className="herobanner-item">
              <div className="herobanner-img">
                <picture className="img-fluid">
                  <source
                    className="owl-lazy"
                    data-srcset="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Woman-in-metal-factory.jpg?rev=66273701bb7c40c7b80fcce239fe34a7&amp;cx=0.51&amp;cy=0.57&amp;cw=1920&amp;ch=950&amp;hash=88F852982BA416241E38704777444E0E"
                    media="(min-width: 768px)"
                  ></source>
                  <source
                    className="owl-lazy"
                    data-srcset="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Woman-in-metal-factory.jpg?rev=66273701bb7c40c7b80fcce239fe34a7&amp;cx=0.51&amp;cy=0.57&amp;cw=767&amp;ch=1480&amp;hash=2FCD1EA36CA75CE92E959985806134A4"
                    media="(max-width: 767px)"
                  ></source>
                  <img
                    className="owl-lazy img-fluid"
                    data-src="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Woman-in-metal-factory.jpg?rev=66273701bb7c40c7b80fcce239fe34a7&amp;cx=0.51&amp;cy=0.57&amp;cw=1920&amp;ch=950&amp;hash=88F852982BA416241E38704777444E0E"
                    alt="banner"
                  />
                </picture>
              </div>
              <div className="herobanner-copy">
                <div className="copy-wrapper">
                  <p className="bannertitle">FROM FACTORY FLOOR TO CUSTOMER DOOR</p>
                  <p className="bannersubtitle">
                    Explore how our solutions are solving the complex challenges of end-to-end
                    supply chains.
                  </p>
                  <Link
                    title="Services"
                    href="/supply-chain-solutions"
                    className="primary-cta-white"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
            <div className="herobanner-item">
              <div className="herobanner-img">
                <picture className="img-fluid">
                  <source
                    className="owl-lazy"
                    data-srcset="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/TinT/Tint-Hero.jpeg?rev=4f65eae1a258447cb34e8a3d6347827a&amp;cx=0.54&amp;cy=0.4&amp;cw=1920&amp;ch=950&amp;hash=5E633BAE54D7E7EAE1D28F12BB360434"
                    media="(min-width: 768px)"
                  ></source>
                  <source
                    className="owl-lazy"
                    data-srcset="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/TinT/Tint-Hero.jpeg?rev=4f65eae1a258447cb34e8a3d6347827a&amp;cx=0.54&amp;cy=0.4&amp;cw=767&amp;ch=1480&amp;hash=D389A76D30040CCDB0D287C21DDA7142"
                    media="(max-width: 767px)"
                  ></source>
                  <img
                    className="owl-lazy img-fluid"
                    data-src="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/TinT/Tint-Hero.jpeg?rev=4f65eae1a258447cb34e8a3d6347827a&amp;cx=0.54&amp;cy=0.4&amp;cw=1920&amp;ch=950&amp;hash=5E633BAE54D7E7EAE1D28F12BB360434"
                    alt="banner"
                  />
                </picture>
              </div>
              <div className="herobanner-copy">
                <div className="copy-wrapper">
                  <p className="bannertitle">TRADE IN TRANSITION</p>
                  <p className="bannersubtitle">
                    Uncover the insights required to navigate the uncertainty in global trade today.
                  </p>
                  <Link
                    title="Trade in transition"
                    href="/insights/trade-in-transition"
                    className="primary-cta-white"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="icons-wrapper">
            <div className="herobanner-icons owl-thumbs" data-slider-id="1">
              <div className="herobanner-icons-item">
                <div className="heroicon-img">
                  <img
                    className="img-fluid"
                    src="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Freight-train-on-the-railroad.jpg?rev=bc57f3b96f544eccabc44bacd2d87efd&amp;cx=0.52&amp;cy=0.52&amp;cw=174&amp;ch=169&amp;hash=D85A8CC687D4AE684D9F5B065608A887"
                    alt="thumbnail"
                  />
                </div>
                <div className="heroicon-title">WE&#39;RE ALWAYS MOVING</div>
              </div>
              <div className="herobanner-icons-item">
                <div className="heroicon-img">
                  <img
                    className="img-fluid"
                    src="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Woman-in-metal-factory.jpg?rev=66273701bb7c40c7b80fcce239fe34a7&amp;cx=0.51&amp;cy=0.57&amp;cw=174&amp;ch=169&amp;hash=71F14D1D407934D7C2E0C764CA010763"
                    alt="thumbnail"
                  />
                </div>
                <div className="heroicon-title">FROM FACTORY FLOOR TO CUSTOMER DOOR</div>
              </div>
              <div className="herobanner-icons-item">
                <div className="heroicon-img">
                  <img
                    className="img-fluid"
                    src="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/TinT/Tint-Hero.jpeg?rev=4f65eae1a258447cb34e8a3d6347827a&amp;cx=0.54&amp;cy=0.4&amp;cw=174&amp;ch=169&amp;hash=62BCC5B3EE6A35D8BF9FBBF8DBBEAEF6"
                    alt="thumbnail"
                  />
                </div>
                <div className="heroicon-title">TRADE IN TRANSITION</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <DPWorldFooterDefaultComponent {...props} />;
};
