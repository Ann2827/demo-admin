import { useNeeds } from 'library-react-hooks';
import * as React from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { ROUTE_DASHBOARD } from '@/constants/routes';
import { LoaderComponent } from '@/components';

const ExcludeAuth: React.FC = () => {
  const location = useLocation();
  const { state } = useNeeds(['profile']);

  if (!state || state?.profile === null) {
    return (
      <Routes>
        <Route path='*' element={<LoaderComponent />} />
      </Routes>
    );
  }

  if (state?.profile === true) {
    return <Navigate to={ROUTE_DASHBOARD} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ExcludeAuth;
