import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BreadcrumbItem, GetBreadcrumb } from 'src/services/XMCloud/NavigationService';

export function useBreadcrumb() {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { sitecoreContext } = useSitecoreContext();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    async function LoadBreadcrumb() {
      const loadedBreadcrumbModel = await GetBreadcrumb(
        sitecoreContext.itemId ?? '',
        sitecoreContext?.language ?? ''
      );
      if (loadedBreadcrumbModel) {
        setBreadcrumb(loadedBreadcrumbModel);
      }
      setIsLoading(false);
    }

    LoadBreadcrumb();
  }, [sitecoreContext, router]);
  return { isLoading, breadcrumb };
}
