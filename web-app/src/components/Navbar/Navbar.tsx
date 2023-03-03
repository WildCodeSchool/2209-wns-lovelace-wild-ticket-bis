import {
  CORBEILLE_PATH,
  MES_FLUX_PATH,
  QR_CODE_CLIENT_PATH,
  QR_CODE_PATH,
  TICKETS_PATH,
  TICKET_CLIENT_PATH,
} from '../../pages/paths';
import {
  ContainerLink,
  ContainerNavbar,
  LogoLink,
  StyledLink,
} from './Navbar.styled';
import FluIcon from '../../assets/Flu-icone.png';
import List from '../../assets/liste.png';
import QrcodeLogo from '../../assets/logoQrcode.png';
import Corbeille from '../../assets/corbeille.png';

const Navbar = (props: any) => {
  return (
    <ContainerNavbar>
      <ContainerLink>
        <StyledLink to={MES_FLUX_PATH}>
          <LogoLink src={FluIcon}></LogoLink>
          Mes Flux
        </StyledLink>
        <StyledLink to={TICKETS_PATH}>
          <LogoLink src={List}></LogoLink>
          Tickets
        </StyledLink>
        <StyledLink to={QR_CODE_PATH}>
          <LogoLink src={QrcodeLogo}></LogoLink>QR code
        </StyledLink>
        <StyledLink to={CORBEILLE_PATH}>
          <LogoLink src={Corbeille}></LogoLink>Corbeille
        </StyledLink>
        {/* Sujet a modification !!!*/}
        <StyledLink to={`${QR_CODE_CLIENT_PATH}/camion-vert`}>
          QR code client
        </StyledLink>
        <StyledLink to={TICKET_CLIENT_PATH}>Ticket client</StyledLink>
      </ContainerLink>
    </ContainerNavbar>
  );
};

export default Navbar;
