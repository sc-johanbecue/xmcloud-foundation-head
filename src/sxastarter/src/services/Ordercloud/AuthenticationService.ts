import { Configuration, Auth, Tokens, DecodedToken } from 'ordercloud-javascript-sdk';
import parseJwt from './utils/parseJwt';
import { Session } from 'next-auth';
import { GetComposedMe } from './AccountService';
import ocConfig from './constants/ordercloud-config';
import { IsOcActivated } from '../Head/FeatureStatusService';

export interface LoginActionRequest {
  username: string;
  password: string;
  remember?: boolean;
}

export interface OcAuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  decodedToken?: DecodedToken;
  isAnonymous: boolean;
  loading: boolean;
  initialized: boolean;
}

export function GetAuthenticationStatus(): OcAuthState {
  const initialAccessToken = Tokens.GetAccessToken();
  let isAnonymous = true;
  let isAdmin = false;
  let decodedToken: DecodedToken | undefined;

  if (initialAccessToken) {
    decodedToken = parseJwt(initialAccessToken) as DecodedToken;
    isAnonymous = !!decodedToken.orderid;
    isAdmin = decodedToken.usrtype === 'admin';
  }

  const result: OcAuthState = {
    isAuthenticated: !!initialAccessToken,
    isAnonymous: isAnonymous,
    isAdmin: isAdmin,
    decodedToken: decodedToken,
    initialized: true,
    loading: false,
  };

  return result;
}

export function SetConfiguration(): void {
  Configuration.Set({
    clientID: ocConfig.clientId,
    baseApiUrl: ocConfig.baseApiUrl,
  });
}

export async function AnonymousLogin(): Promise<void> {
  if (!IsOcActivated()) {
    return;
  }

  const composedMe = await GetComposedMe().catch(() => {
    return null;
  });
  const validToken = await Tokens.GetValidToken();
  if (!validToken || composedMe == null) {
    const response = await Auth.Anonymous(ocConfig.clientId, ocConfig.scope);
    Tokens.SetAccessToken(response.access_token);
    Tokens.SetRefreshToken(response.refresh_token);
  }
}

export function SetTokensBySession(sessionData: Session) {
  if (sessionData) {
    if (sessionData?.user?.OCToken) {
      Tokens.SetAccessToken(sessionData?.user?.OCToken);
    }
    if (sessionData?.user?.OCRefreshToken) {
      Tokens.SetRefreshToken(sessionData?.user?.OCRefreshToken);
    }
  }
}

export async function AdminLogin(): Promise<string> {
  const response = await Auth.ClientCredentials(
    ocConfig.adminClientSecret as string,
    ocConfig.adminClientId as string,
    ocConfig.scope
  ).catch();

  Tokens.SetAccessToken(response.access_token);
  return response?.access_token ?? '';
}

export async function Login(
  username: string,
  password: string,
  remember: boolean
): Promise<string> {
  const config = Configuration.Get();
  const composedMe = await GetComposedMe().catch(() => {
    return null;
  });
  if (composedMe?.Profile.Username == process?.env?.NEXT_PUBLIC_OC_ADMIN_USERNAME) {
    const validToken = await Tokens.GetValidToken();
    return validToken;
  }
  const response = await Auth.Login(
    username,
    password,
    config.clientID as string,
    ocConfig.scope
  ).catch();

  Tokens.SetAccessToken(response.access_token);
  if (remember && response.refresh_token) {
    Tokens.SetRefreshToken(response.refresh_token);
  }

  return response?.access_token ?? '';
}

export async function Logout(): Promise<void> {
  Tokens.RemoveAccessToken();
  Tokens.RemoveRefreshToken();

  if (ocConfig.allowAnonymous) {
    const response = await Auth.Anonymous(ocConfig.clientId, ocConfig.scope);
    Tokens.SetAccessToken(response.access_token);
    Tokens.SetRefreshToken(response.refresh_token);
  }
}
