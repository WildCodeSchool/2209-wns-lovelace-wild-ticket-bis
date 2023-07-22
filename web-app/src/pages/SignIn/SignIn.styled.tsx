import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
  BOX_SHADOW,
  FONT_FAMILY,
  MAIN_THEME_COLOR,
  MAX_WIDTH_PHONE,
  PRIMARY_BUTTON_COLOR_ACTION,
  TEXT_FONT_WEIGHT,
  TITLE_FONT_WEIGHT,
} from '../../styles/style-constants';

export const SignContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 100vh;
`;

export const GlobalLogoContainer = styled(motion.div)`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  justify-content: center;
`;

export const GlobalFormContainer = styled(motion.div)`
  grid-column: 2;
  display: flex;
  justify-content: center;
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
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: auto;
    height: auto;
    padding: 10px 50px 10px 50px;
    margin-bottom: 50px;
  }
`;
export const LabelForm = styled.label`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 20px 0;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: auto;
  }
`;
export const InputForm = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid rgba(42, 42, 42, 0.2);
  border-radius: 8px;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: auto;
  }
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
    background-color: ${PRIMARY_BUTTON_COLOR_ACTION};
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    padding: 5px;
    font-size: 18px;
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
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    flex-direction: column;
  }
`;

export const LinkFooter = styled.p`
  margin: 0px;
  color: ${MAIN_THEME_COLOR};
  text-decoration: underline;
`;

export const ShowHidePasswordButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
  right: 18px;
  top: 52%;
  padding: 0;
`;

export const ContainerPasswordInput = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;
