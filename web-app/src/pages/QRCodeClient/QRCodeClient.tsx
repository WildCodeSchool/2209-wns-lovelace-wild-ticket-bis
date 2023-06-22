import { useEffect } from 'react';
import {
  ContainerLogoLarge,
  ContainerQrCodeClient,
  ContainerText,
  ContainerTicketNumber,
  LeftSideQrCodeClient,
  LogoLarge,
  NumberTicket,
  QRCodeClientElementContainer,
  QrCodeContainer,
  QrCodeShadow,
  RightSideQrCodeClient,
  TextLinkQrCode,
  TextQrCodeClient,
  TextScanQrCode,
  TextTicketNumber,
  TextTitleLinkQrCode,
} from './QrCodeClient.styled';
import logoLarge from '../../assets/logo_flux_large.png';
import { PropsDisplayNavbar } from 'utils';
import { QRCodeSVG } from 'qrcode.react';

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
        <ContainerText>
          <TextQrCodeClient>
            Soyez prévenue quand votre commande est prête ! 👋
          </TextQrCodeClient>
        </ContainerText>
        <ContainerTicketNumber>
          <TextTicketNumber>
            Numero d’attente : <br />
            <NumberTicket>#5842</NumberTicket>
          </TextTicketNumber>
        </ContainerTicketNumber>
      </LeftSideQrCodeClient>
      <RightSideQrCodeClient>
        <QrCodeContainer>
          <TextScanQrCode>
            • &nbsp; Scanner le Qr-code en dessous 👇
          </TextScanQrCode>
          <QRCodeClientElementContainer>
            <QrCodeShadow>
              <QRCodeSVG
                value={`https://localhost:3000/qr-code-client/
              )}`}
                bgColor={'transparent'}
                size={400}
              />
            </QrCodeShadow>
          </QRCodeClientElementContainer>
          <TextTitleLinkQrCode>
            • &nbsp; Ou rendez-vous sur : <br />
            <TextLinkQrCode>https://NameOfApp/ticket/idticket</TextLinkQrCode>
          </TextTitleLinkQrCode>
        </QrCodeContainer>
      </RightSideQrCodeClient>
    </ContainerQrCodeClient>
  );
};

export default QRCodeClient;
