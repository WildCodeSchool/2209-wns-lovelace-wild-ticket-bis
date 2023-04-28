import { QRCodeSVG } from 'qrcode.react';
import {
  QRCodeContainer,
  QRCodeElementContainer,
  QRCodeText,
  QRCodeTextContainer,
  Divider,
  QRCodeUrl,
  Loader,
  ContainerLoader,
  LoaderText,
} from './QRCode.styled';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
import { addDashes } from 'utils';

interface Flows {
  value: string;
  label: string;
}

const QRCode = () => {
  const appContext = useContext(AppContext);
  const [flows, setFlows] = useState<Flows | null>(null);

  useEffect(() => {
    if (appContext?.selectedFlow) {
      setFlows(appContext.selectedFlow);
    }
  }, [appContext]);

 


  return (
    <QRCodeContainer>
      <QRCodeTextContainer>
        <QRCodeText>
          Scannez ce QR code ou accéder au lien sur un second appareil.
        </QRCodeText>
        <QRCodeText>
          Il permettra à vos clients de scanner un QRCode pour suivre leurs
          tickets sur le flu sélectionné.
        </QRCodeText>
      </QRCodeTextContainer>
      <QRCodeElementContainer>
        {flows?.label ? (
          <>
            <QRCodeSVG
              value={`https://localhost:3000/qr-code-client/${addDashes(
                flows?.label
              )}`}
              bgColor={'transparent'}
              size={250}
            />
            <Divider />
            <QRCodeUrl>
              https://localhost:3000/qr-code-client/{addDashes(flows?.label)}
            </QRCodeUrl>
          </>
        ) : (
          <ContainerLoader>
            <Loader></Loader>
            <LoaderText>Merci de sélectionner un flu.</LoaderText>
          </ContainerLoader>
        )}
      </QRCodeElementContainer>
    </QRCodeContainer>
  );
};

export default QRCode;
