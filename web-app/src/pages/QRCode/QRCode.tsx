import { QRCodeSVG } from 'qrcode.react';
import {
  QRCodeContainer,
  QRCodeElementContainer,
  QRCodeText,
  QRCodeTextContainer,
  Divider,
  QRCodeUrl,
} from './QRCode.styled';

const QRCode = () => {
  return (
    <QRCodeContainer>
      <QRCodeTextContainer>
        <QRCodeText>
          Scannez ce QR code ou accéder au lien sur un second appareil.
        </QRCodeText>
        <QRCodeText>
          Il permettra à vos clients de scanner un QRCode pour suivre leurs
          tickets sur le Flu {'Camion Vert'}.
        </QRCodeText>
      </QRCodeTextContainer>
      <QRCodeElementContainer>
        <QRCodeSVG
          value={`https://localhost:3000/qr-code-client/${3}`}
          bgColor={'transparent'}
          size={250}
          style={{ height: '40%' }}
        />
        <Divider />
        <QRCodeUrl>https://localhost:3000/qr-code-client/{3}</QRCodeUrl>
      </QRCodeElementContainer>
    </QRCodeContainer>
  );
};

export default QRCode;
