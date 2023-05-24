import React from 'react';
import logo from '../../assets/logo_flu.png';
import { GlobalLogoContainer, LogoImg } from './Logo.styled';

const Logo = () => {
  return (
    <GlobalLogoContainer>
      <LogoImg src={logo} alt="Flux Logo"></LogoImg>
    </GlobalLogoContainer>
  );
};

export default Logo;
