import { css } from 'styled-components';
import { BACKGROUND_COLOR } from './style-constants';

export const baseContainerStyles = css`
  margin-left: auto;
  margin-right: auto;
  background: ${BACKGROUND_COLOR};
  height: 100vh;
  overflow-y: auto;
`;
