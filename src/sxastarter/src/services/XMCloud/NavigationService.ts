import { JWT } from 'next-auth/jwt';
import { IsEditingHost } from '../Head/EnvironmentService';
import { MapToPageItem, PageItem } from './ItemService';
import config from 'temp/config';
import { BreadcrumbItem } from '@chakra-ui/react';

export interface BreadcrumbItem {
  url: string;
  title: string;
}

export async function GetNavigation(root: string, language: string): Promise<PageItem | undefined> {
  const requestBody = {
    language: language,
    root: root,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(
    (IsEditingHost() ? config.publicUrl : '') + '/api/Delivery/getNavigation',
    options
  );
  const jsonResponse = await response.json();
  return jsonResponse as PageItem;
}

export async function GetBreadcrumb(
  root: string,
  language: string
): Promise<BreadcrumbItem[] | undefined> {
  const requestBody = {
    language: language,
    root: root,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(requestBody),
  };

  const response = await fetch(
    (IsEditingHost() ? config.publicUrl : '') + '/api/Delivery/getBreadcrumb',
    options
  );
  const jsonResponse = await response.json();
  const pageItemBasedBreadcrumb = jsonResponse as PageItem;
  return BuildBreadcrumb(pageItemBasedBreadcrumb);
}

function BuildBreadcrumb(item: PageItem): BreadcrumbItem[] {
  const paths = window.location.pathname.split('/');
  let targetTitle = item?.title ?? '';
  let targetUrl = item?.url ?? '';
  if (targetUrl.includes(',-w-,')) {
    const dynamicUrl = paths.join('/');
    targetUrl = dynamicUrl;
    targetTitle = paths[paths.length - 1].replace('-', ' ');
  }

  paths.pop();
  const breadcrumbItems: BreadcrumbItem[] = [];
  const entry: BreadcrumbItem = {
    title: targetTitle,
    url: targetUrl,
  };
  breadcrumbItems.push(entry);
  item?.Parents?.map((parent) => {
    let targetTitle = parent?.title ?? '';
    let targetUrl = parent?.url ?? '';
    if (targetUrl.includes(',-w-,')) {
      const dynamicUrl = paths.join('/');
      targetUrl = dynamicUrl;
      targetTitle = paths[paths.length - 1].replace('-', ' ');
    }
    if (paths[paths.length - 1].toLowerCase() != 'products') {
      const entry: BreadcrumbItem = {
        title: targetTitle,
        url: targetUrl,
      };
      breadcrumbItems.push(entry);
      paths.pop();
    }
  });

  return breadcrumbItems.reverse();
}

export async function LoadNavigation(
  root: string,
  language: string,
  token: JWT | null
): Promise<PageItem | undefined> {
  const fragment = `fragment MyItem on Item {
      template {
        name
        id
      }
      fields(ownFields:false ){
        name
        jsonValue
      }
      name
      url {
        url
        path
      }
      path
    }
   `;
  const requestBody = {
    query: `${fragment}
          query  
           GetNavigation($datasource: String!, $language: String!) { 
            item(path:$datasource, language:$language) {
              ...MyItem
              children {
                results {
                  ...MyItem
                  children {
                    results {
                      ...MyItem
                    }
                  }
                }
              }
            }
          }
         `,
    variables: {
      language: language,
      datasource: root,
    },
    operationName: 'GetNavigation',
  };

  const response = await fetch(config.graphQLEndpoint ?? '', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      sc_apikey: config.sitecoreApiKey,
    },
    body: JSON.stringify(requestBody),
  });

  const jsonResponse = await response.json();
  const pageItem = MapToPageItem(jsonResponse?.data?.item, 0, token, false);

  // Again some hackyness for getting the right url for wildcard product / category and catalog pages
  if (typeof window !== 'undefined' && pageItem) {
    pageItem.url = location.origin + pageItem?.url;
    pageItem.children?.map((element) => {
      element.url = location.origin + element?.url;
      element.children?.map((innerElement) => {
        innerElement.url = location.origin + innerElement?.url;
      });
    });
  }

  return pageItem;
}

export async function LoadBreadcrumb(
  root: string,
  language: string
): Promise<PageItem | undefined> {
  const fragment = `fragment breadcrumbFields on Item {
    title: field(name: "NavigationTitle") {
        jsonValue
      }
    url {
        path
    }
    }
    `;
  const requestBody = {
    query: `${fragment}
        query 
        GetBreadcrumb($datasource: String!, $language: String!){
            # Assume the item id is available on the page
            item(path: $datasource, language: $language) {
            ...breadcrumbFields
            ancestors(
                hasLayout: true
            ) {
                ...breadcrumbFields
            }
        }
        
    }`,
    variables: {
      language: language,
      datasource: root,
    },
    operationName: 'GetBreadcrumb',
  };

  const response = await fetch(config.graphQLEndpoint ?? '', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      sc_apikey: config.sitecoreApiKey,
    },
    body: JSON.stringify(requestBody),
  });

  const jsonResponse = await response.json();
  const pageItem = MapToPageItem(jsonResponse?.data?.item, 0, null, true);
  return pageItem;
}
