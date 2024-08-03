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

function isAuthenticated() {
  const isAuthenticated = (localStorage.getItem("access_token") !== "" && localStorage.getItem("access_token") !== null)
  return isAuthenticated;
}

function App() {
  return (
    <>
      <BrowserRouter>
        {isAuthenticated() === false &&
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
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
                  {/* <RouterProvider router={protectedRoutes} /> */}
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/configure" element={<Configuration />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        }
      </BrowserRouter>
    </>
  );
}


export default App;
