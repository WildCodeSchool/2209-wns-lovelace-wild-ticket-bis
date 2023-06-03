import {
  ButtonLogout,
  ContainerActualFlu,
  ContainerHeader,
  LabelActualFlu,
  SelectActualFlu,
} from './Header.styled';

import { useNavigate } from 'react-router-dom';
import { SIGN_IN_PATH } from 'pages/paths';
import { useMutation } from '@apollo/client';
import { LogOutMutation } from 'gql/graphql';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
import Select, { SingleValue } from 'react-select';
import { SlLogout } from 'react-icons/sl';
import { LOGOUT } from 'gql-store';
import LogoResponsive from 'components/Logo/LogoResponsive';

type Flow = {
  __typename?: 'Flow' | undefined;
  flowName: string;
  id: string;
};

type Props = {
  isLogoDisplayed: boolean;
};

const Header = ({ isLogoDisplayed }: Props) => {
  const navigate = useNavigate();

  const [logOut] = useMutation<LogOutMutation>(LOGOUT);
  const [flowsOptions, setFlowsOptions] = useState<
    { value: string; label: string }[] | null
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialFlowSelected, setIsInitialFlowSelected] = useState(false);
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.userProfile?.myProfile.flows) {
      const flowOptions = appContext.userProfile.myProfile.flows.map(
        (flow: Flow) => ({
          value: flow.id,
          label: flow.flowName,
        })
      );
      setFlowsOptions(flowOptions);
      setIsLoading(false);

      //If one flow is created: The first one flow is selected automaticaly
      if (flowOptions.length > 0 && isInitialFlowSelected === false) {
        appContext?.setSelectedFlow({
          label: flowOptions[0].label,
          value: flowOptions[0].value,
        });
        setIsInitialFlowSelected(true);
      } else if (flowOptions.length === 0) {
        setIsInitialFlowSelected(false);
      }
    }
  }, [appContext, isInitialFlowSelected]);

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
  return (
    <ContainerHeader>
      <LogoResponsive isLogoDisplayed={isLogoDisplayed} />
      <ContainerActualFlu>
        <LabelActualFlu> Flu Actuel : </LabelActualFlu>
        <SelectActualFlu>
          {flowsOptions && flowsOptions.length > 0 ? (
            <Select
              onChange={(
                selectedValue: SingleValue<{
                  value: string;
                  label: string;
                }>
              ) => handleChangeSelectedFlow(selectedValue)}
              options={flowsOptions}
              isLoading={isLoading}
              value={appContext?.selectedFlow}
              defaultInputValue={flowsOptions[0].label}
            />
          ) : (
            <Select value={null} />
          )}
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
