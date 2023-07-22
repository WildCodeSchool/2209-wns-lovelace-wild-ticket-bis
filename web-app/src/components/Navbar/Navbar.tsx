import {
  CORBEILLE_PATH,
  MES_FLUX_PATH,
  QR_CODE_PATH,
  TICKETS_PATH,
} from '../../pages/paths';
import {
  ContainerLink,
  ContainerNavbar,
  GoTrashcanIcon,
  IoQrCodeOutlineIcon,
  IoReaderOutlineIcon,
  LogoLink,
  StyledLink,
} from './Navbar.styled';
import FluIcon from '../../assets/Flu-icone.png';
import { useState } from 'react';

const Navbar = () => {
  const enum SelectedState {
    'MES_FLUX',
    'TICKETS',
    'QRCODE',
    'CORBEILLE',
  }

  const [selectedTab, setSelectedTab] = useState(SelectedState.MES_FLUX);

  const getSelectedTab = (selectedState: SelectedState) => {
    setSelectedTab(selectedState);
  };

  return (
    <ContainerNavbar>
      <ContainerLink>
        <StyledLink
          to={MES_FLUX_PATH}
          onClick={() => getSelectedTab(SelectedState.MES_FLUX)}
          active={selectedTab === SelectedState.MES_FLUX ? 1 : 0}
        >
          <LogoLink src={FluIcon}></LogoLink>
          Mes Flux
        </StyledLink>
        <StyledLink
          to={TICKETS_PATH}
          onClick={() => getSelectedTab(SelectedState.TICKETS)}
          active={selectedTab === SelectedState.TICKETS ? 1 : 0}
        >
          <IoReaderOutlineIcon />
          Tickets
        </StyledLink>
        <StyledLink
          to={QR_CODE_PATH}
          onClick={() => getSelectedTab(SelectedState.QRCODE)}
          active={selectedTab === SelectedState.QRCODE ? 1 : 0}
        >
          <IoQrCodeOutlineIcon />
          QR code
        </StyledLink>
        <StyledLink
          to={CORBEILLE_PATH}
          onClick={() => getSelectedTab(SelectedState.CORBEILLE)}
          active={selectedTab === SelectedState.CORBEILLE ? 1 : 0}
        >
          <GoTrashcanIcon />
          Corbeille
        </StyledLink>
      </ContainerLink>
    </ContainerNavbar>
  );
};

export default Navbar;
