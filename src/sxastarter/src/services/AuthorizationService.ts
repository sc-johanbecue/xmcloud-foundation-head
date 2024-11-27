import { Session } from 'next-auth';
import { PageItem } from './XMCloud/ItemService';

export function IsAuthenticated(
  requestedPageRoles: string[] | undefined,
  isUserSessionExisting: boolean
): boolean {
  // Get information if page is protected via roles
  const isProtected = (requestedPageRoles?.length ?? 0) > 0;
  // Check if user is currently authenticated
  const isUserAuthenticated = isUserSessionExisting;
  return (isProtected && isUserAuthenticated) || !isProtected;
}

export function isAuthorized(
  requestedPageRoles: string[] | undefined,
  currentUserRole: string | undefined | null
): boolean {
  // Get information if page is protected via roles
  const isProtected = (requestedPageRoles?.length ?? 0) > 0;
  // Check user roles if authenticated, if not Socal (Minimal Access level) as static string
  const sessionRole = currentUserRole ?? 'Social';
  // Determine if the role of the user is existing in the roles of the secured page
  const isRoleMatching = requestedPageRoles?.includes(sessionRole) ?? false;

  return (isProtected && isRoleMatching) || !isProtected;
}

export function IsVisibilityDateReached(requestedPageDate: Date | undefined) {
  // Add the case of visibility Date. Only show a page if the visibility date has been past
  // Note: Sitecore is UTC+0
  const now = new Date().getTime();

  return now >= (requestedPageDate?.getTime() ?? 0);
}

export function ShouldRender(page: PageItem, session: Session | null): boolean {
  return (
    IsVisibilityDateReached(page?.visibilityDate) &&
    isAuthorized(page?.roles, session?.user?.Role) &&
    IsAuthenticated(page?.roles, session != null) &&
    !page?.NavigationFilter?.includes('main')
  );
}
