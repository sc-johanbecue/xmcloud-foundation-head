import { SearchRequestModel } from 'src/shared/search/types/searchRequestModel';

export interface SearchResult {
  widgets: Widget[];
  dt: number;
  ts: number;
}

export interface Widget {
  rfk_id: string;
  type: string;
  entity: string;
  content: Content[];
  total_item: number;
  limit: number;
  offset: number;
}

export interface Content {
  id: string;
  name: string;
  source_id: string;
  type: string;
  url: string;
  body: string;
  image_url: string;
  description: string;
}

export async function Search(
  searchRequest: SearchRequestModel,
  endpointUrl: string
): Promise<SearchResult> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: process?.env?.NEXT_PUBLIC_SEARCH_APIKEY ?? '',
    },
    body: JSON.stringify(searchRequest),
  };

  const response = await fetch(endpointUrl ?? '', requestOptions);
  const jsonResponse = await response.json();
  const mappedResult: SearchResult = {
    widgets: jsonResponse.widgets
      ? jsonResponse.widgets.map((element: any) => {
          const contentElements = element.content
            ? element.content.map((innerElement: any) => {
                const contentElement: Content = {
                  id: innerElement.id,
                  name: innerElement.name,
                  source_id: innerElement.source_id,
                  type: innerElement.type,
                  url: innerElement.url,
                  body: innerElement.body,
                  description: innerElement.description,
                  image_url: innerElement.image_url,
                };

                return contentElement;
              })
            : null;

          const widget: Widget = {
            content: contentElements,
            entity: element.entity,
            limit: element.limit,
            offset: element.offset,
            rfk_id: element.rfk_id,
            total_item: element.total_item,
            type: element.type,
          };

          return widget;
        })
      : null,
    dt: jsonResponse.dt,
    ts: jsonResponse.ts,
  };

  return mappedResult;
}
