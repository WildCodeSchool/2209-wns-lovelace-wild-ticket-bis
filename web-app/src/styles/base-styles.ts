import styled, { css } from "styled-components";
import { APP_FUNCTIONAL_WIDTH } from "./style-constants";
import { MAIN_THEME_COLOR } from '../styles/style-constants'

export const baseTitleStyles = css`
  margin: 0 0 0.35em;
`;
export const baseContainerStyles = css`
  margin-left: auto;
  margin-right: auto;
  background: ${MAIN_THEME_COLOR};
  height: 100vh;
`;

export const Paragraph = styled.p`
  margin: 0 0 1.15em;
`;

export const SectionTitle = styled.h2`
  ${baseTitleStyles}
  font-size: 28px;
`;
