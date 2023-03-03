import styled from 'styled-components';
import {
  BUTTON_BOX_SHADOW,
  FONT_FAMILY,
  SECONDARY_BUTTON_COLOR,
  TEXT_FONT_WEIGHT,
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
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
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
