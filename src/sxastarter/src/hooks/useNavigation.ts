import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { PageItem } from 'src/services/XMCloud/ItemService';
import { GetNavigation } from 'src/services/XMCloud/NavigationService';

export function useNavigation(root: string, language: string) {
  const [navigation, setNavigation] = useState<PageItem | undefined>(undefined);
  const { data: session } = useSession();

  useEffect(() => {
    async function LoadNavigation() {
      const loadedNavigationModel = await GetNavigation(root ?? '', language ?? '');
      setNavigation(loadedNavigationModel);
    }

    LoadNavigation();
  }, [root, language, session]);
  return navigation;
}
