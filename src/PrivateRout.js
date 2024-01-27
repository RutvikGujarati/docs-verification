// import { Outlet, useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const PrivateRoute = (props) => {
//   const { Component } = props;
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the user is connected
//     const isConnected = localStorage.getItem('Connect') === 'true';

//     if (!isConnected) {
//       // Redirect to the Connect page if not connected
//       navigate('/Connect');
//     }
//   }, [navigate]);

//   return (
//     <div>
//       <Component />
//     </div>
//   );
// };

// export default PrivateRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";

function PrivateRoutes({ children }) {
  const address = useAddress();

  if (!address) {
    return <Navigate to="/Connect" state={{ from: useLocation() }} />;
  }

  return children;
}
export default PrivateRoutes;