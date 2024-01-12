import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { debounce } from '@sitecore-search/common';
import type { SearchResultsInitialState, SearchResultsStoreState } from '@sitecore-search/react';
import {
  WidgetDataType,
  useSearchResults,
  useSearchResultsSelectedFilters,
  widget,
} from '@sitecore-search/react';
import {
  AccordionFacets,
  ArticleCard,
  FacetItem,
  Pagination,
  Presence,
  SearchResultsAccordionFacets,
  Select,
  SortSelect,
} from '@sitecore-search/ui';

type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;
};
type ArticlesSearchResultsProps = {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
};
type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page' | 'sortType'>;
const buildRangeLabel = (min: number | undefined, max: number | undefined): string => {
  return typeof min === 'undefined'
    ? `< $${max}`
    : typeof max === 'undefined'
    ? ` > $${min}`
    : `$${min} - $${max}`;
};
const buildFacetLabel = (selectedFacet: any) => {
  if ('min' in selectedFacet || 'max' in selectedFacet) {
    return `${selectedFacet.facetLabel}: ${buildRangeLabel(selectedFacet.min, selectedFacet.max)}`;
  }
  return `${selectedFacet.facetLabel}: ${selectedFacet.valueLabel}`;
};
export const BasicSearchComponent = ({
  defaultSortType = 'featured_desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 24,
}: ArticlesSearchResultsProps) => {
  const {
    widgetRef,
    actions: {
      onKeyphraseChange,
      onResultsPerPageChange,
      onPageNumberChange,
      onRemoveFilter,
      onSortChange,
      onFacetClick,
      onClearFilters,
      onItemClick,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: { sortType, page, itemsPerPage },
    queryResult: {
      isFetching,
      isLoading,
      data: {
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
        content: articles = [],
      } = {},
    },
  } = useSearchResults<ArticleModel, InitialState>({
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: defaultKeyphrase,
    },
  });
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const keyphraseChangeFn = debounce((e) => {
    onKeyphraseChange({
      keyphrase: e.target.value,
    });
  }, 200);
  const selectedSortIndex = sortChoices.findIndex((s) => s.name === sortType);
  const selectedFacetsFromApi = useSearchResultsSelectedFilters();
  if (isLoading) {
    return (
      <div className="sitecore-loader-container">
        <Presence present={isLoading}>
          <svg
            aria-busy={isLoading}
            aria-hidden={!isLoading}
            focusable="false"
            role="progressbar"
            viewBox="0 0 20 20"
            className="sitecore-loader-animation"
          >
            <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
          </svg>
        </Presence>
      </div>
    );
  }
  return (
    <div ref={widgetRef} className="sitecore-wrapper">
      <div className="sitecore-input">
        <input onChange={(e) => keyphraseChangeFn(e)} />
        <MagnifyingGlassIcon />
      </div>
      <div className="sitecore-main-area">
        {isFetching && (
          <div className="sitecore-loader-container">
            <Presence present={true}>
              <svg
                aria-busy={true}
                aria-hidden={false}
                focusable="false"
                role="progressbar"
                viewBox="0 0 20 20"
                className="sitecore-loader-animation"
              >
                <path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z" />
              </svg>
            </Presence>
          </div>
        )}
        {totalItems > 0 && (
          <>
            <section className="sitecore-left-area">
              {selectedFacetsFromApi.length > 0 && (
                <button onClick={onClearFilters} className="sitecore-clear-filters">
                  Clear Filters
                </button>
              )}
              <ul className="sitecore-selected-filters-list">
                {selectedFacetsFromApi.map((selectedFacet) => (
                  <li
                    key={`${selectedFacet.facetId}${selectedFacet.facetLabel}${selectedFacet.valueLabel}`}
                    className="sitecore-selected-filters-list-item"
                  >
                    <span className="sitecore-selected-filters-list-item-text">
                      {buildFacetLabel(selectedFacet)}
                    </span>
                    <button
                      onClick={() => onRemoveFilter(selectedFacet)}
                      className="sitecore-selected-filters-list-item-button"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <SearchResultsAccordionFacets
                defaultFacetTypesExpandedList={[]}
                onFacetTypesExpandedListChange={() => {
                  [];
                }}
                onFacetValueClick={onFacetClick}
                className="sitecore-accordion-facets-root"
              >
                {facets.map((f) => (
                  <AccordionFacets.Facet
                    facetId={f.name}
                    key={f.name}
                    className="sitecore-accordion-facets-facet"
                  >
                    <AccordionFacets.Header className="sitecore-accordion-header">
                      <AccordionFacets.Trigger className="sitecore-accordion-trigger">
                        {f.label}
                      </AccordionFacets.Trigger>
                    </AccordionFacets.Header>
                    <AccordionFacets.Content>
                      <AccordionFacets.ValueList className="sitecore-accordion-value-list">
                        {f.value.map((v, index) => (
                          <FacetItem
                            {...{
                              index,
                              facetValueId: v.id,
                            }}
                            key={v.id}
                            className="sitecore-accordion-item"
                          >
                            <AccordionFacets.ItemCheckbox className="sitecore-accordion-item-checkbox">
                              <AccordionFacets.ItemCheckboxIndicator className="sitecore-accordion-item-checkbox-indicator">
                                <CheckIcon />
                              </AccordionFacets.ItemCheckboxIndicator>
                            </AccordionFacets.ItemCheckbox>
                            <AccordionFacets.ItemLabel className="sitecore-accordion-item-checkbox-label">
                              {v.text} {v.count && `(${v.count})`}
                            </AccordionFacets.ItemLabel>
                          </FacetItem>
                        ))}
                      </AccordionFacets.ValueList>
                    </AccordionFacets.Content>
                  </AccordionFacets.Facet>
                ))}
              </SearchResultsAccordionFacets>
            </section>
            <section className="sitecore-right-area">
              {/* Sort Select */}
              <section className="sitecore-right-top-area">
                {totalItems && (
                  <div className="sitecore-query-summary">
                    Showing {itemsPerPage * (page - 1) + 1} -{' '}
                    {itemsPerPage * (page - 1) + articles.length} of {totalItems} results
                  </div>
                )}
                <SortSelect.Root
                  defaultValue={sortChoices[selectedSortIndex]?.name}
                  onValueChange={onSortChange}
                >
                  <SortSelect.Trigger className="sitecore-sort-select-trigger">
                    <SortSelect.SelectValue className="sitecore-sort-select-value">
                      {selectedSortIndex > -1 ? sortChoices[selectedSortIndex].label : ''}
                    </SortSelect.SelectValue>
                    <SortSelect.Icon className="sitecore-sort-select-icon" />
                  </SortSelect.Trigger>
                  <SortSelect.Content className="sitecore-sort-select-content">
                    <SortSelect.Viewport className="sitecore-sort-select-viewport">
                      {sortChoices.map((option) => (
                        <SortSelect.Option
                          value={option}
                          key={option.name}
                          className="sitecore-sort-select-option"
                        >
                          <SortSelect.OptionText className="sitecore-sort-select-option-text">
                            {option.label}
                          </SortSelect.OptionText>
                        </SortSelect.Option>
                      ))}
                    </SortSelect.Viewport>
                  </SortSelect.Content>
                </SortSelect.Root>
              </section>

              {/* Results */}
              <div className="sitecore-grid">
                {articles.map((a, index) => (
                  <ArticleCard.Root
                    key={a.id}
                    article={a as ArticleModel}
                    className="sitecore-article-root"
                  >
                    <ArticleCard.Title className="sitecore-article-title">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onItemClick({
                            id: a.id,
                            index,
                            sourceId: a.source_id,
                          });
                        }}
                        className="sitecore-article-link"
                      >
                        {a.title || a.name}
                      </a>
                    </ArticleCard.Title>
                    <ArticleCard.Content className="sitecore-artice-content">
                      <ArticleCard.Image className="sitecore-article-image" />
                      {a.content_text}
                    </ArticleCard.Content>
                  </ArticleCard.Root>
                ))}
              </div>

              <div className="sitecore-page-controls">
                <div>
                  <label>Results Per Page</label>
                  <Select.Root
                    defaultValue={String(defaultItemsPerPage)}
                    onValueChange={(v) =>
                      onResultsPerPageChange({
                        numItems: Number(v),
                      })
                    }
                  >
                    <Select.Trigger className="sitecore-generic-select-trigger">
                      <Select.SelectValue className="sitecore-generic-select-value" />
                      <Select.Icon className="sitecore-generic-select-icon" />
                    </Select.Trigger>
                    <Select.SelectContent className="sitecore-generic-select-content">
                      <Select.Viewport className="sitecore-generic-select-viewport">
                        <Select.SelectItem value="24" className="sitecore-generic-select-option">
                          <SortSelect.OptionText className="sitecore-generic-select-option-text">
                            24
                          </SortSelect.OptionText>
                        </Select.SelectItem>

                        <Select.SelectItem value="48" className="sitecore-generic-select-option">
                          <SortSelect.OptionText className="sitecore-generic-select-option-text">
                            48
                          </SortSelect.OptionText>
                        </Select.SelectItem>

                        <Select.SelectItem value="64" className="sitecore-generic-select-option">
                          <SortSelect.OptionText className="sitecore-generic-select-option-text">
                            64
                          </SortSelect.OptionText>
                        </Select.SelectItem>
                      </Select.Viewport>
                    </Select.SelectContent>
                  </Select.Root>
                </div>
                <div>
                  <Pagination.Root
                    currentPage={page}
                    defaultCurrentPage={1}
                    totalPages={totalPages}
                    onPageChange={(v) =>
                      onPageNumberChange({
                        page: v,
                      })
                    }
                    className="sitecore-pagination-root"
                  >
                    <Pagination.PrevPage
                      onClick={(e) => e.preventDefault()}
                      className="sitecore-pagination-prev-page"
                    >
                      <ArrowLeftIcon />
                    </Pagination.PrevPage>
                    <Pagination.Pages className="sitecore-pagination-pages">
                      {(pagination) =>
                        Pagination.paginationLayout(pagination, {
                          boundaryCount: 1,
                          siblingCount: 1,
                        }).map(({ page, type }) =>
                          type === 'page' ? (
                            <Pagination.Page
                              key={page}
                              aria-label={`Page ${page}`}
                              page={page as number}
                              onClick={(e) => e.preventDefault()}
                              className="sitecore-pagination-page"
                            >
                              {page}
                            </Pagination.Page>
                          ) : (
                            <span key={type}>...</span>
                          )
                        )
                      }
                    </Pagination.Pages>
                    <Pagination.NextPage
                      onClick={(e) => e.preventDefault()}
                      className="sitecore-pagination-next-page"
                    >
                      <ArrowRightIcon />
                    </Pagination.NextPage>
                  </Pagination.Root>
                </div>
              </div>
            </section>
          </>
        )}
        {totalItems <= 0 && !isFetching && (
          <div className="sitecore-no-results">
            <h3>0 Results</h3>
          </div>
        )}
      </div>
    </div>
  );
};
const BasicSearchWidget = widget(BasicSearchComponent, WidgetDataType.SEARCH_RESULTS, 'content');
export default BasicSearchWidget;
