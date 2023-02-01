import {
  ButtonLogout,
  ContainerActualFlu,
  ContainerButtonLogout,
  ContainerHeader,
  ContainerLogo,
  ContainerLogoLogout,
  LabelActualFlu,
  Logo,
  LogoLogout,
  OptionSelect,
  SelectActualFlu,
  TextHello,
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
      <ContainerLogo>
        <Logo src={logoFlu}></Logo>
        {hasData ?? (
          <TextHello>Bonjour, {data.data.myProfile.firstName}</TextHello>
        )}
      </ContainerLogo>
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
