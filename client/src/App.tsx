import { Component } from 'react';

import './App.css';

import Dashboard from './pages/dashboard/Dashboard';
import Configuration from './pages/configuration/Configuration';
import LoginPage from './pages/login/login';

import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import SideBarMenu from './components/SideBarMenu';
import Header from './components/Header';
import { Container } from '@mui/material';


function isAuthenticated() {
  const isAuthenticated = (localStorage.getItem("access_token") !== "" && localStorage.getItem("access_token") !== null)
  return isAuthenticated;
}

function ProtectedRoute({ children }: { children: any }) {
  const authenticated = isAuthenticated()

  if (authenticated === false) {
    return (
      <Navigate to="/login" />
    );
  }

  return children;
}

const protectedRoutes = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  },
  {
    path: "/configure",
    element: <ProtectedRoute><Configuration /></ProtectedRoute>
  },
]);

const unprotectedRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
])


function App() {
  return (
    <>
      {isAuthenticated() === false &&
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      }

      {isAuthenticated() === true &&
        <div className="App">
          <Header></Header>

          <div style={{ display: 'flex', justifyContent: 'left', margin: "5px", marginBottom: "50px" }}>
            <div>
              <SideBarMenu></SideBarMenu>
            </div>
            <div style={{ width: "80%" }}>
              <div style={{ marginTop: "30px" }}>
                <RouterProvider router={protectedRoutes} />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );

  // return (
  // <Routes>
  //   <Route path="/login" element={<LoginPage />} />

  //   <Route
  //     path="/"
  //     element={
  //       <ProtectedRoute>
  //         <Dashboard />
  //       </ProtectedRoute>
  //     }
  //   />
  //   <Route
  //     path="/configure"
  //     element={
  //       <ProtectedRoute>
  //         <Configuration />
  //       </ProtectedRoute>
  //     }
  //   />
  // </Routes>
  // )
}


export default App;
