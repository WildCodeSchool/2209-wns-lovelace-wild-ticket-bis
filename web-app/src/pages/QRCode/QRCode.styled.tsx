import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
  BOX_SHADOW,
  FONT_FAMILY,
  MAIN_THEME_COLOR,
  MAX_WIDTH_PHONE,
  SELECT_LINK_COLOR,
  TEXT_FONT_COLOR,
  TEXT_FONT_WEIGHT,
  TITLE_FONT_WEIGHT,
} from 'styles/style-constants';

export const QRCodeContainer = styled.div`
  height: 95%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  width: 95%;
  border-radius: 10px;
  border: ${BOX_BORDER};
  background: ${BOX_BACKGROUND_COLOR};
  box-shadow: ${BOX_SHADOW};
`;

export const QRCodeTextContainer = styled.div`
  display: flex;
  height: 100%;
  width: 40%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: 70%;
    height: unset;
    gap: 7px;
  }
`;

export const QRCodeElementContainer = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    height: unset;
  }
`;

export const QRCodeText = styled.h2`
  font-family: ${FONT_FAMILY};
  font-weight: ${TITLE_FONT_WEIGHT};
  color: ${TEXT_FONT_COLOR};
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    font-size: 0.7rem;
    margin: 0;
  }
`;

export const QRCodeUrl = styled.a`
  font-family: ${FONT_FAMILY};
  font-weight: ${TEXT_FONT_WEIGHT};
  color: ${TEXT_FONT_COLOR};
  flex-direction: column;
  justify-content: center;
  text-align: center;
  text-decoration: underline;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid ${SELECT_LINK_COLOR};
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    font-size: 0.8rem;
    padding-top: 10px;
    margin-top: 10px;
  }
`;

export const ContainerLoader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Loader = styled.span`
  width: 60px;
  height: 60px;
  border: 3px solid #fff;
  border-bottom-color: ${MAIN_THEME_COLOR};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoaderText = styled.h2`
  font-family: ${FONT_FAMILY};
  font-weight: lighter;
  font-size: 1.4rem;
`;

export const HeaderListQrCode = styled.div``;

export const ArrayContainerQrCode = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  border: ${BOX_BORDER};
  background: ${BOX_BACKGROUND_COLOR};
  box-shadow: ${BOX_SHADOW};
`;

export const ListContainerQrCode = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8%;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    flex-direction: column;
  }
`;

export const QrCodeSVG = styled(QRCodeSVG)`
  width: 250px;
  height: 250px;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: 150px;
    height: 150px;
  }
`;
