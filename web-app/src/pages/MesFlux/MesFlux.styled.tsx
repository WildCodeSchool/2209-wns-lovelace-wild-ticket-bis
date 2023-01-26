import styled from 'styled-components';
import {
  COLOR_ERROR_TICKET,
  COLOR_NOSCAN_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
  FONT_FAMILY,
} from '../../styles/style-constants';

export const MainContainer = styled.div`
  grid-area: 3 / 2 / 6 / 6;

  width: 90%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10% 1% 89%;
`;

export const HeaderList = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  font-family: ${FONT_FAMILY};
  font-size: 1.2rem;
  margin: 0 3% 0 3%;
`;

export const Divider = styled.hr`
  grid-area: 2 / 1 / 3 / 2;
  width: 100%;
`;

export const ListContainer = styled.div`
  grid-area: 3 / 1 / 4 / 2;
`;

export const ItemList = styled.div`
  height: 10%;
  display: grid;
  grid-template-columns: 3% 32.3% 32.3% 32.3%;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  font-family: ${FONT_FAMILY};
  font-size: 1.2rem;

  margin: 0 3% 0 0;
`;

export const TextElementHeader = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const TextElement = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
`;

export const InputItem = styled.input`
  align-self: center;
  width: 50%;
  height: 50%;
`;

export const AllStatusContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const StatusContainer = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
`;

export const StatusNoScan = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${COLOR_NOSCAN_TICKET};
  border-radius: 50%;
`;

export const StatusWaiting = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${COLOR_WAITING_TICKET};
  border-radius: 50%;
`;
export const StatusValidate = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${COLOR_VALIDATE_TICKET};
  border-radius: 50%;
`;
export const StatusError = styled.div`
  height: 20px;
  width: 20px;
  background-color: ${COLOR_ERROR_TICKET};
  border-radius: 50%;
`;
