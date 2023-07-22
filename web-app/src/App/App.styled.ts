import styled from 'styled-components';
import { baseContainerStyles } from '../styles/base-styles';
import { MAX_WIDTH_TABLET } from 'styles/style-constants';

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
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    &.yes {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1.5fr 6fr 1fr;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    }
  }
`;
