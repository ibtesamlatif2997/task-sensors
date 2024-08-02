import './App.css';

import Dashboard from './pages/dashboard/Dashboard';
import Configuration from './pages/configuration/Configuration';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SideBarMenu from './components/SideBarMenu';
import Header from './components/Header';
import { Container } from '@mui/material';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/configure",
    element: <Configuration />
  },
]);


function App() {
  return (
    <div className="App">
      <Header></Header>

      <div style={{ display: 'flex', justifyContent: 'left', margin: "5px", marginBottom: "50px" }}>
        <div>
          <SideBarMenu></SideBarMenu>
        </div>
        <div style={{ width: "80%" }}>
          <div style={{ marginTop: "30px" }}>
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
