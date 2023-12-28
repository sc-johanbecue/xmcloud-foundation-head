/* eslint-disable prettier/prettier */
import { ApiRole, CookieOptions } from 'ordercloud-javascript-sdk';

export interface OcConfig {
  clientId: string;
  scope: ApiRole[];
  baseApiUrl?: string;
  allowAnonymous?: boolean;
  cookieOptions?: CookieOptions;
}

const ocConfig: OcConfig = {
  clientId: process.env.NEXT_PUBLIC_OC_CLIENT_ID || 'CBEEDC64-A304-420F-97F8-D627F33EB3B6',
  baseApiUrl: process.env.NEXT_PUBLIC_OC_API_URL || 'https://sandboxapi.ordercloud.io',
  scope: ['FullAccess', 'Shopper', 'MeAddressAdmin', 'MeAdmin', 'CategoryReader'] as ApiRole[],
  allowAnonymous: true,
  cookieOptions: undefined,
};

export default ocConfig;
