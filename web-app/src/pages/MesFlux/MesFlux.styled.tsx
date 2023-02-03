import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_SHADOW,
  BUTTON_BOX_SHADOW,
  COLOR_ERROR_TICKET,
  COLOR_NOSCAN_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
  FONT_FAMILY,
  PRIMARY_BUTTON_COLOR,
  PRIMARY_BUTTON_COLOR_ACTION,
  PRIMARY_BUTTON_SIZE,
  SECONDARY_BUTTON_COLOR,
  TEXT_FONT_WEIGHT,
  TITLE_FONT_WEIGHT,
} from '../../styles/style-constants';

export const MainContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  width: 95%;
  display: grid;
  height: 95%;
  grid-template-columns: 1fr;
  grid-template-rows: 10% 90%;
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
  padding: 0 3% 0 3%;
`;

export const Divider = styled.hr`
  grid-area: 2 / 1 / 3 / 2;
  width: 90%;
`;

export const ArrayContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10% 1% 89%;
  border-radius: 0 0 20px 20px;
  background: ${BOX_BACKGROUND_COLOR};
  box-shadow: ${BOX_SHADOW};
`;

export const ListContainer = styled.div`
  grid-area: 3 / 1 / 4 / 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: auto;
  height: 100%;
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
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const TextElement = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
`;
export const ContainerInputItem = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const InputItem = styled.input`
  align-self: center;
  width: 100%;
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

export const ContainerButton = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonAdd = styled.button`
  padding: ${PRIMARY_BUTTON_SIZE};
  border: 0;
  border-radius: 50px;
  background-color: ${PRIMARY_BUTTON_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: ${TITLE_FONT_WEIGHT};
  box-shadow: ${BUTTON_BOX_SHADOW};
  font-size: 1.2rem;
  transition: 0.3s ease-out;
  &:active {
    background-color: ${PRIMARY_BUTTON_COLOR_ACTION};
  }
`;

export const ButtonDelete = styled.button`
  padding: 5px 25px;
  border: 0;
  border-radius: 50px;
  background-color: ${SECONDARY_BUTTON_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: ${TEXT_FONT_WEIGHT};
  box-shadow: ${BUTTON_BOX_SHADOW};
  font-size: 1.2rem;
`;
export const ModalContainer = styled.div`
  height: 35vh;
  width: 35vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30% 1fr;
`;
export const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-template-rows: 1fr;
  padding: 0 0 0 15%;
  grid-area: 1 / 1 / 2 / 2;
`;
export const ButtonClose = styled.button`
  height: 30px;
  grid-area: 1 / 2 / 2 / 3;
  background-color: transparent;
  border: 0;
  font-size: medium;
`;
export const ContainerLogo = styled.div`
  width: 100%;
  display: flex;
  grid-area: 1 / 1 / 2 / 2;
  align-items: center;
  gap: 15px;
`;

export const LogotTitle = styled.img`
  height: 50%;
`;

export const TitleElement = styled.h1`
  font-family: ${FONT_FAMILY};
  font-size: 1.6rem;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
  grid-area: 1 / 1 / 2 / 2;
`;
export const InputElement = styled.input`
  height: 30px;

  &:focus {
    outline: none;
  }
`;
export const LabelElement = styled.label`
  display: flex;
  flex-direction: column;
  font-family: ${FONT_FAMILY};
  font-size: 1.3rem;
  height: 30%;
  width: 50%;
  gap: 5px;
`;

export const FormContainer = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  align-items: center;
  flex-direction: column;
`;

export const ButtonValidate = styled.button`
  height: 20%;
  width: 40%;
  border: 0;
  border-radius: 15px;
  background-color: ${PRIMARY_BUTTON_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: bold;
  font-size: 1.4rem;
  gap: 20px;
`;

export const ContainerAskDelete = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const QuestionElement = styled.div`
  font-family: ${FONT_FAMILY};
  font-size: 1.5rem;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
`;

export const ContainerButtonDeleteFlu = styled.div`
  height: 20%;
  display: flex;
  justify-content: space-around;
`;

export const LogoLinkButton = styled.img`
  width: 25px;
  margin-right: 8px;
`;

export const ButtonValidateDelete = styled.button`
  height: 100%;
  width: 40%;
  border: 0;
  border-radius: 15px;
  background-color: ${PRIMARY_BUTTON_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: bold;
  font-size: 1.4rem;
  gap: 20px;
`;

export const ButtonCancelDelete = styled.button`
  height: 100%;
  width: 40%;
  border: 0;
  border-radius: 15px;
  background-color: ${SECONDARY_BUTTON_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: bold;
  font-size: 1.4rem;
  gap: 20px;
`;
