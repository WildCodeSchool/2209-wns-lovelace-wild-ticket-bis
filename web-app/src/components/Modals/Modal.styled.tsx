import styled from 'styled-components';
import {
  BOX_BORDER,
  BOX_SHADOW,
  FONT_FAMILY,
  PRIMARY_BUTTON_COLOR,
  SECONDARY_BUTTON_COLOR,
  TEXT_FONT_SIZE,
  TITLE_FONT_SIZE,
  TITLE_FONT_WEIGHT,
} from 'styles/style-constants';

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
