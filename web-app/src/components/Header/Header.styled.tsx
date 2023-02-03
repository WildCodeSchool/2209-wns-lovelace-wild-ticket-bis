import styled from 'styled-components';
import {
  BUTTON_BOX_SHADOW,
  FONT_FAMILY,
  SECONDARY_BUTTON_COLOR,
  SECONDARY_BUTTON_COLOR_ACTION,
  TITLE_FONT_WEIGHT,
} from '../../styles/style-constants';

export const ContainerHeader = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
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
  font-size: 1.4em;
`;

export const SelectActualFlu = styled.select`
  height: 80%;
  width: 50%;
  border: 0.5px solid rgba(13, 13, 13, 0.2);
  border-radius: 10px;
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
  background-color: ${SECONDARY_BUTTON_COLOR};
  box-shadow: ${BUTTON_BOX_SHADOW};
  font-family: ${FONT_FAMILY};
  font-weight: ${TITLE_FONT_WEIGHT};
  gap: 10px;
  padding: 3px 15px 3px 15px;
  transition: 0.3s ease-out;

  &:active {
    background-color: ${SECONDARY_BUTTON_COLOR_ACTION};
  }
`;

export const LogoLogout = styled.img`
  margin: 5px 0px 5px 0px;
  width: 20px;
`;

export const ContainerLogoLogout = styled.div`
  display: flex;
`;
