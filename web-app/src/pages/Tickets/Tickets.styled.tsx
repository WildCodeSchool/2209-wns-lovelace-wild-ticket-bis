import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  BUTTON_BOX_SHADOW,
  FONT_FAMILY,
  MAX_WIDTH_PHONE,
  MAX_WIDTH_TABLET,
  SECONDARY_BUTTON_COLOR,
  SECONDARY_BUTTON_COLOR_ACTION,
  SECONDARY_BUTTON_SIZE,
  TEXT_FONT_SIZE_PHONE,
  TEXT_FONT_WEIGHT,
  TITLE_FONT_SIZE,
  TITLE_FONT_WEIGHT,
} from 'styles/style-constants';

export const ButtonAction = styled.button`
  border: 0;
  border-radius: 50px;
  margin-top: 15px;
  background-color: ${SECONDARY_BUTTON_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${BUTTON_BOX_SHADOW};
  font-size: 1rem;
  margin-right: 20px;
  padding: ${SECONDARY_BUTTON_SIZE};
  transition: 0.3s ease-out;
  &:active {
    background-color: ${SECONDARY_BUTTON_COLOR_ACTION};
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    padding: 3px 9px;
    margin-right: 5px;
  }
`;

export const TextButtonAction = styled.p`
  font-family: ${FONT_FAMILY};
  font-weight: ${TEXT_FONT_WEIGHT};
  margin: 0;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: none;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    flex-wrap: wrap-reverse;
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    flex-wrap: wrap;
  }
`;

export const ButtonQuickChange = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: none;
  background-color: unset;
  padding: 0px;
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: none;
  }
`;

export const ContainerButtonAction = styled.div`
  display: flex;
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

export const TextStatus = styled.p`
  font-size: ${FONT_FAMILY};
  font-size: ${TITLE_FONT_SIZE};
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    display: none;
  }
`;

export const TextElementBold = styled.p`
  font-family: ${FONT_FAMILY};
  font-size: ${TITLE_FONT_SIZE};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${TITLE_FONT_WEIGHT};
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    font-size: ${TEXT_FONT_SIZE_PHONE};
  }
`;
