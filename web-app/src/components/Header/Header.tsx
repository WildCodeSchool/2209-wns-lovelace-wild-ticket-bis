import {
  ButtonLogout,
  ContainerActualFlu,
  ContainerHeader,
  ContainerLogo,
  ContainerLogoLogout,
  LabelActualFlu,
  Logo,
  LogoLogout,
  OptionSelect,
  SelectActualFlu,
  TextHello,
} from "./Header.styled";

import logoFlu from "../../assets/logo_flu.png";
import logout from "../../assets/logout.png";
import { useNavigate } from "react-router-dom";
import { SIGN_IN_PATH } from "pages/paths";

const Header = (data: any | null) => {
  const navigate = useNavigate();
  let flows: Array<any> = [];
  let hasData: boolean = false;
  if (data.data) {
    flows = data.data.myProfile.flows;
    hasData = true;
  }

  const logOut = () => {
    navigate(SIGN_IN_PATH);
  };

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
                return <OptionSelect key={e.id}>{e.flowName}</OptionSelect>;
              })
            : null}
        </SelectActualFlu>
      </ContainerActualFlu>
      <ButtonLogout onClick={() => logOut()}>
        <ContainerLogoLogout>
          <LogoLogout src={logout}></LogoLogout>
        </ContainerLogoLogout>
        Se déconnecter
      </ButtonLogout>
    </ContainerHeader>
  );
};
export default Header;

