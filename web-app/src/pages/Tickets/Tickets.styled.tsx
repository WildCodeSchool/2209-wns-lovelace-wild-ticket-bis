import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  BUTTON_BOX_SHADOW,
  FONT_FAMILY,
  SECONDARY_BUTTON_COLOR,
  SECONDARY_BUTTON_COLOR_ACTION,
  TEXT_FONT_WEIGHT,
  TITLE_FONT_WEIGHT,
} from 'styles/style-constants';

export const ButtonAction = styled.button`
  border: 0;
  border-radius: 50px;
  background-color: ${SECONDARY_BUTTON_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: ${TEXT_FONT_WEIGHT};
  box-shadow: ${BUTTON_BOX_SHADOW};
  font-size: 1rem;
  margin-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  transition: 0.3s ease-out;
  &:active {
    background-color: ${SECONDARY_BUTTON_COLOR_ACTION};
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  @media (max-width: 1024px) {
    flex-wrap: wrap-reverse;
  }
`;

export const ButtonQuickChange = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  background-color: unset;
  padding: 0px;
`;

export const ContainerButtonAction = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    margin-top: 15px;
  }
`;

export const AllStatusContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    margin-right: 20px;
  }
`;

export const TextElementBold = styled.p`
  font-family: ${FONT_FAMILY};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${TITLE_FONT_WEIGHT};
`;
