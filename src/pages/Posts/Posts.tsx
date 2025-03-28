import { useNeeds } from 'library-react-hooks';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListItem, ListItemText, Paper } from '@mui/material';

import { PageContainer } from '@/modules';

const Posts: React.FC = () => {
  const { t } = useTranslation();
  const { store } = useNeeds(['posts']);

  return (
    <PageContainer title={t('Posts')}>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {store?.posts?.map((item) => (
          <ListItem key={item.id} component={Paper} variant='outlined'>
            <ListItemText>{item.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </PageContainer>
  );
};

export default Posts;
