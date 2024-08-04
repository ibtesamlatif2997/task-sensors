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
          <div style={{width: window.innerWidth}} className="App">
            <Header></Header>

            <div style={{ display: 'flex', justifyContent: 'left', marginBottom: "50px", marginTop: "2px" }}>
              <div style={{ backgroundColor: "#5d06ba" }}>
                <SideBarMenu></SideBarMenu>
              </div>
              <Container style={{ padding: "10px" }}>
                <Container style={{ marginTop: "30px" }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/configure" element={<Configuration />} />
                  </Routes>
                </Container>
              </Container>
            </div>
          </div>
        }
      </BrowserRouter>
    </>
  );
}


export default App;
