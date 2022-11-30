import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar/Navbar'
import { MyProfileQuery } from '../gql/graphql'
import Corbeille from '../pages/Corbeille/Corbeille'
import MesFlux from '../pages/MesFlux/MesFlux'

import {
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  MES_FLUX_PATH,
  TICKETS_PATH,
  QR_CODE_PATH,
  CORBEILLE_PATH,
  QR_CODE_CLIENT_PATH,
  TICKET_CLIENT_PATH,
} from '../pages/paths'
import QRCode from '../pages/QRCode/QRCode'
import QRCodeClient from '../pages/QRCodeClient/QRCodeClient'
import SignIn from '../pages/SignIn/SignIn'
import SignUp from '../pages/SignUp/SignUp'
import TicketClient from '../pages/TicketClient/TicketClient'
import Tickets from '../pages/Tickets/Tickets'
import { MainContainer } from './App.styled'

const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      emailAddress
    }
  }
`

function App() {
  const { data, refetch } = useQuery<MyProfileQuery>(MY_PROFILE)

  return (
    <>
      <MainContainer>
      
        <Routes>
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={SIGN_IN_PATH} element={<SignIn onSuccess={refetch} />} />
          <Route path={MES_FLUX_PATH} element={<MesFlux />} />
          <Route path={TICKETS_PATH} element={<Tickets />} />
          <Route path={QR_CODE_PATH} element={<QRCode />} />
          <Route path={CORBEILLE_PATH} element={<Corbeille />} />
          <Route path={QR_CODE_CLIENT_PATH} element={<QRCodeClient />} />
          <Route path={TICKET_CLIENT_PATH} element={<TicketClient />} />
        </Routes>
      </MainContainer>
      <ToastContainer />
    </>
  )
}

export default App
