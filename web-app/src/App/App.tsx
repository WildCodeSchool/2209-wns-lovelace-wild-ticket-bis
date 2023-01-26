import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { MyprofileQuery } from '../gql/graphql';

import Navbar from '../components/Navbar/Navbar';
import QRCode from '../pages/QRCode/QRCode';
import QRCodeClient from '../pages/QRCodeClient/QRCodeClient';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import TicketClient from '../pages/TicketClient/TicketClient';
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
import { AppContainer } from './App.styled';
import ButtonContainer from 'components/ButtonContainer/ButtonContainer';

const MY_PROFILE = gql`
  query Myprofile {
    myProfile {
      id
      firstName
      flows {
        flowName
        id
        tickets {
          orderNumber
        }
      }
    }
  }
`;

function App() {
  const { data, refetch } = useQuery<MyprofileQuery>(MY_PROFILE);
  const [isNavbarDisplayed, setIsNavbarDisplayed] = useState(true);
  const location = useLocation();

  const displayNavbar = (isItDisplayed: boolean) => {
    setIsNavbarDisplayed(isItDisplayed);
  };
  console.log(data);
  return (
    <>
      <AppContainer >
        {isNavbarDisplayed ? <Header data={data} /> : null}
        {isNavbarDisplayed ? <Navbar /> : null}
        {isNavbarDisplayed ? <ButtonContainer data={data} /> : null}
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.key}>
            <Route
              path={SIGN_UP_PATH}
              element={<SignUp displayNavbar={displayNavbar} />}
            />

            <Route
              path={SIGN_IN_PATH}
              element={
                <SignIn displayNavbar={displayNavbar} onSuccess={refetch} />
              }
            />
            <Route path={MES_FLUX_PATH} element={<MesFlux />} />
            <Route path={TICKETS_PATH} element={<Tickets />} />
            <Route path={QR_CODE_PATH} element={<QRCode />} />
            <Route path={CORBEILLE_PATH} element={<Corbeille />} />
            <Route path={QR_CODE_CLIENT_PATH} element={<QRCodeClient />} />
            <Route path={TICKET_CLIENT_PATH} element={<TicketClient />} />
          </Routes>
        </AnimatePresence>
      </AppContainer>
      <ToastContainer />
    </>
  );
}

export default App;
