import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';
import { getToken } from 'next-auth/jwt';
import { GetPageItem } from 'src/services/XMCloud/ItemService';
import { siteResolver } from 'lib/site-resolver';
import config from 'temp/config';
import {
  IsAuthenticated,
  IsVisibilityDateReached,
  isAuthorized,
} from 'src/services/AuthorizationService';
import { IsEditingHost } from 'src/services/Head/EnvironmentService';

class AuthorizationPlugin implements MiddlewarePlugin {
  order = 3;
  // TODO Make configurable via CMS
  notAuthorizedPage = '/Error-Pages/403';
  notAuthenticatedPage = '/Error-Pages/401';

  /**
   * exec async method - to find coincidence in url.pathname and redirects of site
   * @param req<NextRequest>
   * @returns Promise<NextResponse>
   */
  async exec(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    if (IsEditingHost()) {
      return res;
    }

    // Get current user if existing from Next-Auth
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Get context information
    const site = siteResolver.getByName(config.sitecoreSiteName);
    const currentPage = await GetPageItem(req.nextUrl.pathname, site.language, site.name);

    if (!currentPage) {
      return res;
    }

    // If user is not authenticated
    if (!IsAuthenticated(currentPage?.roles, session != null)) {
      return NextResponse.rewrite(new URL(this.notAuthenticatedPage, req.url));
    }

    // If user is authenticated but does not have the right role
    if (!isAuthorized(currentPage?.roles, session?.Role as string)) {
      //* Find some editor managed redirect
      // return NextResponse.redirect(new URL('/login', req.url));
      return NextResponse.rewrite(new URL(this.notAuthorizedPage, req.url));
    }

    // For the case an authenticated user wants to actively go to 401 page -> Redirect to start page
    const isNotAuthenticatedSite = req.url.includes(this.notAuthenticatedPage);
    if (isNotAuthenticatedSite && session != null) {
      return NextResponse.rewrite(new URL('/', req.url));
    }

    // If there is some visibility date set to restrict access before DateTime X
    if (!IsVisibilityDateReached(currentPage?.visibilityDate)) {
      return NextResponse.rewrite(new URL('/', req.url));
    }

    return res;
  }
}

export const authorizationPlugin = new AuthorizationPlugin();
