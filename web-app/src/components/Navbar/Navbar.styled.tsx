import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  FONT_FAMILY,
  SELECT_LINK_COLOR,
  TEXT_FONT_COLOR,
} from '../../styles/style-constants';

export const ContainerNavbar = styled.div`
  grid-area: 2 / 1 / 5 / 2;
  width: 20%;
  height: 70%;
  margin: 0;
`;

export const ContainerLink = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

export const StyledLink = styled(NavLink)`
  color: ${TEXT_FONT_COLOR};
  font-weight: bold;
  border-radius: 0 10px 10px 0;
  text-decoration: none;
  border: 0.5px solid black;
  width: 80%;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 15%;
  align-items: center;
  font-family: ${FONT_FAMILY};
  font-size: 20px;
  background-color: #ecedf0;
  padding-left: 5px;
  &:focus {
    width: 90%;
    background-color: ${SELECT_LINK_COLOR};
  }
  &:active {
    background-color: none;
  }
  -webkit-tap-highlight-color: transparent;
`;
export const LogoLink = styled.img`
  height: 90%;
  widht: 90%;
`;
