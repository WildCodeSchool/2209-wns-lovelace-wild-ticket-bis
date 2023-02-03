import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
  BOX_SHADOW,
  COLOR_ERROR_TICKET,
  FONT_FAMILY,
  TEXT_FONT_WEIGHT,
} from '../../styles/style-constants';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${BOX_BORDER};
  border-radius: 15px;
  height: 470px;
  width: 700px;
  background: ${BOX_BACKGROUND_COLOR};
  box-shadow: ${BOX_SHADOW};
`;

export const ContainerInput = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  width: 100%;
`;

export const LabelForm = styled.label``;

export const SignUpRight = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  border-left: 1px solid rgba(42, 42, 42, 0.15);
`;

export const SignUpLeft = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
`;

export const InputForm = styled.input`
  height: 30px;
  border: 1px solid rgba(42, 42, 42, 0.2);
  border-radius: 8px;
  width: 100%;
`;

export const FooterForm = styled.div`
  margin: 0;
  font-family: ${FONT_FAMILY};
  font-weight: ${TEXT_FONT_WEIGHT};
  text-align: center;
`;
export const TextWrongPassword = styled.p`
  margin: 0;
  font-family: ${FONT_FAMILY};
  font-size: small;
  color: ${COLOR_ERROR_TICKET};
`;

export const TextGoodPassword = styled.p``;
