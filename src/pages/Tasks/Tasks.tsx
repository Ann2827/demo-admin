import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListItem, ListItemText, Paper } from '@mui/material';

import { PageContainer } from '@/modules';
import useNeeds from '@/hooks/needs.hook';

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const { store } = useNeeds(['tasks']);

  return (
    <PageContainer title={t('Tasks')}>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {store?.tasks?.map((item) => (
          <ListItem key={item.id} component={Paper} variant='outlined'>
            <ListItemText>{item.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </PageContainer>
  );
};

export default Tasks;
