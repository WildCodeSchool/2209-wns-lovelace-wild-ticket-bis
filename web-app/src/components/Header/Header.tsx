import {
  ButtonLogout,
  ContainerActualFlu,
  ContainerButtonLogout,
  ContainerHeader,
  ContainerLogoLogout,
  LabelActualFlu,
  Logo,
  LogoLogout,
  OptionSelect,
  SelectActualFlu,
} from './Header.styled';

import logoFlu from '../../assets/logo_flu.png';
import logout from '../../assets/logout.png';
const Header = (data: any | null) => {
  let flows: Array<any> = [];
  let hasData: boolean = false;
  if (data.data) {
    flows = data.data.myProfile.flows;
    hasData = true;
  }

  return (
    <ContainerHeader>
      <Logo src={logoFlu}></Logo>
      <ContainerActualFlu>
        <LabelActualFlu> Actuel Flu : </LabelActualFlu>
        <SelectActualFlu>
          {hasData
            ? flows.map((e) => {
                return <OptionSelect>{e.flowName}</OptionSelect>;
              })
            : null}
        </SelectActualFlu>
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
