import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';
import {
  FONT_FAMILY,
  MAX_WIDTH_PHONE,
  MAX_WIDTH_TABLET,
  TEXT_FONT_SIZE_PHONE,
} from 'styles/style-constants';

export const ContainerQrCodeClient = styled.div`
  height: 100vh;
  display: flex;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    flex-direction: column;
  }
`;

export const ContainerDesktop = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    height: 100%;
    margin: 10px;
  }
`;
export const RightSideQrCodeClient = styled.div`
  height: 100%;
  width: 60%;
`;
export const LeftSideQrCodeClient = styled.div`
  height: 100%;
  width: 40%;
`;

export const ContainerLogoLarge = styled.div`
  height: 30%;
`;

export const LogoLarge = styled.img`
  height: auto;
  width: 40%;
  margin: 8% 0 0 8%;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: 50%;
    margin: 0;
  }
`;

export const ContainerText = styled.div`
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const TextQrCodeClient = styled.p`
  font-family: ${FONT_FAMILY};
  font-weight: bolder;
  margin: 0 0 0 8%;
  font-size: 3rem;
  width: 80%;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    width: 100%;
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    font-size: ${TEXT_FONT_SIZE_PHONE};
    margin: 0;
    text-align: center;
  }
`;

export const ContainerTicketNumber = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: none;
  }
`;

export const ContainerTicketNumberResponsive = styled.div`
  display: none;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: flex;
    flex-direction: column;
  }
`;

export const TextTicketNumber = styled.h2`
  font-family: ${FONT_FAMILY};
  font-weight: initial;
  text-align: center;
  font-size: 2.5rem;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    font-size: 2rem;
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    font-size: 2rem;
    margin-top: 60px;
    margin-bottom: 0;
  }
`;

export const NumberTicket = styled.p`
  font-family: ${FONT_FAMILY};
  font-weight: bold;
  margin: 0;
  font-size: 3.5rem;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    font-size: 3rem;
  }
`;

export const QrCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TextTicketNumberQrCode = styled.p`
  font-family: ${FONT_FAMILY};
  font-weight: bolder;
  font-size: 2.5em;
  margin: 8% 0 0 0;
`;

export const TextScanQrCode = styled.p`
  display: ${(props) => (props.hidden ? 'flex' : 'none')};
  font-family: ${FONT_FAMILY};
  font-weight: bolder;
  font-size: 3vw;
  margin: 8% 0 0 0;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: none;
  }
`;

export const TextScanQrCodeResponsive = styled.p`
  display: none;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: ${(props) => (props.hidden ? 'flex' : 'none')};
    justify-content: center;
    font-family: ${FONT_FAMILY};
    font-weight: bolder;
    font-size: 1.1rem;
    margin: 0;
  }
`;

export const QrCodeShadow = styled.div`
  padding: 5%;
  border-radius: 30px;
  background: linear-gradient(
    127deg,
    rgba(255, 140, 56, 0.16850490196078427) 47%,
    rgba(255, 138, 53, 0) 100%
  );
`;

export const TextLinkQrCode = styled.p`
  font-family: ${FONT_FAMILY};
  font-weight: bolder;
  font-size: 2.5vw;
  text-align: center;
`;

export const QRCodeClientElementContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const NoTicketContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TextNoTicket = styled.p`
  font-family: ${FONT_FAMILY};
  font-weight: initial;
  text-align: center;
  font-size: 2.5rem;
`;
export const ContainerCircle = styled.div`
  margin: 5px 5px 0 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    margin: 0;
  }
`;
export const TextCountDown = styled.p`
  font-family: ${FONT_FAMILY};
  font-weight: initial;
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    font-size: ${TEXT_FONT_SIZE_PHONE};
  }
`;

export const QrCodeSVG = styled(QRCodeSVG)`
  width: 400px;
  height: 400px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    width: 300px;
    height: 300px;
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: 150px;
    height: 150px;
  }
`;

export const ContainerResponsive = styled.div`
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    margin: 0 10px 50px 10px;
  }
`;
