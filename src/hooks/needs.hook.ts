import requestManager, { TStore } from '@/api';
import * as React from 'react';
import { useStoredValue } from './helper.hook';
import { NeedsActionTypes } from 'request-store-manager';

const useNeeds = (needs: Array<keyof TStore>) => {
  const [storedNeeds] = useStoredValue<Array<keyof TStore>>(needs);

  // const store = React.useSyncExternalStore(() => requestManager.subscribe(), () => requestManager.state);
  const store = React.useSyncExternalStore(requestManager.getModule('store').subscribe, () => requestManager.getModule('store').state);
  const state = React.useSyncExternalStore(
    requestManager.getModule('needs').subscribe,
    () => requestManager.getModule('needs').state,
  );

  React.useEffect(() => {
    storedNeeds.forEach(async (key) => {
      await requestManager.needAction(key, NeedsActionTypes.request);
      // TODO: add args
      //   if (Array.isArray(key)) {
      //     requestManager.needAction(...key);
      //   } else requestManager.needAction(key);
    });
  }, [storedNeeds]);

  return { store, state };
};

export default useNeeds;
