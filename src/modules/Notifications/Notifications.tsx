import * as React from 'react';
import cn from 'classnames';
import { useNotifications } from 'library-react-hooks';
import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle } from '@mui/material';

import { NotificationsProps } from './Notifications.types';
import styles from './Notifications.module.scss';

// For test notification view
// NotificationsStore.send({ data: { title: 'My title', text: 'Descr' } });

const Notifications: React.FC<NotificationsProps> = ({ className }) => {
  const { notifications, drop } = useNotifications();
  const { t } = useTranslation();

  const notificationsClass = cn(styles.notifications, className);

  return (
    <div className={notificationsClass}>
      {notifications.map((item) => (
        <Alert
          key={item.id}
          severity={item.type}
          onClose={() => {
            drop(item.id);
          }}
        >
          {item.data?.title && (
            <AlertTitle>{t(item.data?.title || '', { errorCode: item.response?.status || '' })}</AlertTitle>
          )}
          {item.data?.text ? t(item.data.text) : null}
          {item.dataJson?.message?.toString() || null}
        </Alert>
      ))}
    </div>
  );
};

export default Notifications;
