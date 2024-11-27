import { Login as OCLogin, Logout as OCLogout } from './Ordercloud/AuthenticationService';
import { Login as CHLogin, Logout as CHLogout } from './ContentHub/AuthenticationService';

export async function Login(
  username: string,
  password: string,
  remember: boolean
): Promise<boolean> {
  const ocLoginResponse = await OCLogin(username, password, remember);
  const chLoginResponse = await CHLogin(username, password);

  return ocLoginResponse || chLoginResponse ? true : false;
}

export async function Logout(): Promise<void> {
  await OCLogout();
  CHLogout();
}
