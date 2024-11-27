/* eslint-disable prettier/prettier */
import { ApiRole, CookieOptions } from 'ordercloud-javascript-sdk';

export interface OcConfig {
  clientId: string;
  adminClientId: string;
  adminClientSecret: string;
  adminUserName: string;
  adminPw: string;
  scope: ApiRole[];
  baseApiUrl?: string;
  allowAnonymous?: boolean;
  cookieOptions?: CookieOptions;
}

// DO not do that in production ;-)
const ocConfig: OcConfig = {
  clientId: process.env.NEXT_PUBLIC_OC_CLIENT_ID || 'CBEEDC64-A304-420F-97F8-D627F33EB3B6',
  adminClientId:
    process.env.NEXT_PUBLIC_OC_ADMIN_CLIENT_ID || '5888D70A-7342-4D7B-B509-CB58CFBCBCCD',
  adminClientSecret:
    process.env.NEXT_PUBLIC_OC_ADMIN_CLIENT_SECRET ||
    'o9Ovel5YAMXfWFIEpzHONt7ayE1LoCOwkwMWvpWobUKChQ85PLb204EkKRaQ',
  adminUserName: process.env.NEXT_PUBLIC_OC_ADMIN_USERNAME || 'christian-hahn1@gmx.net',
  adminPw: process.env.NEXT_PUBLIC_OC_ADMIN_PASSWORD || 'Sitecore1234',
  baseApiUrl: process.env.NEXT_PUBLIC_OC_API_URL || 'https://sandboxapi.ordercloud.io',
  scope: ['FullAccess', 'Shopper', 'MeAddressAdmin', 'MeAdmin', 'CategoryReader'] as ApiRole[],
  allowAnonymous: true,
  cookieOptions: undefined,
};

export default ocConfig;
