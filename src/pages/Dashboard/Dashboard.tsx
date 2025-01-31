import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { PageContainer } from '@/modules';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return <PageContainer title={t('Dashboard')}>Dashboard</PageContainer>;
};

export default Dashboard;
