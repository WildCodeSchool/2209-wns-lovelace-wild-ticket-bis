import styled from 'styled-components';
import { baseContainerStyles } from '../styles/base-styles';

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
    &.yes {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 2fr 6fr 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    }
  }
`;
