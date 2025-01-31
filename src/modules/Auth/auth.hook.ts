import { CacheStore, HttpsStore, NeedsStore, ScenariosStore } from 'library-react-hooks';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE_DASHBOARD, ROUTE_MAIN } from '@/constants/routes';

export const useAuth = () => {
  const navigate = useNavigate();

  return {
    login: React.useCallback(
      async (props: { email: string; password: string }) => {
        const { dataJson, validation, response } = await HttpsStore.namedRequest('postAuth', props);
        ScenariosStore.after('postAuth');
        if (validation?.(dataJson, response)) navigate(ROUTE_DASHBOARD);
      },
      [navigate],
    ),
    logout: React.useCallback(() => {
      CacheStore.resetCache();
      NeedsStore.restart();
      HttpsStore.restart();
      navigate(ROUTE_MAIN);
    }, [navigate]),
  };
};
