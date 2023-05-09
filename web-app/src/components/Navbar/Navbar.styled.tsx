import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_SHADOW,
  FONT_FAMILY,
  SELECT_LINK_COLOR,
  TEXT_FONT_COLOR,
} from '../../styles/style-constants';

export const ContainerNavbar = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  margin-top: 60px;
`;

export const ContainerLink = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const StyledLink = styled(NavLink)`
  font-family: ${FONT_FAMILY};
  color: ${TEXT_FONT_COLOR};
  font-weight: bold;
  background: ${BOX_BACKGROUND_COLOR};
  box-shadow: ${BOX_SHADOW};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0 8px 8px 0;
  text-decoration: none;
  font-size: 20px;
  width: 80%;
  height: 3.5rem;
  gap: 15px;
  padding-left: 15px;
  transition: width 0.2s ease-in-out;
  transition: padding-left 0.2s ease-in-out;
  &:focus {
    width: 83%;
    padding-left: 20px;
    background-color: ${SELECT_LINK_COLOR};
  }
  -webkit-tap-highlight-color: transparent;
`;
export const LogoLink = styled.img`
  height: 90%;
`;
