import styled from 'styled-components';
import {
  BUTTON_LOGOUT_COLOR,
  FONT_FAMILY,
  PRIMARY_COLOR_BUTTON,
} from '../../styles/style-constants';

export const ContainerButton = styled.div`
  grid-area: 2 / 2 / 3 / 6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px 0 40px;
`;

export const ButtonAdd = styled.button`
  height: 40%;
  width: 15%;
  border: 0;
  border-radius: 15px;
  background-color: ${PRIMARY_COLOR_BUTTON};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-size: 1.2rem;
  gap: 20px;
`;
export const ButtonDelete = styled.button`
  height: 40%;
  width: 15%;
  border: 0;
  border-radius: 15px;
  background-color: ${BUTTON_LOGOUT_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-size: 1.2rem;
  gap: 20px;
`;

// export const ContainerButtonAdd = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
//   width: 40%;
// `;
