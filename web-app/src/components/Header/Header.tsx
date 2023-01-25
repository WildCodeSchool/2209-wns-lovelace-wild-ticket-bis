import {
  ButtonLogout,
  ContainerActualFlu,
  ContainerButtonLogout,
  ContainerHeader,
  ContainerLogoLogout,
  LabelActualFlu,
  Logo,
  LogoLogout,
  SelectActualFlu,
} from './Header.styled';

import logoFlu from '../../assets/logo_flu.png';
import logout from '../../assets/logout.png';
const Header = () => {
  return (
    <ContainerHeader>
      <Logo src={logoFlu}></Logo>
      <ContainerActualFlu>
        <LabelActualFlu> Actuel Flu : </LabelActualFlu>
        <SelectActualFlu></SelectActualFlu>
      </ContainerActualFlu>
      <ContainerButtonLogout>
        <ButtonLogout>
          <ContainerLogoLogout>
            <LogoLogout src={logout}></LogoLogout>
          </ContainerLogoLogout>
          Se déconnecter
        </ButtonLogout>
      </ContainerButtonLogout>
    </ContainerHeader>
  );
};
export default Header;
