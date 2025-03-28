import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Stack, Typography } from '@mui/material';
import { useNeeds } from 'library-react-hooks';

import { PageContainer } from '@/modules';

const Dashboard: React.FC = () => {
  const { store } = useNeeds(['posts', 'tasks']);
  const { t } = useTranslation();

  const overviewConfig = React.useMemo(
    () => [
      { title: t('Posts'), quantity: store?.posts?.length || 0 },
      { title: t('Tasks'), quantity: store?.tasks?.length || 0 },
    ],
    [t, store],
  );

  return (
    <PageContainer title={t('Dashboard')}>
      <Stack direction='row' gap={2}>
        {overviewConfig.map((item, id) => (
          <Paper key={id} variant='outlined'>
            <Stack direction='column' gap={2} p={2} minWidth='200px'>
              <Typography variant='h6'>{item.title}</Typography>
              <Typography variant='subtitle2' color='textPrimary' fontWeight={600} fontSize={18}>
                {item.quantity}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </PageContainer>
  );
};

export default Dashboard;
