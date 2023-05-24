import { useEffect } from 'react';
import {
  ContainerLogoLarge,
  ContainerQrCodeClient,
  LeftSideQrCodeClient,
  LogoLarge,
  RightSideQrCodeClient,
} from './QrCodeClient.styled';
import logoLarge from '../../assets/logo_flu_large.png';
import { PropsDisplayNavbar } from 'utils';

const QRCodeClient = ({ displayNavbar }: PropsDisplayNavbar) => {
  useEffect(() => {
    displayNavbar(false);
    return () => {
      displayNavbar(false);
    };
  });

  return (
    <ContainerQrCodeClient>
      <LeftSideQrCodeClient>
        <ContainerLogoLarge>
          <LogoLarge src={logoLarge}></LogoLarge>
        </ContainerLogoLarge>
      </LeftSideQrCodeClient>
      <RightSideQrCodeClient></RightSideQrCodeClient>
    </ContainerQrCodeClient>
  );
};

export default QRCodeClient;
