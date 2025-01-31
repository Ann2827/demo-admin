import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { Stack } from '@mui/material';

import { routes } from '@/navigation/routes';
import { Loader, Notifications } from '@/modules';

const App: React.FC = () => {
  const element = useRoutes(routes);
  return (
    <Stack width='100%' sx={(theme) => ({ bgcolor: theme.palette.background.default })}>
      <Loader />
      <Notifications />
      {element}
    </Stack>
  );
};

export default App;
