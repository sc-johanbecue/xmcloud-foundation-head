export declare type Asset = {
  id: string;
  title: string;
  tags: string[];
  previewUrl: string;
};

export declare type AssetsResponseModel = {
  data: {
    library: {
      id: string;
      name: string;
      type: string;
      assets: {
        items: Asset[];
      };
    };
  };
};

export async function SearchForAssets(query: string): Promise<Asset[]> {
  const headers = {
    'content-type': 'application/json',
    Authorization: process?.env?.NEXT_PUBLIC_FRONTIFY_TOKEN ?? '',
  };

  const requestBody = {
    query:
      `query LibraryAssets {
        library(id: "` +
      (process?.env?.NEXT_PUBLIC_FRONTIFY_LIBRARYID ?? '') +
      `") {
          id
          name
          type: __typename
          assets(page: 1, limit: 24, query: {search: "` +
      query +
      `"}) {
            total
            items {
              id
              title
              tags {
                value
              }
              ... on Image {
                previewUrl
              }
            }
          }
        }
      }
      `,
  };
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody),
  };
  const response = await (
    await fetch(process?.env?.NEXT_PUBLIC_FRONTIFY_URL ?? '', options)
  ).json();

  const assets: Asset[] = [];
  response?.data?.library?.assets?.items?.map((element) => {
    const asset: Asset = {
      id: element.id,
      previewUrl: element.previewUrl,
      tags: element.tags,
      title: element.title,
    };
    assets.push(asset);
  });

  return assets;
}
