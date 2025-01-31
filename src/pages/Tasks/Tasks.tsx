import { useNeeds } from 'library-react-hooks';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListItem, ListItemText, Paper } from '@mui/material';

import { PageContainer } from '@/modules';

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const { store } = useNeeds(['tasks']);

  return (
    <PageContainer title={t('Tasks')}>
      <List>
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
