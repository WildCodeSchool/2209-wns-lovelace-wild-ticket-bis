import styled from 'styled-components';
import {
  BUTTON_BOX_SHADOW,
  BUTTON_LOGOUT_COLOR,
  BUTTON_LOGOUT_COLOR_ACTION,
  FONT_FAMILY,
  TITLE_FONT_WEIGHT,
} from '../../styles/style-constants';

export const ContainerHeader = styled.div`
  grid-area: 1 / 1 / 2 / 6;
  display: flex;
  align-items: center;
  gap: 5%;
`;

export const ContainerLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const TextHello = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 1.5rem;
  font-weight: bold;
  width: 80%;
  align-self: center;
`;

export const Logo = styled.img`
  margin: 0 0 0 20px;
  width: 50%;
`;
export const ContainerActualFlu = styled.div`
  height: 30%;
  width: 30rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
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
  font-family: ${FONT_FAMILY};
  font-size: 1.2rem;
`;

export const OptionSelect = styled.option`
  font-family: ${FONT_FAMILY};
  font-size: 1.2rem;
`;

export const ButtonLogout = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: none;
  border-radius: 10px;
  background-color: ${BUTTON_LOGOUT_COLOR};
  box-shadow: ${BUTTON_BOX_SHADOW};
  font-family: ${FONT_FAMILY};
  font-weight: ${TITLE_FONT_WEIGHT};
  gap: 10px;
  padding: 3px 15px 3px 15px;
  transition: 0.3s ease-out;

  &:active {
    background-color: ${BUTTON_LOGOUT_COLOR_ACTION};
  }
`;

export const LogoLogout = styled.img`
  margin: 5px 0px 5px 0px;
  width: 20px;
`;

export const ContainerLogoLogout = styled.div`
  display: flex;
`;
