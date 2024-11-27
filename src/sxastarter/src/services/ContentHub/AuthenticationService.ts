import { CONTENTHUB_TOKEN_COOKIE_KEY } from './Constants';
import Cookies from 'universal-cookie';
import { Session } from 'next-auth';

export function SetTokensBySession(sessionData: Session) {
  if (sessionData) {
    if (sessionData?.user?.CHubToken) {
      const cookies = new Cookies();
      cookies.set(CONTENTHUB_TOKEN_COOKIE_KEY, sessionData?.user?.CHubToken, { path: '/' });
    }
  }
}

export async function Login(username: string, password: string): Promise<string> {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_name: username, password: password }),
  };
  const authenticateUrl = process.env.NEXT_PUBLIC_CONTENTHUB_DAM_URL + '/api/authenticate';
  const response = await fetch(authenticateUrl, requestOptions);
  const jsonResponse = await response.json();
  const token = jsonResponse?.token ?? '';
  if (token) {
    const cookies = new Cookies();
    cookies.set(CONTENTHUB_TOKEN_COOKIE_KEY, token, { path: '/' });
    return token;
  }

  return '';
}

export function Logout(): void {
  const cookies = new Cookies();
  cookies.remove(CONTENTHUB_TOKEN_COOKIE_KEY);
}
