import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { MAIN_THEME_COLOR } from '../styles/style-constants';
import { baseContainerStyles, baseTitleStyles } from '../styles/base-styles';

export const AppContainer = styled.main.attrs(() => ({ tabIndex: 0 }))`
  ${baseContainerStyles}
  display : block;

  &.yes {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 1fr 3fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr 6fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
`;

export const Header = styled.header`
  background-color: ${MAIN_THEME_COLOR};
  color: #fff;
`;

export const Footer = styled.footer`
  border-top: 2px solid ${MAIN_THEME_COLOR};
`;

export const PageTitle = styled.h1`
  ${baseTitleStyles}
  font-size: 40px;
`;

export const PageTitleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
