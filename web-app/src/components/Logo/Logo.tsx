import React from "react";
import { GlobalLogoContainer, LogoImg } from "../../pages/SignIn/SignIn.styled";
import logo from "../../assets/logo_flu.png";

const Logo = () => {
  return (
    <GlobalLogoContainer>
      <LogoImg src={logo}></LogoImg>
    </GlobalLogoContainer>
  );
};

export default Logo;

