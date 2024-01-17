import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

import type { PreviewSearchInitialState } from '@sitecore-search/react';
import { WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { Presence, PreviewSearch } from '@sitecore-search/ui';

import { ArticleCardStyled, LoaderAnimation, LoaderContainer, PreviewSearchStyled } from './styled';

type ArticleModel = {
  id: string;
  name: string;
  image_url: string;
  url: string;
  source_id?: string;
};

type InitialState = PreviewSearchInitialState<'itemsPerPage'>;

export const PreviewSearchBasicComponent = ({ defaultItemsPerPage = 6 }) => {
  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult,
    queryResult: { isFetching, isLoading },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
  });

  const loading = isLoading || isFetching;
  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      onKeyphraseChange({ keyphrase: target.value });
    },
    [onKeyphraseChange]
  );
  return (
    <PreviewSearchStyled.Root>
      <PreviewSearchStyled.Input
        onChange={keyphraseHandler}
        autoComplete="off"
        placeholder="Type to search..."
      />
      <PreviewSearchStyled.Content ref={widgetRef}>
        <Presence present={loading}>
          <LoaderContainer>
            <LoaderAnimation
              aria-busy={loading}
              aria-hidden={!loading}
              focusable="false"
              role="progressbar"
              viewBox="0 0 20 20"
            >
              <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
            </LoaderAnimation>
          </LoaderContainer>
        </Presence>
        <Presence present={!loading}>
          <PreviewSearch.Results defaultQueryResult={queryResult}>
            {({ isFetching: loading, data: { content: articles = [] } = {} }) => (
              <PreviewSearchStyled.Items data-loading={loading}>
                <Presence present={loading}>
                  <LoaderContainer>
                    <LoaderAnimation
                      aria-busy={loading}
                      aria-hidden={!loading}
                      focusable="false"
                      role="progressbar"
                      viewBox="0 0 20 20"
                    >
                      <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
                    </LoaderAnimation>
                  </LoaderContainer>
                </Presence>
                {!loading &&
                  articles.map((article, index) => (
                    <PreviewSearchStyled.Item key={article.id} asChild>
                      <PreviewSearchStyled.Link
                        href={article.url}
                        onClick={(e) => {
                          e.preventDefault();
                          onItemClick({ id: article.id, index, sourceId: article.source_id });
                          // add redirection or any action
                        }}
                      >
                        <ArticleCardStyled.Root>
                          <ArticleCardStyled.ImageWrapper>
                            <ArticleCardStyled.Image src={article.image_url} />
                          </ArticleCardStyled.ImageWrapper>
                          <ArticleCardStyled.Name>{article.name}</ArticleCardStyled.Name>
                        </ArticleCardStyled.Root>
                      </PreviewSearchStyled.Link>
                    </PreviewSearchStyled.Item>
                  ))}
              </PreviewSearchStyled.Items>
            )}
          </PreviewSearch.Results>
        </Presence>
      </PreviewSearchStyled.Content>
    </PreviewSearchStyled.Root>
  );
};
const MyPreviewSearch = widget(
  PreviewSearchBasicComponent,
  WidgetDataType.PREVIEW_SEARCH,
  'content'
);
export default MyPreviewSearch;
