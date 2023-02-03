import {
  ButtonLogout,
  ContainerActualFlu,
  ContainerHeader,
  ContainerLogoLogout,
  LabelActualFlu,
  LogoLogout,
  OptionSelect,
  SelectActualFlu,
} from './Header.styled';

import logout from '../../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN_PATH } from 'pages/paths';
import { gql, useMutation } from '@apollo/client';
import { LogOutMutation } from 'gql/graphql';
import { toast } from 'react-toastify';

const LOGOUT = gql`
  mutation LogOut {
    logOut {
      id
    }
    removeCookie
  }
`;

const Header = (data: any | null) => {
  const navigate = useNavigate();

  const [logOut] = useMutation<LogOutMutation>(LOGOUT);

  let flows: Array<any> = [];
  let hasData: boolean = false;
  if (data.data) {
    flows = data.data.myProfile.flows;
    hasData = true;
  }

  const logOutNavigation = async () => {
    navigate(SIGN_IN_PATH);
    try {
      await logOut();
    } catch (error) {
      toast.error('Une Erreur est survenue lors de la déconnexion.');
    }
  };

  return (
    <ContainerHeader>
      <ContainerActualFlu>
        <LabelActualFlu> Flu Actuel : </LabelActualFlu>
        <SelectActualFlu>
          {hasData
            ? flows.map((e) => {
                return <OptionSelect key={e.id}>{e.flowName}</OptionSelect>;
              })
            : null}
        </SelectActualFlu>
      </ContainerActualFlu>
      <ButtonLogout onClick={() => logOutNavigation()}>
        <ContainerLogoLogout>
          <LogoLogout src={logout}></LogoLogout>
        </ContainerLogoLogout>
        Se déconnecter
      </ButtonLogout>
    </ContainerHeader>
  );
};
export default Header;
