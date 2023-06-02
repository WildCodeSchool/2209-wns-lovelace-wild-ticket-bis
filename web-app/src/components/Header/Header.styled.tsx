import styled from 'styled-components';
import {
  BUTTON_BOX_SHADOW,
  FONT_FAMILY,
  MAX_WIDTH_TABLET,
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
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    grid-area: 1 / 1 / 2 / 2;
    width: auto;
    margin: 0 30px 0 30px;
  }
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

export const SelectActualFlu = styled.div`
  width: 50%;
  font-family: ${FONT_FAMILY};
  font-size: 1rem;
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
  padding: 5px 15px 5px 15px;
  transition: 0.3s ease-out;

  &:active {
    background-color: ${SECONDARY_BUTTON_COLOR_ACTION};
  }
`;
