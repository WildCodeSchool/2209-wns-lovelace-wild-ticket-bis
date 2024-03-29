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
  display: grid;
  grid-template-rows: 10% 63vh;
  width: 95%;
  row-gap: 20px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    grid-area: 2 / 1 / 3 / 2;
    width: auto;
    margin: 0 30px 0 30px;
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    grid-template-rows: 10% 58vh;
    row-gap: 15px;
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
  grid-template-rows: 65px 1% 89%;
  border-radius: 10px;
  border: ${BOX_BORDER};
  background: ${BOX_BACKGROUND_COLOR};
  box-shadow: ${BOX_SHADOW};
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    grid-template-rows: 50px 1% 89%;
  }
`;

export const HeaderList = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 3fr 0.5fr;
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
  margin: 0px 20px 28px 20px;
  overflow-y: auto;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    margin: 10px 5px 15px 5px;
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    margin: 10px 5px 10px 5px;
  }
`;

export const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 3fr 0.5fr;
  font-family: ${FONT_FAMILY};
  font-size: ${TITLE_FONT_SIZE};
  margin-top: 5px;
  background-color: ${(props) =>
    props.hidden ? SELECT_LINK_COLOR : 'transparent'};
  border-radius: 10px;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    grid-template-columns: 0.3fr 1fr 1fr 0fr;
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
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    font-size: 1.2rem;
  }
`;
