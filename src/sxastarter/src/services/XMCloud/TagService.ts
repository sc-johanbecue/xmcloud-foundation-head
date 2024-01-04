import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export declare type TagItem = {
  item: {
    id: string;
    title: {
      jsonValue: {
        value: string;
      };
    };
  };
};

export async function GetTagItem(itemId: string, language: string): Promise<TagItem | undefined> {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const TagItemQuery = `query($datasource: String, $language: String!) { 
    item(path: $datasource, language: $language) {
      id
      title: field (name:"Title"){
        jsonValue
      }      
    }
  }
  `;

  const result = await graphQLClient.request<TagItem>(TagItemQuery, {
    language: language,
    datasource: itemId,
  });

  return result;
}
