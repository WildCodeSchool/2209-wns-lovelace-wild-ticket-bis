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
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { GoTrashcan } from 'react-icons/go';
import { IoQrCodeOutline, IoReaderOutline } from 'react-icons/io5';
import { addDashes } from 'utils';

const Navbar = (props: any) => {
  const appContext = useContext(AppContext);

  return (
    <ContainerNavbar>
      <ContainerLink>
        <StyledLink to={MES_FLUX_PATH}>
          <LogoLink src={FluIcon}></LogoLink>
          Mes Flux
        </StyledLink>
        <StyledLink to={TICKETS_PATH}>
          <IoReaderOutline size={40} />
          Tickets
        </StyledLink>
        <StyledLink to={QR_CODE_PATH}>
          <IoQrCodeOutline size={40} />
          QR code
        </StyledLink>
        <StyledLink to={CORBEILLE_PATH}>
          <GoTrashcan size={40} />
          Corbeille
        </StyledLink>
        <StyledLink
          to={`${QR_CODE_CLIENT_PATH}/${
            appContext && appContext.selectedFlow
              ? addDashes(appContext.selectedFlow.label)
              : null
          }`}
        >
          QR code client
        </StyledLink>
        <StyledLink to={TICKET_CLIENT_PATH}>Ticket client</StyledLink>
      </ContainerLink>
    </ContainerNavbar>
  );
};

export default Navbar;
