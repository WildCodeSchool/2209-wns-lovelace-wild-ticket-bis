import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  BOX_BACKGROUND_COLOR,
  BOX_SHADOW,
  FONT_FAMILY,
  MAX_WIDTH_PHONE,
  MAX_WIDTH_TABLET,
  SELECT_LINK_COLOR,
  TEXT_FONT_COLOR,
} from '../../styles/style-constants';
import { IoQrCodeOutline, IoReaderOutline } from 'react-icons/io5';
import { GoTrashcan } from 'react-icons/go';

export const ContainerNavbar = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  margin-top: 60px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    grid-area: 3 / 1 / 4 / 2;
    margin-top: auto;
    display: flex;
    justify-content: center;
    border-top: solid 1px ${SELECT_LINK_COLOR};
  }
`;

export const ContainerLink = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    display: flex;
    flex-direction: row;
    width: 60%;
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: 100%;
  }
`;

export const StyledLink = styled(NavLink)<{ active: number }>`
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
  ${({ active }) =>
    active === 1 &&
    `
    width: 83%;
    padding-left: 20px;
    background-color: ${SELECT_LINK_COLOR};
  `}

  -webkit-tap-highlight-color: transparent;

  @media (max-width: ${MAX_WIDTH_TABLET}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 0px;
    width: 100%;
    border-radius: 0;
    height: 5rem;
    box-shadow: none;
    font-size: 1.2rem;
    transition: background-color 0.1s ease-in;
    &:focus {
      width: 100%;
      padding-left: 0px;
      background-color: ${SELECT_LINK_COLOR};
    }
    ${({ active }) =>
      active === 1 &&
      `
    width: 100%;
    padding-left: none;
    background-color: ${SELECT_LINK_COLOR};
  `}
  }
`;
export const LogoLink = styled.img`
  height: 40px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    height: 30px;
  }
`;

export const IoReaderOutlineIcon = styled(IoReaderOutline)`
  font-size: 40px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    font-size: 30px;
  }
`;

export const IoQrCodeOutlineIcon = styled(IoQrCodeOutline)`
  font-size: 40px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    font-size: 30px;
  }
`;

export const GoTrashcanIcon = styled(GoTrashcan)`
  font-size: 40px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    font-size: 30px;
  }
`;
