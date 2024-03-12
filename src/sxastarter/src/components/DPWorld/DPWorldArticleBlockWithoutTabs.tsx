import React from 'react';
import {
  LinkField,
  TextField,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: TextField;
  Link: LinkField;
}

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

const DPWorldArticleBlockDefaultComponent = (props: ComponentProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint"></span>
    </div>
  </div>
);

export const Default = (props: ComponentProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className="component">
        <div className="article-block without-tabs">
          <div className="component-content">
            <div className="container-fluid">
              <div className="article-title">
                <h2>KEY INSIGHTS </h2>
              </div>
              <div className="article-block-threecolumn article-column">
                <div className="row article variant-highlight">
                  <div className="col-md-6 col-lg-4 col-12 thumb-style">
                    <div className="article-img circle-icon">
                      <picture
                        className="img-fluid lozad-picture"
                        data-iesrc="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Water/Global-wealth.svg?rev=e25eb952182f43bd9a8d39816d579a97&amp;cx=0&amp;cy=0&amp;cw=675&amp;ch=380&amp;hash=B013808E6208214E7E6A440E8FDD7822"
                        data-loaded="true"
                      >
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Water/Global-wealth.svg?rev=e25eb952182f43bd9a8d39816d579a97&amp;cx=0&amp;cy=0&amp;cw=675&amp;ch=380&amp;hash=B013808E6208214E7E6A440E8FDD7822"
                          media="(min-width: 768px)"
                        />
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Water/Global-wealth.svg?rev=e25eb952182f43bd9a8d39816d579a97&amp;cx=0&amp;cy=0&amp;cw=767&amp;ch=432&amp;hash=0B49D84E4DE5429AAAB3366657879BDF"
                          media="(max-width: 767px)"
                        />
                        <img alt="" />
                      </picture>
                    </div>
                    <div className="article-detail text-only">
                      <h2></h2>
                      <p className="field-description">
                        The annual economic value of water and freshwater ecosystems is estimated to
                        be US$58 trillion – equivalent to 60% of global Gross Domestic Product (GDP)
                        (World Wildlife Fund, 2023)
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-12 thumb-style">
                    <div className="article-img circle-icon">
                      <picture
                        className="img-fluid lozad-picture"
                        data-iesrc="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Water/Map.svg?rev=9b0ffb5da14047f3893ddac7641dbcbe&amp;cx=0&amp;cy=0&amp;cw=675&amp;ch=380&amp;hash=685884E20C3C1CCA33B3A795FC687E6A"
                        data-loaded="true"
                      >
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Water/Map.svg?rev=9b0ffb5da14047f3893ddac7641dbcbe&amp;cx=0&amp;cy=0&amp;cw=675&amp;ch=380&amp;hash=685884E20C3C1CCA33B3A795FC687E6A"
                          media="(min-width: 768px)"
                        />
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Water/Map.svg?rev=9b0ffb5da14047f3893ddac7641dbcbe&amp;cx=0&amp;cy=0&amp;cw=767&amp;ch=432&amp;hash=A0492A147D53274FA98C86186E314C74"
                          media="(max-width: 767px)"
                        />
                        <img alt="" />
                      </picture>
                    </div>
                    <div className="article-detail text-only">
                      <h2></h2>
                      <p className="field-description">
                        Only 7% of all MPAs are located within one kilometre of the world’s urban
                        centres. The conventional placement of MPAs rarely address the protection of
                        urban waters against cumulative human impacts from cities.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-12 thumb-style">
                    <div className="article-img circle-icon">
                      <picture
                        className="img-fluid lozad-picture"
                        data-iesrc="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Water/Marine.svg?rev=30f3cdba29684bbca3b64929becf61be&amp;cx=0.42&amp;cy=0.74&amp;cw=675&amp;ch=380&amp;hash=9ADB4AD48C0EF9E25093F529AA468CB9"
                        data-loaded="true"
                      >
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Water/Marine.svg?rev=30f3cdba29684bbca3b64929becf61be&amp;cx=0.42&amp;cy=0.74&amp;cw=675&amp;ch=380&amp;hash=9ADB4AD48C0EF9E25093F529AA468CB9"
                          media="(min-width: 768px)"
                        />
                        <source
                          srcSet="https://dpwprod.azureedge.net/-/media/Project/DPWG/DPWG-Tenant/Corporate/Global/Images/All-Insights/whitepapers/Water/Marine.svg?rev=30f3cdba29684bbca3b64929becf61be&amp;cx=0.42&amp;cy=0.74&amp;cw=767&amp;ch=432&amp;hash=EC579E3F7A477AF6FDF8D5FF59ED2555"
                          media="(max-width: 767px)"
                        />
                        <img alt="" />
                      </picture>
                    </div>
                    <div className="article-detail text-only">
                      <h2></h2>
                      <p className="field-description">
                        As per the United Nations, approximately 40% of global jobs are linked to
                        water-dependent sectors like agriculture, fishing, and tourism (UN Water,
                        2016).
                      </p>
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

  return <DPWorldArticleBlockDefaultComponent {...props} />;
};
