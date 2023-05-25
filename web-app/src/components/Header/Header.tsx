import {
  ButtonLogout,
  ContainerActualFlu,
  ContainerHeader,
  LabelActualFlu,
  SelectActualFlu,
} from './Header.styled';

import { useNavigate } from 'react-router-dom';
import { SIGN_IN_PATH } from 'pages/paths';
import { gql, useMutation } from '@apollo/client';
import { LogOutMutation } from 'gql/graphql';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
import Select, { SingleValue } from 'react-select';
import { SlLogout } from 'react-icons/sl';

const LOGOUT = gql`
  mutation LogOut {
    logOut {
      id
    }
    removeCookie
  }
`;
type Flow = {
  __typename?: 'Flow' | undefined;
  flowName: string;
  id: string;
};

const Header = () => {
  const navigate = useNavigate();

  const [logOut] = useMutation<LogOutMutation>(LOGOUT);
  const [flows, setFlows] = useState<Flow[]>([]);
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

  const handleChangeSelectedFlow = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption)
      appContext?.setSelectedFlow({
        label: selectedOption?.label,
        value: selectedOption?.value,
      });
  };

  const flowOptions = flows?.map((flow: Flow) => ({
    value: flow.id,
    label: flow.flowName,
  }));

  return (
    <ContainerHeader>
      <ContainerActualFlu>
        <LabelActualFlu> Flu Actuel : </LabelActualFlu>
        <SelectActualFlu>
          <Select
            onChange={(
              selectedValue: SingleValue<{
                value: string;
                label: string;
              }>
            ) => handleChangeSelectedFlow(selectedValue)}
            options={flowOptions}
            isLoading={isLoading}
          />
        </SelectActualFlu>
      </ContainerActualFlu>
      <ButtonLogout onClick={() => logOutNavigation()}>
        <SlLogout size={23} />
        Se déconnecter
      </ButtonLogout>
    </ContainerHeader>
  );
};
export default Header;
