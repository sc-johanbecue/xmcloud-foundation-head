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
      <div className="component">
        <div className="article-block">
          <div className="component-content">
            <div className="container-fluid">
              <div className="article-block-fourcolumn article-column">
                <div className="article-title">
                  <div className="row">
                    <div className="col-12 col-md-8">
                      <h2 className="field-heading">Featured insights</h2>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="clearfix">
                        <Link
                          href="/insights"
                          data-variantitemid="{F0A27CE1-1446-417A-84EA-189FE9C999EA}"
                          className="primary-cta float-none float-md-right mt-2"
                          data-variantfieldname="Navigation Link"
                        >
                          See all insights
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row article">
                  <div className="col-md-6 col-lg-3 col-12">
                    <div className="article-img">
                      <picture
                        className="img-fluid lozad-picture"
                        data-iesrc="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Port-of-Maputo.jpeg?rev=8d12394edb244e1999da325711d0d0ee&amp;cx=0.35&amp;cy=0.66&amp;cw=675&amp;ch=380&amp;hash=F87198E8D62041DB0D4166A5B50F9AD5"
                        data-loaded="true"
                      >
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Port-of-Maputo.jpeg?rev=8d12394edb244e1999da325711d0d0ee&amp;cx=0.35&amp;cy=0.66&amp;cw=675&amp;ch=380&amp;hash=F87198E8D62041DB0D4166A5B50F9AD5"
                          media="(min-width: 768px)"
                        />
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/New-brand-imagery/Port-of-Maputo.jpeg?rev=8d12394edb244e1999da325711d0d0ee&amp;cx=0.35&amp;cy=0.66&amp;cw=767&amp;ch=432&amp;hash=40B7C300B3B8ECB0085F025FD147F902"
                          media="(max-width: 767px)"
                        />
                        <img />
                      </picture>
                    </div>
                    <div className="article-detail">
                      <h2 className="field-article-title">Rail Networks Transform Supply Chains</h2>
                      <p className="field-description">
                        Rail freight has the potential to revolutionise supply chains in both
                        developed and developing nations, providing a key role in promoting
                        sustainability and economic growth.
                      </p>
                      <Link
                        href="/insights/expert-opinions/rail-networks-transform-supply-chains"
                        data-variantitemid="{602EFAC4-88F0-47F3-B62E-06F4AD83729B}"
                        className="primary-cta"
                        data-variantfieldname="Navigation Link"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 col-12">
                    <div className="article-img">
                      <picture
                        className="img-fluid lozad-picture"
                        data-iesrc="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/Whitepapers/Boat-on-a-river-surrounded-by-palm-trees.jpg?rev=a7a396356ac44155854c49c4d970357c&amp;cx=0.49&amp;cy=0.49&amp;cw=675&amp;ch=380&amp;hash=A7D80A52CD38E0FBF81B2E0B49F846A3"
                        data-loaded="true"
                      >
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/Whitepapers/Boat-on-a-river-surrounded-by-palm-trees.jpg?rev=a7a396356ac44155854c49c4d970357c&amp;cx=0.49&amp;cy=0.49&amp;cw=675&amp;ch=380&amp;hash=A7D80A52CD38E0FBF81B2E0B49F846A3"
                          media="(min-width: 768px)"
                        />
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/Whitepapers/Boat-on-a-river-surrounded-by-palm-trees.jpg?rev=a7a396356ac44155854c49c4d970357c&amp;cx=0.49&amp;cy=0.49&amp;cw=767&amp;ch=432&amp;hash=07AB4E092CA0672A93535E5581C382C5"
                          media="(max-width: 767px)"
                        />
                        <img />
                      </picture>
                    </div>
                    <div className="article-detail">
                      <h2 className="field-article-title">Changing the Perception of Water</h2>
                      <p className="field-description">
                        Water is crucial for life on Earth and vital for our well-being. Businesses,
                        including ours, can play a significant role in changing how water is used.
                      </p>
                      <Link
                        href="/insights/whitepapers/water"
                        data-variantitemid="{7253E673-F54C-4CB8-8D48-C0EDD580B10F}"
                        className="primary-cta"
                        data-variantfieldname="Navigation Link"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 col-12">
                    <div className="article-img">
                      <picture
                        className="img-fluid lozad-picture"
                        data-iesrc="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Humanitarian-logistics/Truck-on-the-road-on-the-route.jpg?rev=4f0c7214071c47eea8c4f42b7a178304&amp;cx=0.42&amp;cy=0.74&amp;cw=675&amp;ch=380&amp;hash=038DFF4EFC87C99FC27DFA1EB922A4C9"
                        data-loaded="true"
                      >
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Humanitarian-logistics/Truck-on-the-road-on-the-route.jpg?rev=4f0c7214071c47eea8c4f42b7a178304&amp;cx=0.42&amp;cy=0.74&amp;cw=675&amp;ch=380&amp;hash=038DFF4EFC87C99FC27DFA1EB922A4C9"
                          media="(min-width: 768px)"
                        />
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Humanitarian-logistics/Truck-on-the-road-on-the-route.jpg?rev=4f0c7214071c47eea8c4f42b7a178304&amp;cx=0.42&amp;cy=0.74&amp;cw=767&amp;ch=432&amp;hash=47DD5771EBB72186A080BEC1CCC13167"
                          media="(max-width: 767px)"
                        />
                        <img />
                      </picture>
                    </div>
                    <div className="article-detail">
                      <h2 className="field-article-title">
                        Empowering Humanitarian Logistics Resilience
                      </h2>
                      <p className="field-description">
                        As the world faces increasing and unprecedented challenges, humanitarian
                        logistics is the central element of crisis response when supply chains are
                        disrupted.
                      </p>
                      <Link
                        href="/insights/whitepapers/humanitarian-logistics"
                        data-variantitemid="{16050DAF-773C-4EB1-A4CD-EC007A33741A}"
                        className="primary-cta"
                        data-variantfieldname="Navigation Link"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 col-12">
                    <div className="article-img">
                      <picture
                        className="img-fluid lozad-picture"
                        data-iesrc="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/Whitepapers/Asset-resilience/Scenic-evening-view-of-the-yard-and-gates-at-SPCT-terminal.jpg?rev=6022b073bb37477d8dda7f28cc16dd1d&amp;cx=0&amp;cy=0&amp;cw=675&amp;ch=380&amp;hash=EE1B32BD84E4704F6728E34BB59D7D26"
                        data-loaded="true"
                      >
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/Whitepapers/Asset-resilience/Scenic-evening-view-of-the-yard-and-gates-at-SPCT-terminal.jpg?rev=6022b073bb37477d8dda7f28cc16dd1d&amp;cx=0&amp;cy=0&amp;cw=675&amp;ch=380&amp;hash=EE1B32BD84E4704F6728E34BB59D7D26"
                          media="(min-width: 768px)"
                        />
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/Whitepapers/Asset-resilience/Scenic-evening-view-of-the-yard-and-gates-at-SPCT-terminal.jpg?rev=6022b073bb37477d8dda7f28cc16dd1d&amp;cx=0&amp;cy=0&amp;cw=767&amp;ch=432&amp;hash=3DE7A01735E70947758A97801C2AA489"
                          media="(max-width: 767px)"
                        />
                        <img />
                      </picture>
                    </div>
                    <div className="article-detail">
                      <h2 className="field-article-title">Climate Proofing the Supply Chain</h2>
                      <p className="field-description">
                        As global temperatures continue to rise, so too does the frequency of
                        extreme weather events. We examine three climate scenarios, assessing the
                        potential impact of weather hazards across 50 ports and terminals in our
                        global portfolio.
                      </p>
                      <Link
                        href="/insights/whitepapers/climate-proofing-the-supply-chain"
                        data-variantitemid="{0AE5182B-6227-4AA8-A44A-D4B5859DC41D}"
                        className="primary-cta"
                        data-variantfieldname="Navigation Link"
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
    );
  }

  return <DPWorldFooterDefaultComponent {...props} />;
};
