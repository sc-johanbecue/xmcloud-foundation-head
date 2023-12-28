import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

export declare type GetProductItemResult = {
  item: {
    id: string;
    productId: {
      jsonValue: {
        value: string;
      };
    };
    name: {
      jsonValue: {
        value: string;
      };
    };
    shortDescription: {
      jsonValue: {
        value: string;
      };
    };
    brand: {
      jsonValue: {
        value: string;
      };
    };
    price: {
      jsonValue: {
        value: string;
      };
    };
    oldPrice: {
      jsonValue: {
        value: string;
      };
    };
    testingEvaluation: {
      jsonValue: {
        value: string;
      };
    };
    pros: {
      jsonValue: {
        value: string;
      };
    };
    cons: {
      jsonValue: {
        value: string;
      };
    };
    new: {
      jsonValue: {
        value: boolean;
      };
    };
    image: {
      jsonValue: {
        value: {
          src: string;
          alt: string;
        };
      };
    };
    url: {
      path: string;
    };
  };
};

export async function GetProductItem(
  itemId: string,
  language: string
): Promise<GetProductItemResult | undefined> {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const ProductItemQuery = `query($datasource: String, $language: String!) { 
    item(path: $datasource, language: $language) {
      id
      url{path}
       productId: field (name:"ProductId"){
            jsonValue
          }      
         name: field(name:"Name"){
            jsonValue
          }
          image: field(name: "Image"){
            jsonValue
          }
          brand :field(name: "Brand"){
            jsonValue
          }
          price: field(name: "Price"){
            jsonValue
          }
          testingEvaluation: field(name: "TestingEvaluation"){
            jsonValue
          }
          pros: field(name: \"Pros\"){
            jsonValue
          }
          cons: field(name: "Cons"){
            jsonValue
          }
         oldPrice: field(name: "OldPrice"){
            jsonValue
          }
         new: field(name: "New"){
            jsonValue
          }
          shortDescription: field(name: "ShortDescription"){
            jsonValue
          }
    }
  }
  `;

  const result = await graphQLClient.request<GetProductItemResult>(ProductItemQuery, {
    language: language,
    datasource: itemId,
  });

  return result;
}
