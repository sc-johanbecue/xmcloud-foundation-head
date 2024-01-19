import { Me } from 'ordercloud-javascript-sdk';
import Cookies from 'universal-cookie';
import { CONTENTHUB_TOKEN_COOKIE_KEY } from './Constants';

export async function UploadMedia(file: any): Promise<number> {
  const cookies = new Cookies();
  const token = cookies.get(CONTENTHUB_TOKEN_COOKIE_KEY);
  const requestResponse = await Request(file, token);
  await Upload(requestResponse, file, token);
  const finalizeResponse = await Finalize(requestResponse, token);
  return finalizeResponse.asset_id;
}

interface RequestResponse {
  upload_identifier: string;
  file_identifier: string;
  upload_url: string;
}

interface UploadeResponse {
  success: boolean;
  message: string;
}

export interface FinalizeResponse {
  success: boolean;
  message: string;
  asset_id: number;
  asset_identifier: string;
}

export interface MediaSearchResponse {
  id: number;
  identifier: string;
  properties: MediaProperties;
  renditions: MediaRenditions;
}

export interface FileProperties {
  properties: {
    extension: string;
  };
}

export interface MediaProperties {
  FileName: string;
  Title: string;
  FileSize: number;
  FileProperties: FileProperties;
}

export interface MediaRenditions {
  downloadOriginal: Href[];
}

export interface Href {
  href: string;
}

async function Request(file: any, token: string): Promise<RequestResponse> {
  const requestUrl = process.env.NEXT_PUBLIC_CONTENTHUB_DAM_URL + '/api/v2.0/upload';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify({
      file_name: file.name,
      file_size: file.size,
      upload_configuration: { name: 'AssetUploadConfiguration' },
      action: { name: 'NewAsset' },
    }),
  };
  const response = await fetch(requestUrl, requestOptions);
  const jsonResponse = await response.json();
  const requestResponse: RequestResponse = {
    file_identifier: jsonResponse.file_identifier,
    upload_identifier: jsonResponse.upload_identifier,
    upload_url: response.headers.get('location') ?? '',
  };

  return requestResponse;
}

async function Upload(input: RequestResponse, file: any, token: string): Promise<UploadeResponse> {
  const requestUrl = input.upload_url;
  const data = new FormData();
  data.append('file', file, file.name);
  console.log(file);
  const requestOptions = {
    method: 'POST',
    headers: { 'x-auth-token': token },
    body: data,
  };
  const response = await fetch(requestUrl, requestOptions);
  const jsonResponse = await response.json();
  const uploadResponse: UploadeResponse = {
    message: jsonResponse.message,
    success: jsonResponse.success,
  };
  return uploadResponse;
}

async function Finalize(input: RequestResponse, token: string) {
  const requestUrl = process.env.NEXT_PUBLIC_CONTENTHUB_DAM_URL + '/api/v2.0/upload/finalize';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
    body: JSON.stringify({
      upload_identifier: input.upload_identifier,
      file_identifier: input.file_identifier,
    }),
  };
  const response = await fetch(requestUrl, requestOptions);
  const jsonResponse = await response.json();
  const uploadResponse: FinalizeResponse = {
    message: jsonResponse.message,
    success: jsonResponse.success,
    asset_id: jsonResponse.asset_id,
    asset_identifier: jsonResponse.asset_identifier,
  };
  return uploadResponse;
}

export async function GetAssetsFrom(): Promise<MediaSearchResponse[] | null> {
  const cookies = new Cookies();
  const token = cookies.get(CONTENTHUB_TOKEN_COOKIE_KEY);

  const me = await Me.Get();
  let requestUrl =
    process.env.NEXT_PUBLIC_CONTENTHUB_DAM_URL +
    "/api/entities/query?query=Definition.Name=='M.UserProfile' AND FullText=='" +
    me.Email +
    "'";
  let requestOptions = {
    method: 'GET',
    headers: { 'x-auth-token': token },
  };

  let response = await fetch(requestUrl, requestOptions);
  let jsonResponse = await response.json();

  const currentUserId = jsonResponse.items[0].id;
  const currentUser = Number(currentUserId) - 1;

  requestUrl =
    process.env.NEXT_PUBLIC_CONTENTHUB_DAM_URL +
    "/api/entities/query?query=Definition.Name=='M.Asset' AND CreatedBy==" +
    currentUser;

  requestOptions = {
    method: 'GET',
    headers: { 'x-auth-token': token },
  };

  try {
    response = await fetch(requestUrl, requestOptions);
    jsonResponse = await response.json();

    const mappedResponse = jsonResponse.items.map((element: any) => {
      const href: Href = {
        href: element.renditions?.downloadOriginal[0]?.href,
      };
      const hrefs: Href[] = [];
      hrefs.push(href);

      const renditions: MediaRenditions = {
        downloadOriginal: hrefs,
      };

      const fileProperties: FileProperties = {
        properties: {
          extension: element.properties?.FileProperties?.properties?.extension,
        },
      };
      const mediaProperties: MediaProperties = {
        FileName: element.properties?.FileName,
        FileProperties: fileProperties,
        FileSize: element.properties?.FileSize,
        Title: element.properties?.Title,
      };
      const mediaSearchResponse: MediaSearchResponse = {
        id: element.id,
        identifier: element.identifier,
        properties: mediaProperties,
        renditions: renditions,
      };

      return mediaSearchResponse;
    });

    return mappedResponse;
  } catch (Exception) {
    return null;
  }
}
