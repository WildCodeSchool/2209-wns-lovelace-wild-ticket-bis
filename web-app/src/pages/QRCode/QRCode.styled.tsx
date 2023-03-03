import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
  BOX_SHADOW,
  FONT_FAMILY,
} from 'styles/style-constants';

export const QRCodeContainer = styled.div`
  height: 95%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  width: 95%;
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
`;

export const QRCodeText = styled.h2`
  font-family: ${FONT_FAMILY};
  font-weight: lighter;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
  
`;

export const Divider = styled.hr`
  width: 50%;
`;

export const QRCodeUrl = styled.h2`
  font-family: ${FONT_FAMILY};
  font-weight: lighter;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
