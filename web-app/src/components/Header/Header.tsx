import {
  ButtonLogout,
  ContainerActualFlu,
  ContainerHeader,
  ContainerLogoLogout,
  LabelActualFlu,
  LogoLogout,
  SelectActualFlu,
} from './Header.styled';

import logout from '../../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN_PATH } from 'pages/paths';
import { gql, useMutation } from '@apollo/client';
import { LogOutMutation } from 'gql/graphql';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
import Select from 'react-select';

const LOGOUT = gql`
  mutation LogOut {
    logOut {
      id
    }
    removeCookie
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const [logOut] = useMutation<LogOutMutation>(LOGOUT);
  const [flows, setFlows] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.userProfile?.myProfile.flows) {
      setFlows(appContext.userProfile.myProfile.flows);
      setIsLoading(false);
    }
  }, [appContext]);

  const logOutNavigation = async () => {
    navigate(SIGN_IN_PATH);
    try {
      await logOut();
    } catch (error) {
      toast.error('Une Erreur est survenue lors de la déconnexion.');
    }
  };

  const handleChangeSelectedFlow = (selectedOption: any) => {
    appContext?.setSelectedFlow(selectedOption);
  };

  const flowOptions = flows?.map((flow: any) => ({
    value: flow.flowName,
    label: flow.flowName,
  }));

  return (
    <ContainerHeader>
      <ContainerActualFlu>
        <LabelActualFlu> Flu Actuel : </LabelActualFlu>
        <SelectActualFlu>
          <Select
            onChange={handleChangeSelectedFlow}
            options={flowOptions}
            isLoading={isLoading}
          />
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
