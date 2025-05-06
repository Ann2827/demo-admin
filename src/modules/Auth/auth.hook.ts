import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE_DASHBOARD, ROUTE_MAIN } from '@/constants/routes';
import requestManager from '@/api';

export const useAuth = () => {
  const navigate = useNavigate();

  return {
    login: React.useCallback(
      async (props: { email: string; password: string }) => {
        const { validData } = await requestManager.namedRequest('postAuth', props);
        if (validData) navigate(ROUTE_DASHBOARD);
      },
      [navigate],
    ),
    logout: React.useCallback(() => {
      requestManager.restart();
      navigate(ROUTE_MAIN);
    }, [navigate]),
  };
};
