import logo from '../../assets/logo_flu.png';
import { GlobalLogoContainer, LogoImg } from './Logo.styled';

type Props = {
  isNavbarDisplayed: boolean;
};

const Logo = ({ isNavbarDisplayed }: Props) => {
  return (
    <GlobalLogoContainer hidden={isNavbarDisplayed}>
      <LogoImg src={logo} alt="Flux Logo" hidden={isNavbarDisplayed}></LogoImg>
    </GlobalLogoContainer>
  );
};

export default Logo;
