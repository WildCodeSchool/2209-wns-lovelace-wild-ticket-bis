import { Link } from 'react-router-dom'
import {
  CORBEILLE_PATH,
  MES_FLUX_PATH,
  QR_CODE_CLIENT_PATH,
  QR_CODE_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
  TICKETS_PATH,
  TICKET_CLIENT_PATH,
} from '../../pages/paths'

const Navbar = () => {
  return (
    <>
      <Link to={SIGN_IN_PATH}>Se connecter</Link>
      <Link to={SIGN_UP_PATH}>S'inscrire</Link>
      <Link to={MES_FLUX_PATH}>Mes Flux</Link>
      <Link to={TICKETS_PATH}>Tickets</Link>
      <Link to={QR_CODE_PATH}>QR code</Link>
      <Link to={CORBEILLE_PATH}>Corbeille</Link>
      <Link to={QR_CODE_CLIENT_PATH}>QR code client</Link>
      <Link to={TICKET_CLIENT_PATH}>Ticket client</Link>
    </>
  )
}

export default Navbar
