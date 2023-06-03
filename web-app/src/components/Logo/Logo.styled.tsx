import styled from 'styled-components';
import { MAX_WIDTH_TABLET } from 'styles/style-constants';

export const GlobalLogoContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: grid;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    display: ${(props) => (props.hidden ? 'none' : 'grid')};
  }
`;

export const LogoImg = styled.img`
  width: 120px;
  margin: 20px;
`;

export const LogoImgResponsive = styled.img`
  width: 120px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    display: ${(props) => (props.hidden ? 'flex' : 'none')};
  }
`;
