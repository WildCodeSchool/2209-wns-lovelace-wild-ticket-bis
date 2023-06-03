import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
  BOX_SHADOW,
  COLOR_ERROR_TICKET,
  FONT_FAMILY,
  MAX_WIDTH_PHONE,
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
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: auto;
    height: auto;
    padding: 10px 50px 10px 50px;
  }
`;

export const ContainerInput = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  width: 100%;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: flex;
    flex-direction: column;
  }
`;

export const LabelForm = styled.label`
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    margin: 10px 0 10px 0;
  }
`;

export const SignUpRight = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  border-left: 1px solid rgba(42, 42, 42, 0.15);
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(42, 42, 42, 0.15);
    border-left: none;
    margin-top: 10px;
  }
`;

export const SignUpLeft = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  justify-content: center;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: flex;
    flex-direction: column;
    border-left: none;
    margin-top: 10px;
  }
`;

export const InputForm = styled.input`
  height: 30px;
  border: 1px solid rgba(42, 42, 42, 0.2);
  border-radius: 8px;
  width: 100%;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: 190px;
  }
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
