import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MyProfileQuery } from "../gql/graphql";
import { MainContainer } from "./App.styled";

import {
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  MES_FLUX_PATH,
  TICKETS_PATH,
  QR_CODE_PATH,
  CORBEILLE_PATH,
  QR_CODE_CLIENT_PATH,
  TICKET_CLIENT_PATH,
} from "../pages/paths";

import Logo from "../components/Logo/Logo";
import Navbar from "../components/Navbar/Navbar";

import QRCode from "../pages/QRCode/QRCode";
import QRCodeClient from "../pages/QRCodeClient/QRCodeClient";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import TicketClient from "../pages/TicketClient/TicketClient";
import Tickets from "../pages/Tickets/Tickets";
import Corbeille from "../pages/Corbeille/Corbeille";
import MesFlux from "../pages/MesFlux/MesFlux";

const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      emailAddress
    }
  }
`;

function App() {
  const { data, refetch } = useQuery<MyProfileQuery>(MY_PROFILE);
  const [isNavbarDisplayed, setIsNavbarDisplayed] = useState(true);
  const [isLogoDisplayed, setIsLogoDisplayed] = useState(false);
  const location = useLocation();

  const displayNavbar = (isItDisplayed: boolean) => {
    setIsNavbarDisplayed(isItDisplayed);
    isItDisplayed ? setIsLogoDisplayed(false) : setIsLogoDisplayed(true);
  };

  return (
    <>
      <MainContainer>
        {isNavbarDisplayed ? <Navbar /> : null}
        {isLogoDisplayed ? <Logo /> : null}
        <AnimatePresence>
          <Routes location={location} key={location.key}>
            <Route
              key="signUpKey"
              path={SIGN_UP_PATH}
              element={<SignUp displayNavbar={displayNavbar} />}
            />

            <Route
              key="signInKey"
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
      </MainContainer>
      <ToastContainer />
    </>
  );
}

export default App;

