import * as React from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useNeeds } from 'library-react-hooks';

import { LoaderComponent } from '@/components';
import { ROUTE_LOGIN } from '@/constants/routes';

const RequireAuth: React.FC = () => {
  const location = useLocation();
  const { state } = useNeeds(['profile']);

  if (!state || state?.profile === null) {
    return (
      <Routes>
        <Route path='*' element={<LoaderComponent />} />
      </Routes>
    );
  }

  if (state?.profile === false) {
    return <Navigate to={ROUTE_LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
