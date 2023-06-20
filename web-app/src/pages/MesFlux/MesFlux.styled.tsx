import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
  BOX_SHADOW,
  BUTTON_BOX_SHADOW,
  COLOR_ERROR_TICKET,
  COLOR_NOSCAN_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
  FONT_FAMILY,
  MAX_WIDTH_PHONE,
  MAX_WIDTH_TABLET,
  PRIMARY_BUTTON_COLOR,
  PRIMARY_BUTTON_COLOR_ACTION,
  PRIMARY_BUTTON_SIZE,
  PRIMARY_BUTTON_SIZE_PHONE,
  SECONDARY_BUTTON_COLOR,
  SECONDARY_BUTTON_COLOR_ACTION,
  SECONDARY_BUTTON_SIZE,
  SECONDARY_BUTTON_SIZE_PHONE,
  TEXT_FONT_SIZE,
  TEXT_FONT_SIZE_PHONE,
  TEXT_FONT_WEIGHT,
  TITLE_FONT_SIZE,
  TITLE_FONT_SIZE_PHONE,
  TITLE_FONT_WEIGHT,
} from '../../styles/style-constants';
import { SELECT_LINK_COLOR } from '../../styles/style-constants';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export const MainContainer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  height: 90%;
  display: grid;
  grid-template-rows: 10% 90%;
  width: 95%;
  row-gap: 20px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    grid-area: 2 / 1 / 3 / 2;
    height: 92%;
    width: auto;
    margin: 0 30px 0 30px;
  }
`;

export const ContainerButton = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const SecondaryButton = styled.button`
  padding: ${SECONDARY_BUTTON_SIZE};
  border: 0;
  border-radius: 50px;
  margin-right: 20px;
  margin-top: 15px;
  background-color: ${SECONDARY_BUTTON_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: ${TEXT_FONT_WEIGHT};
  box-shadow: ${BUTTON_BOX_SHADOW};
  font-size: ${TITLE_FONT_SIZE_PHONE};
  transition: 0.3s ease-out;
  &:active {
    background-color: ${SECONDARY_BUTTON_COLOR_ACTION};
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    padding: ${SECONDARY_BUTTON_SIZE_PHONE};
    margin-right: 10px;
  }
`;

export const DeleteText = styled.span`
  font-size: ${TITLE_FONT_SIZE};
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: none;
  }
`;

export const ButtonAdd = styled.button`
  padding: ${PRIMARY_BUTTON_SIZE};
  border: 0;
  border-radius: 50px;
  background-color: ${PRIMARY_BUTTON_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${BUTTON_BOX_SHADOW};
  transition: 0.3s ease-out;
  &:active {
    background-color: ${PRIMARY_BUTTON_COLOR_ACTION};
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    font-size: ${TITLE_FONT_SIZE_PHONE};
    padding: ${PRIMARY_BUTTON_SIZE_PHONE};
  }
`;

export const AiOutlinePlusCircleIcon = styled(AiOutlinePlusCircle)`
  display: none;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: flex;
  }
`;

export const AddText = styled.p`
  font-family: ${FONT_FAMILY};
  font-weight: ${TITLE_FONT_WEIGHT};
  font-size: ${TITLE_FONT_SIZE};
  margin: 0;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: none;
  }
`;

export const ArrayContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10% 1% 89%;
  border-radius: 10px;
  border: ${BOX_BORDER};
  background: ${BOX_BACKGROUND_COLOR};
  box-shadow: ${BOX_SHADOW};
`;

export const HeaderList = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 3fr 0.5fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  font-family: ${FONT_FAMILY};
  font-size: ${TITLE_FONT_SIZE};
  border-bottom: 1px solid ${SELECT_LINK_COLOR};
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    & :nth-child(4) {
      display: none;
    }
    grid-template-columns: 0.3fr 1fr 1fr;
  }
`;

export const TextElementHeader = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: ${TITLE_FONT_SIZE};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${TITLE_FONT_WEIGHT};
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    justify-content: flex-start;
    font-size: ${TITLE_FONT_SIZE_PHONE};
  }
`;

export const ListContainer = styled.div`
  grid-area: 3 / 1 / 4 / 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: auto;
  margin: 20px;
  overflow-y: auto;
  height: 410px;

  @media (min-width: ${MAX_WIDTH_TABLET}) {
    height: 410px;
  }

  @media (min-width: 1365px) {
    height: 480px;
  }

  @media (max-width: ${MAX_WIDTH_PHONE}) {
    margin: 10px 5px 10px 5px;
  }
`;

export const ItemList = styled.div`
  height: 10%;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 3fr 0.5fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  font-family: ${FONT_FAMILY};
  font-size: ${TITLE_FONT_SIZE};
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    grid-template-columns: 0.3fr 1fr 1fr 0fr;
    height: 12%;
  }
`;

export const ContainerInputItem = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TextElement = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: ${TITLE_FONT_SIZE};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    justify-content: flex-start;
    font-size: ${TEXT_FONT_SIZE_PHONE};
  }
`;

export const InputItem = styled.input`
  align-self: center;
  width: 1em;
  height: 1em;
  margin-right: 20px;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    margin-right: 15px;
  }
`;

export const AllStatusContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: none;
  }
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

export const ModalContainer = styled.div`
  height: 35vh;
  width: 32vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30% 1fr;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export const ContainerLogo = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

export const LogotTitle = styled.img`
  height: 50%;
`;

export const TitleElement = styled.h1`
  font-family: ${FONT_FAMILY};
  font-weight: ${TITLE_FONT_WEIGHT};
  font-size: 1.6rem;
`;

export const ButtonClose = styled.button`
  display: flex;
  justify-content: flex-end;
  height: 30px;
  background-color: transparent;
  border: 0;
  font-size: medium;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  align-items: center;
`;

export const LabelElement = styled.label`
  display: flex;
  flex-direction: column;
  font-family: ${FONT_FAMILY};
  font-size: ${TITLE_FONT_SIZE};
  width: 57%;
  gap: 5px;
`;

export const InputElement = styled.input`
  font-size: ${TEXT_FONT_SIZE};
  font-family: ${FONT_FAMILY};
  padding: 14px;
  border-radius: 8px;
  border: 0.5px solid rgba(42, 42, 42, 0.2);
  &:focus {
    outline: none;
  }
`;

export const ButtonValidate = styled.button`
  padding: ${PRIMARY_BUTTON_SIZE};
  border: 0;
  border-radius: 50px;
  background-color: ${PRIMARY_BUTTON_COLOR};
  box-shadow: ${BUTTON_BOX_SHADOW};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: bold;
  font-size: 1.4rem;
  gap: 20px;

  &:active {
    background-color: ${PRIMARY_BUTTON_COLOR_ACTION};
  }
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

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: `${BOX_BORDER}`,
    boxShadow: `${BOX_SHADOW}`,
  },
};
