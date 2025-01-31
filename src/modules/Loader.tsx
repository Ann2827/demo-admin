import * as React from 'react';
import { LoaderStore } from 'library-react-hooks';

import { LoaderComponent, LoaderComponentProps } from '@/components';

const Loader: React.FC<LoaderComponentProps> = (props) => {
  const { active } = React.useSyncExternalStore(LoaderStore.on, LoaderStore.st);

  if (!active) return null;

  return <LoaderComponent {...props} active={active} />;
};

export default Loader;
