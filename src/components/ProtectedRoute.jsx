
// // const ProtectedRoute = ({ children }) => {
// //   const { user } = useAuth();
// //   const location = useLocation(); // To get the current route
// //   if (!user) {
// //     // Redirect the user to the login page and store the current path in state
// //     return <Navigate to="/login" state={{ from: location }} />;
// //   }

// //   return children;
// // };
// // export default ProtectedRoute;


// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const ProtectedRoute = ({ roleComponents }) => {
//   const { user } = useAuth();
//   console.log(user);

//   const location = useLocation();
//   function isValidJSON(data) {
//     if (typeof data !== 'string') {
//       return false;
//     }
    
//     // Try to parse the JSON string
//     try {
//       JSON.parse(data);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }
  
  
//   // if (!user) {
//   //   return <Navigate to="/" state={{ from: location }} />;
//   // }

//   const temp = user?.substring(1,user?.length-1)
//   console.log(temp)
//   // console.log("admin")

//   // Check if the user's role has a corresponding component in roleComponents
//    const Component = roleComponents[temp];
//   //  const Component = roleComponents[user?.roleId ? user?.roleId : JSON.parse(user)?.roleId];

//   if (!Component) {
//     return <Navigate to="/not-authorized" />;
//   }


//   return Component;
// };

// export default ProtectedRoute;


import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ roleComponents }) => {
  const { user, loading } = useAuth(); // Get loading state
  const location = useLocation();

  if (loading) {
    // Render a loading spinner or placeholder while checking auth
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Parse the user role if it's a JSON string
  console.log(user)
  const userRole = user?.role;

  // Check if the user's role has a corresponding component in roleComponents
  const Component = roleComponents[userRole];

  if (!Component) {
    // Redirect to a "not authorized" page if the role is not allowed
    return <Navigate to="/not-authorized" />;
  }

  // Render the component for the user's role
  return Component;
};

export default ProtectedRoute;