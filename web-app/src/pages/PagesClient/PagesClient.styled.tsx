import styled from 'styled-components';
import { FONT_FAMILY, TITLE_FONT_WEIGHT } from 'styles/style-constants';

export const ContainerPages = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContainerLogoMobile = styled.div`
  height: 10%;
`;

export const LogoMobile = styled.img`
  height: 70%;
  margin: 10px 0 0 10px;
`;

export const ContainerTextMobile = styled.div`
  text-align: inherit;
  width: 80%;
  align-self: center;
  height: 20%;
`;

export const TextMobile = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 3vh;
  font-weight: normal;
`;

export const TextLightMobile = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 2.5vh;
  font-weight: normal;
`;

export const ContainerCard = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Card = styled.div`
  width: 80%;
  height: 90%;
  align-self: center;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TextCardMobile = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 3vh;
  font-weight: normal;
  text-align: center;
  color: white;
  margin: 10px;
`;

export const OrderNumber = styled.p`
  font-family: ${FONT_FAMILY};
  font-weight: ${TITLE_FONT_WEIGHT};
  font-size: 2rem;
  color: white;
`;

export const ContainerIconStatus = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
