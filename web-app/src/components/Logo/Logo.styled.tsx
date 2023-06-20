import styled from 'styled-components';
import { MAX_WIDTH_PHONE, MAX_WIDTH_TABLET } from 'styles/style-constants';

export const GlobalLogoContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: grid;
`;

export const LogoImg = styled.img`
  width: 120px;
  margin: 20px;
  display: flex;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    display: none;
  }
`;

export const LogoImgResponsive = styled.img`
  width: 120px;
  @media (max-width: ${MAX_WIDTH_TABLET}) {
    display: ${(props) => (props.hidden ? 'flex' : 'none')};
  }
  @media (max-width: ${MAX_WIDTH_PHONE}) {
    width: 50px;
  }
`;
