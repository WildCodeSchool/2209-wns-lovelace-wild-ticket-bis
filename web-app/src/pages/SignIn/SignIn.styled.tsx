import { motion } from "framer-motion";
import styled from "styled-components";
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
  BOX_SHADOW,
  BUTTON_COLOR_ACTION,
  FONT_FAMILY,
  MAIN_THEME_COLOR,
  TEXT_FONT_WEIGHT,
  TITLE_FONT_WEIGHT,
} from "../../styles/style-constants";

export const SignContainer = styled(motion.div)``;

export const GlobalFormContainer = styled.div`
  grid-column: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${BOX_BORDER};
  border-radius: 15px;
  height: 470px;
  width: 390px;
  background: ${BOX_BACKGROUND_COLOR};
  box-shadow: ${BOX_SHADOW};
`;
export const LabelForm = styled.label`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
export const InputForm = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid rgba(42, 42, 42, 0.2);
  border-radius: 8px;
`;
export const TextLabel = styled.p`
  margin: 0;
  padding-bottom: 5px;
  font-size: 16px;
  width: 100%;
  font-family: ${FONT_FAMILY};
`;
export const ButtonLabel = styled.button`
  margin: 25px;
  width: 180px;
  border-radius: 30px;
  border: none;
  font-size: 20px;
  padding: 10px;
  background-color: ${MAIN_THEME_COLOR};
  transition: 0.3s ease-out;
  font-family: ${FONT_FAMILY};
  font-weight: ${TITLE_FONT_WEIGHT};
  box-shadow: ${BOX_SHADOW};
  &:active {
    background-color: ${BUTTON_COLOR_ACTION};
  }
`;

export const LabelTitle = styled.h1`
  font-family: ${FONT_FAMILY};
  font-weight: ${TITLE_FONT_WEIGHT};
  font-size: 30px;
`;

export const ContainerInput = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const FooterForm = styled.div`
  margin: 0;
  font-family: ${FONT_FAMILY};
  font-weight: ${TEXT_FONT_WEIGHT};
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

export const LinkFooter = styled.p`
  margin: 0px;
  color: ${MAIN_THEME_COLOR};
  text-decoration: underline;
`;

