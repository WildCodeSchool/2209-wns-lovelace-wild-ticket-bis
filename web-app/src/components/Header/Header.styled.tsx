import styled from 'styled-components';
import { BUTTON_LOGOUT_COLOR, FONT_FAMILY } from '../../styles/style-constants';

export const ContainerHeader = styled.div`
  width: 100%;
  height: 15%;
  grid-area: 1 / 1 / 2 / 6;
  display: flex;
  align-items: center;
  gap: 5%;
`;

export const Logo = styled.img`
  margin: 20px 0 0 20px;
`;
export const ContainerActualFlu = styled.div`
  height: 30%;
  width: 30rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
`;
export const LabelActualFlu = styled.label`
  font-family: ${FONT_FAMILY};
  font-size: 2em;
`;

export const SelectActualFlu = styled.select`
  height: 90%;
  width: 60%;
  border: 0;
  border-radius: 15px;
`;

export const ContainerButtonLogout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 40%;
`;
export const ButtonLogout = styled.button`
  height: 30%;
  width: 40%;
  border: 0;
  border-radius: 15px;
  background-color: ${BUTTON_LOGOUT_COLOR};
  display: flex;
  align-items: center;
  font-family: ${FONT_FAMILY};
  font-size: 1.2rem;
  gap: 20px;
`;

export const LogoLogout = styled.img`
  margin: 3px 3px 3px 3px;
  height: 80%;
  width: 80%;
`;

export const ContainerLogoLogout = styled.div`
  display: flex;
`;
