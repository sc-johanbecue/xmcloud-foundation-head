import React from 'react';
import {
  NextImage as JssImage,
  RichText as JssRichText,
  ImageField,
  Field,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  IsAuthenticated,
  IsVisibilityDateReached,
  isAuthorized,
} from 'src/services/AuthorizationService';
import { useSession } from 'next-auth/react';
import { RoleItem } from 'src/services/XMCloud/ItemService';

interface Fields {
  Title: Field<string>;
  Content: Field<string>;
  Tag: {
    fields: {
      Title: {
        value: string;
      };
    };
  };
  PublicationDate: Field<string>;
  VisibilityDate: Field<string>;
  Roles: {
    jsonValue: RoleItem[];
  };
  Image: ImageField;
  Url: string;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const NewsTeaserDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">News Teaser</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  const { data: session } = useSession();

  const visibilityDate = new Date(props.fields.VisibilityDate.value);
  const isVisibilityDateReached = IsVisibilityDateReached(visibilityDate);

  if (!isVisibilityDateReached) {
    return <></>;
  }

  const newsPageRoles =
    props.fields.Roles?.jsonValue?.map((element) => {
      return element.fields?.Name?.value;
    }) ?? undefined;

  if (!IsAuthenticated(newsPageRoles, session != null)) {
    return <></>;
  }

  if (!isAuthorized(newsPageRoles, session?.user?.Role)) {
    return <></>;
  }

  const publicationDate = new Date(props.fields.PublicationDate.value);
  if (props.fields) {
    return (
      <>
        <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
          <div className="component-content">
            <div className="field-promoicon">
              <JssImage field={props.fields.Image} />
            </div>
            <div className="promo-text">
              <h2>
                <Text field={props.fields.Title} />
              </h2>
              <div>
                <Text field={props.fields.Tag.fields.Title} className="title-field-tag" />
              </div>
              <div>{publicationDate.toLocaleDateString()}</div>
              <JssRichText field={props.fields.Content} />
              <div className="field-promolink">
                <a href={props.fields.Url}>DETAILS</a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <NewsTeaserDefaultComponent {...props} />;
};

export const Layered = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const publicationDate = new Date(props.fields.PublicationDate.value);
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <a href={props.fields.Url} className="news-teaser-link">
            <JssImage field={props.fields.Image} className="news-teaser-background-image" />
            <div className="news-teaser-text">
              <div className="news-teaser-date">{publicationDate.toLocaleDateString()}</div>
              <div className="news-teaser-tag">
                <Text fields={props.fields.Tag.fields.Title.value} />
              </div>
              <div className="news-teaser-title">
                <h2>
                  <Text fields={props.fields.Title.value} className="title-field-tag" />
                </h2>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }

  return <NewsTeaserDefaultComponent {...props} />;
};
