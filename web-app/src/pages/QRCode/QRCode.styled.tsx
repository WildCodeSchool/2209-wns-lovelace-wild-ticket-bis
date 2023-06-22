import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
  BOX_SHADOW,
  FONT_FAMILY,
  MAIN_THEME_COLOR,
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
  grid-area: 1 / 1 / 2 / 2;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

export const QRCodeElementContainer = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const QRCodeText = styled.h2`
  font-family: ${FONT_FAMILY};
  font-weight: lighter;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
`;

export const Divider = styled.hr`
  width: 70%;
`;

export const QRCodeUrl = styled.a`
  font-family: ${FONT_FAMILY};
  font-weight: lighter;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 0;
  text-decoration: none;
  color: black;
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
