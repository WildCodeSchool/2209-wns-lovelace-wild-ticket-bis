import React, { useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppContainer } from './App.styled';

import Navbar from '../components/Navbar/Navbar';
import QRCode from '../pages/QRCode/QRCode';
import QRCodeClient from '../pages/QRCodeClient/QRCodeClient';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Tickets from '../pages/Tickets/Tickets';
import Corbeille from '../pages/Corbeille/Corbeille';
import MesFlux from '../pages/MesFlux/MesFlux';
import Header from '../components/Header/Header';

import {
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  MES_FLUX_PATH,
  TICKETS_PATH,
  QR_CODE_PATH,
  CORBEILLE_PATH,
  QR_CODE_CLIENT_PATH,
  TICKET_CLIENT_PATH,
} from '../pages/paths';
import ProtectedRoutes from 'components/layout/ProtectedRoutes';
import DashboardLayout from 'components/layout/DashboardLayout';
import { AppContext } from 'context/AppContext';
import Logo from 'components/Logo/Logo';
import PagesClient from '../pages/PagesClient/PagesClient';

function App() {
  const [isNavbarDisplayed, setIsNavbarDisplayed] = useState(true);
  const location = useLocation();
  const appContext = useContext(AppContext);

  const displayNavbar = (isItDisplayed: boolean) => {
    setIsNavbarDisplayed(isItDisplayed);
  };

  return (
    <>
      <AppContainer className={isNavbarDisplayed ? 'yes' : 'no'}>
        {isNavbarDisplayed ? (
          <Logo isNavbarDisplayed={isNavbarDisplayed} />
        ) : null}
        {isNavbarDisplayed ? (
          <Header isLogoDisplayed={isNavbarDisplayed} />
        ) : null}
        {isNavbarDisplayed ? <Navbar /> : null}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route
              path={SIGN_UP_PATH}
              element={<SignUp displayNavbar={displayNavbar} />}
            />

            <Route
              path={SIGN_IN_PATH}
              element={<SignIn displayNavbar={displayNavbar} />}
            />
            <Route path={MES_FLUX_PATH} element={<MesFlux />} />
            <Route path={TICKETS_PATH} element={<Tickets />} />
            <Route path={QR_CODE_PATH} element={<QRCode />} />
            <Route path={CORBEILLE_PATH} element={<Corbeille />} />
            <Route
              path={`${QR_CODE_CLIENT_PATH}/:flowName`}
              element={<QRCodeClient displayNavbar={displayNavbar} />}
            />
            {appContext?.userProfile && (
              <Route
                element={
                  <ProtectedRoutes user={appContext?.userProfile}>
                    <DashboardLayout />
                  </ProtectedRoutes>
                }
              />
            )}
            <Route
              path={`${TICKET_CLIENT_PATH}/:id`}
              element={<PagesClient displayNavbar={displayNavbar} />}
            />
          </Routes>
        </AnimatePresence>
      </AppContainer>

      <ToastContainer />
    </>
  );
}

export default App;
