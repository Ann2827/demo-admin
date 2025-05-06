import * as React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle } from '@mui/material';

import { NotificationsProps } from './Notifications.types';
import styles from './Notifications.module.scss';
import requestManager from '@/api';

// For test notification view
// requestManager.sendNotification({ data: { title: 'My title', text: 'Descr' } });

const Notifications: React.FC<NotificationsProps> = ({ className }) => {
  const notifications = React.useSyncExternalStore(
    requestManager.connectNotifications().subscribe,
    () => requestManager.connectNotifications().state,
  );
  const { t } = useTranslation();

  const notificationsClass = cn(styles.notifications, className);

  return (
    <div className={notificationsClass}>
      {notifications.map((item) => (
        <Alert
          key={item.id}
          severity={item.type}
          onClose={item.drop}
        >
          {item.data?.title && (
            <AlertTitle>{t(item.data?.title || '', { errorCode: item.response?.status || '' })}</AlertTitle>
          )}
          {item.data?.text ? t(item.data.text) : null}
          {/* {item.dataJson?.message?.toString() || null} */}
        </Alert>
      ))}
    </div>
  );
};

export default Notifications;
