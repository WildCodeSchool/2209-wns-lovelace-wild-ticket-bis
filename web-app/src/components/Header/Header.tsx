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
import { Flow, LogOutMutation } from 'gql/graphql';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
import Select from 'react-select';
import Loader from 'components/Loader';

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
  const [flows, setFlows] = useState<Flow[] | undefined>();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (data.data) {
      setFlows(data.data.myProfile.flows);
    }
  }, [data]);

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
          {flowOptions ? (
            <Select
              onChange={handleChangeSelectedFlow}
              defaultValue={flowOptions[0]}
              options={flowOptions}
            />
          ) : (
            <Loader />
          )}
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
