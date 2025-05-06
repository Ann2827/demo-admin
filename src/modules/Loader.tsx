import * as React from 'react';

import { LoaderComponent, LoaderComponentProps } from '@/components';
import requestManager from '@/api';

const Loader: React.FC<LoaderComponentProps> = (props) => {
  // TODO: не очень работает
  // const { active } = React.useSyncExternalStore(
  //   requestManager.connectLoader().subscribe,
  //   () => requestManager.connectLoader().state,
  // );

  const [active, setActive] = React.useState(requestManager.getModule('loader').state.active);
  React.useEffect(() => {
    return requestManager.getModule('loader').subscribe((state) => {
      setActive(state.active);
    });
  }, []);

  if (!active) return null;

  return <LoaderComponent {...props} active={active} />;
};

export default Loader;
