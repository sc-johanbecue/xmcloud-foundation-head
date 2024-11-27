import config from 'temp/config';
import { IsAuthenticated, IsVisibilityDateReached, isAuthorized } from '../AuthorizationService';
import { JWT } from 'next-auth/jwt';

export interface PageItem {
  roles: string[];
  name: string;
  visibilityDate: Date;
  url?: string;
  title?: string;
  children?: PageItem[];
  template?: string;
  NavigationName?: string;
  NavigationFilter?: string[];
  Parents?: PageItem[];
}

export interface RoleItem {
  fields: {
    Name: {
      value: string;
    };
  };
}

// Some static variables
const sitecoreFallbackDate = '0001-01-01T00:00:00Z';
const dateMin = '1970-01-01Z00:00:00:000';

export async function GetPageItem(
  itemId: string,
  language: string,
  site: string
): Promise<PageItem | undefined> {
  const requestBody = {
    query: `query  
         GetPageItem($datasource: String!, $language: String!, $site: String!) { 
          layout(routePath:$datasource, language:$language, site:$site) {
            item{
              name
              id
              path
              fields(ownFields:false ){
                name
                jsonValue
              }
            }
        
          }
         }
       `,
    variables: {
      language: language,
      datasource: itemId,
      site: site,
    },
    operationName: 'GetPageItem',
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
  const pageItem = MapToPageItem(jsonResponse?.data?.layout?.item, 2, null, true);
  return pageItem;
}

export async function GetPageLayout(
  itemId: string,
  language: string,
  site: string
): Promise<string> {
  const requestBody = {
    query: `query  
           GetPageLayout($datasource: String!, $language: String!, $site: String!) { 
            layout(routePath:$datasource, language:$language, site:$site) {
              item{
                rendered
              }
              
            }
           }
         `,
    variables: {
      language: language,
      datasource: itemId,
      site: site,
    },
    operationName: 'GetPageLayout',
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
  return jsonResponse?.data?.layout?.item?.rendered;
}

export async function UpdateItem(
  itemId: string,
  language: string,
  field: string,
  value: string
): Promise<boolean> {
  const requestBody = {
    query: `mutation  
      UpdateWithExternalData($datasource: String!, $language: String!, $fieldName: String!, $fieldValue: String!) { 
        updateItem(
          input: {
            database: "master"
            language: $language
            path: $datasource
            fields: { name: $fieldName, value: $fieldValue}
          }
        ) {
          item {
            name
          }
        }
      }
 
    `,
    variables: {
      language: language,
      datasource: itemId,
      fieldName: field,
      fieldValue: value,
    },
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(requestBody),
  };
  await (await fetch(config.publicUrl + '/api/ManagementApi/executeCmGraphQuery', options)).json();
  return true;
}

//* Helper */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MapToPageItem(
  jsonResponse: any,
  level: number,
  token: JWT | null,
  overwriteSecurity: boolean
): PageItem | undefined {
  if (level > 2) {
    return undefined;
  }

  if (!jsonResponse) {
    return undefined;
  }

  const template = jsonResponse?.template?.name ?? '';
  if (template == 'Page Data' || template == 'Folder' || template == 'Data') {
    return undefined;
  }

  const itemFields = jsonResponse?.fields;

  const securityRoles = itemFields
    ?.filter((element) => {
      return element.name == 'Roles';
    })
    ?.at(0)
    ?.jsonValue?.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (element: any) => {
        return element.fields.Name.value;
      }
    );

  const rawVisibilityDate = itemFields
    ?.filter((element) => {
      return element.name == 'VisibilityDate';
    })
    ?.at(0)?.jsonValue?.value;

  const visibilityDate =
    rawVisibilityDate != sitecoreFallbackDate ? new Date(rawVisibilityDate) : new Date(dateMin);

  const navigationFilter = itemFields
    ?.filter((element) => {
      return element.name == 'NavigationFilter';
    })
    ?.at(0)
    ?.jsonValue?.map((element) => {
      return element?.fields?.Key?.value ?? '';
    });

  const title =
    jsonResponse?.title?.jsonValue?.value ??
    itemFields
      ?.filter((element) => {
        return element.name == 'Title';
      })
      ?.at(0)?.jsonValue?.value ??
    '';

  // Now the filtering based on session based data is done server side
  if (
    overwriteSecurity ||
    (IsVisibilityDateReached(visibilityDate) &&
      isAuthorized(securityRoles, token?.Role as string) &&
      IsAuthenticated(securityRoles, token != null) &&
      !navigationFilter?.includes('main'))
  ) {
  } else {
    return undefined;
  }

  // HACKY HACKY URL CONSTRUCTION -> Need to work better somehow
  // Graph QL delivers URL portion, but only if correctly configured in XMC -> if not null
  // If configured correctly you loose a fully wokring localhost ;-)
  const path = jsonResponse?.path as string;
  const targetRelativePathes = path?.replaceAll(' ', '-')?.split('/');
  const relPath = targetRelativePathes?.slice(6, targetRelativePathes.length)?.join('/');
  let targetUrl = '/' + relPath;

  const url = jsonResponse?.url?.path;
  if (url) {
    targetUrl = url;
  }
  //****/

  const pageItem: PageItem = {
    roles: securityRoles,
    name: jsonResponse?.name ?? '',
    visibilityDate: visibilityDate,
    title: title,
    url: targetUrl ?? '',
    NavigationName:
      itemFields
        ?.filter((element) => {
          return element.name == 'NavigationTitle';
        })
        ?.at(0)?.jsonValue?.value ?? jsonResponse?.name,
    children:
      level >= 2
        ? undefined
        : jsonResponse?.children?.results
            ?.map((element) => {
              const childPageItem = MapToPageItem(element, level + 1, token, overwriteSecurity);
              return childPageItem;
            })
            .filter((element) => {
              return element != undefined;
            }),
    template: template,
    NavigationFilter: navigationFilter,
    Parents: jsonResponse?.ancestors
      ?.map((element) => {
        const parent = MapToPageItem(element, level, token, overwriteSecurity);
        return parent;
      })
      .filter((element) => {
        return element != undefined;
      }),
  };

  return pageItem;
}
