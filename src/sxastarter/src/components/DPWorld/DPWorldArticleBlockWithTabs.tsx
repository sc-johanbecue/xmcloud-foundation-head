import React from 'react';
import {
  LinkField,
  TextField,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';

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
      <div className="article-block with-tabs" id="ourHighlights">
        <div className="component-content">
          <div className="container-fluid">
            <div className="article-title">
              <h2 className="field-title">CHAPTER BREAKDOWN</h2>
            </div>
            <div className="article-tab-nav">
              <span className="scroll-left" style={{ display: 'none' }}></span>
              <ul className="nav nav-tabs" id="articleTab" role="tablist">
                <li className="nav-item">
                  <Link
                    className="nav-link field-tab-title active"
                    id="home-tab"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="Chapter1"
                    aria-selected="true"
                    href="#Chapter1"
                  >
                    Chapter 1
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link field-tab-title"
                    id="home-tab"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="Chapter2"
                    aria-selected="false"
                    href="#Chapter2"
                  >
                    Chapter 2
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link field-tab-title"
                    id="home-tab"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="Chapter3"
                    aria-selected="false"
                    href="#Chapter3"
                  >
                    Chapter 3
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link field-tab-title"
                    id="home-tab"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="Chapter4"
                    aria-selected="false"
                    href="#Chapter4"
                  >
                    Chapter 4
                  </Link>
                </li>
              </ul>
              <span className="scroll-right" style={{ display: 'none' }}></span>
            </div>
            <div className="tab-content" id="articleTabContent">
              <div
                className="tab-pane fade active show"
                id="Chapter1"
                role="tabpanel"
                aria-labelledby="Chapter 1-tab"
              >
                <div className="article-block-fullcolumn enhanced">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="article-detail">
                        <span className="icon-for-article">
                          <img className="img-fluid" src="" alt="" />
                        </span>
                        <h2>Source-To-Sea: Integrated Water Management</h2>
                        <p>
                          Land-based activities have impacted freshwater ecosystems, aquifers and
                          the health of the ocean for millennia, with serious implications for human
                          health and well-being. Water bodies are highly connected; the improper use
                          of water in one location has impacts in another, which should be
                          considered for integrated water management.{' '}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-12 offset-0 offset-md-1">
                      <div className="article-img">
                        <picture
                          className="img-fluid lozad-picture"
                          data-iesrc="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/ocean-cleaning-system.jpg?rev=57724e62e60945d79a9b8ee1f1e50222"
                          data-loaded="true"
                        >
                          <source
                            srcSet="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/ocean-cleaning-system.jpg?rev=57724e62e60945d79a9b8ee1f1e50222"
                            media="(min-width: 768px)"
                          />
                          <source
                            srcSet="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/ocean-cleaning-system.jpg?rev=57724e62e60945d79a9b8ee1f1e50222"
                            media="(max-width: 767px)"
                          />
                          <img alt="" />
                        </picture>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Chapter2"
                role="tabpanel"
                aria-labelledby="Chapter 2-tab"
              >
                <div className="article-block-fullcolumn enhanced">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="article-detail">
                        <span className="icon-for-article">
                          <img className="img-fluid" src="" alt="" />
                        </span>
                        <h2>The Sustainable Blue Economy</h2>
                        <p>
                          A ‘Blue Economy’ encourages the responsible use of ocean resources,
                          benefitting economies and livelihoods while preserving ocean and marine
                          ecosystem health. Expanding both the definition and understanding of a
                          blue economy to include freshwater and community water-related activities
                          presents new opportunities for a better-rounded approach to water.{' '}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-12 offset-0 offset-md-1">
                      <div className="article-img">
                        <picture
                          className="img-fluid lozad-picture"
                          data-iesrc="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/fish-farms.jpg?rev=ce3ee402c72b464d9b1f8ae95fd3509a"
                          data-loaded="true"
                        >
                          <source
                            srcSet="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/fish-farms.jpg?rev=ce3ee402c72b464d9b1f8ae95fd3509a"
                            media="(min-width: 768px)"
                          />
                          <source
                            srcSet="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/fish-farms.jpg?rev=ce3ee402c72b464d9b1f8ae95fd3509a"
                            media="(max-width: 767px)"
                          />
                          <img alt="" />
                        </picture>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Chapter3"
                role="tabpanel"
                aria-labelledby="Chapter 3-tab"
              >
                <div className="article-block-fullcolumn enhanced">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="article-detail">
                        <span className="icon-for-article">
                          <img className="img-fluid" src="" alt="" />
                        </span>
                        <h2>Water and Climate Action</h2>
                        <p>
                          The trade sector stands as testament to how climate, nature and water
                          action are intertwined, each influencing the other. Water is not only
                          impacted by our changing climate, but can also present us with solutions
                          for building climate adaptation and resilience, preserving ecosystems, and
                          encouraging biodiversity.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-12 offset-0 offset-md-1">
                      <div className="article-img">
                        <picture
                          className="img-fluid lozad-picture"
                          data-iesrc="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/mangrove-plants.jpg?rev=084e35db10c743ef89465fe558c8352d"
                          data-loaded="true"
                        >
                          <source
                            srcSet="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/mangrove-plants.jpg?rev=084e35db10c743ef89465fe558c8352d"
                            media="(min-width: 768px)"
                          />
                          <source
                            srcSet="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/mangrove-plants.jpg?rev=084e35db10c743ef89465fe558c8352d"
                            media="(max-width: 767px)"
                          />
                          <img alt="" />
                        </picture>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Chapter4"
                role="tabpanel"
                aria-labelledby="Chapter 4-tab"
              >
                <div className="article-block-fullcolumn enhanced">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="article-detail">
                        <span className="icon-for-article">
                          <img className="img-fluid" src="" alt="" />
                        </span>
                        <h2>Water, Sanitation and Hygiene (WASH) </h2>
                        <p>
                          Water-related challenges possess the power to either stabilise or
                          destabilise peoples, often serving as a root cause for social disruption.
                          With extreme weather events on the rise due to climate change, communities
                          risk displacement and other threats to health. WASH facilities must be
                          improved in the regions most vulnerable to climate change to reinforce the
                          climate adaptation gap.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-12 offset-0 offset-md-1">
                      <div className="article-img">
                        <picture
                          className="img-fluid lozad-picture"
                          data-iesrc="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/water-pouring-out-of-a-pump.jpg?rev=1c703e694e7e46d2ae2e6ec49557020a"
                          data-loaded="true"
                        >
                          <source
                            srcSet="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/water-pouring-out-of-a-pump.jpg?rev=1c703e694e7e46d2ae2e6ec49557020a"
                            media="(min-width: 768px)"
                          />
                          <source
                            srcSet="https://dpwprod.azureedge.net/-/media/project/dpwg/dpwg-tenant/corporate/global/images/all-insights/whitepapers/water/water-pouring-out-of-a-pump.jpg?rev=1c703e694e7e46d2ae2e6ec49557020a"
                            media="(max-width: 767px)"
                          />
                          <img alt="" />
                        </picture>
                      </div>
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
