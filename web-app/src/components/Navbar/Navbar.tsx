import {
  CORBEILLE_PATH,
  MES_FLUX_PATH,
  QR_CODE_PATH,
  TICKETS_PATH,
} from '../../pages/paths';
import {
  ContainerLink,
  ContainerNavbar,
  LogoLink,
  StyledLink,
} from './Navbar.styled';
import FluIcon from '../../assets/Flu-icone.png';
import { GoTrashcan } from 'react-icons/go';
import { IoQrCodeOutline, IoReaderOutline } from 'react-icons/io5';
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
    switch (selectedState) {
      case SelectedState.MES_FLUX: {
        setSelectedTab(SelectedState.MES_FLUX);
        break;
      }
      case SelectedState.TICKETS: {
        setSelectedTab(SelectedState.TICKETS);
        break;
      }
      case SelectedState.QRCODE: {
        setSelectedTab(SelectedState.QRCODE);
        break;
      }
      case SelectedState.CORBEILLE: {
        setSelectedTab(SelectedState.CORBEILLE);
        break;
      }
      default:
        setSelectedTab(SelectedState.MES_FLUX);
        break;
    }
  };

  return (
    <ContainerNavbar>
      <ContainerLink>
        <StyledLink
          to={MES_FLUX_PATH}
          onClick={() => getSelectedTab(SelectedState.MES_FLUX)}
          active={selectedTab === SelectedState.MES_FLUX}
        >
          <LogoLink src={FluIcon}></LogoLink>
          Mes Flux
        </StyledLink>
        <StyledLink
          to={TICKETS_PATH}
          onClick={() => getSelectedTab(SelectedState.TICKETS)}
          active={selectedTab === SelectedState.TICKETS}
        >
          <IoReaderOutline size={40} />
          Tickets
        </StyledLink>
        <StyledLink
          to={QR_CODE_PATH}
          onClick={() => getSelectedTab(SelectedState.QRCODE)}
          active={selectedTab === SelectedState.QRCODE}
        >
          <IoQrCodeOutline size={40} />
          QR code
        </StyledLink>
        <StyledLink
          to={CORBEILLE_PATH}
          onClick={() => getSelectedTab(SelectedState.CORBEILLE)}
          active={selectedTab === SelectedState.CORBEILLE}
        >
          <GoTrashcan size={40} />
          Corbeille
        </StyledLink>
      </ContainerLink>
    </ContainerNavbar>
  );
};

export default Navbar;
