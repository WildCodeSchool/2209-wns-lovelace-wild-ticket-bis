import logo from '../../assets/logo_flu.png';
import { LogoImgResponsive } from './Logo.styled';

type Props = {
  isLogoDisplayed: boolean;
};

const LogoResponsive = ({ isLogoDisplayed }: Props) => {
  return (
    <LogoImgResponsive src={logo} alt="Flux Logo" hidden={isLogoDisplayed} />
  );
};

export default LogoResponsive;
