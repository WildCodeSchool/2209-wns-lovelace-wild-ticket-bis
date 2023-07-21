import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignInMutation, SignInMutationVariables } from '../../gql/graphql';
import { PropsDisplayNavbar, getErrorMessage } from '../../utils';
import { MES_FLUX_PATH, SIGN_UP_PATH } from '../paths';
import {
  GlobalFormContainer,
  ButtonLabel,
  ContainerInput,
  FooterForm,
  FormContainer,
  InputForm,
  LabelForm,
  LabelTitle,
  LinkFooter,
  TextLabel,
  SignContainer,
  GlobalLogoContainer,
  ShowHidePasswordButton,
  ContainerPasswordInput,
} from './SignIn.styled';
import Logo from 'components/Logo/Logo';
import { SIGN_IN } from 'gql-store';
import { AppContext } from 'context/AppContext';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { TEXT_FONT_COLOR } from 'styles/style-constants';

const SignIn = ({ displayNavbar }: PropsDisplayNavbar) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const appContext = useContext(AppContext);

  const [signIn] = useMutation<SignInMutation, SignInMutationVariables>(
    SIGN_IN
  );
  const navigate = useNavigate();

  const clickOnLogin = async () => {
    try {
      await signIn({
        variables: { emailAddress, password },
      });
      setIsSignInSuccess(true);
      toast.success(`Vous vous êtes connecté avec succès.`);
      appContext?.refetch();
      navigate(MES_FLUX_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const clickOnEye = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  useEffect(() => {
    displayNavbar(false);
    return () => {
      isSignInSuccess ? displayNavbar(true) : displayNavbar(false);
    };
  });

  return (
    <SignContainer>
      {isSignInSuccess ? (
        <GlobalLogoContainer initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Logo isNavbarDisplayed={false} />
        </GlobalLogoContainer>
      ) : (
        <GlobalLogoContainer>
          <Logo isNavbarDisplayed={false} />
        </GlobalLogoContainer>
      )}
      <GlobalFormContainer
        key="signInKey"
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
        }}
        exit={{ x: -1000, opacity: 0 }}
      >
        <FormContainer aria-label="form">
          <LabelTitle>Bonjour</LabelTitle>
          <ContainerInput>
            <LabelForm>
              <TextLabel>Adresse email</TextLabel>
              <InputForm
                type="email"
                required
                autoComplete="email"
                id="emailAddress"
                name="emailAddress"
                value={emailAddress}
                onChange={(event) => {
                  setEmailAddress(event.target.value);
                }}
              />
            </LabelForm>
            <LabelForm>
              <TextLabel>Mot de passe</TextLabel>
              <ContainerPasswordInput>
                <InputForm
                  type={isPasswordHidden ? 'password' : 'text'}
                  required
                  autoComplete="current-password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <ShowHidePasswordButton
                  type="button"
                  onClick={() => clickOnEye()}
                >
                  {isPasswordHidden ? (
                    <BsEye color={TEXT_FONT_COLOR} />
                  ) : (
                    <BsEyeSlash color={TEXT_FONT_COLOR} />
                  )}
                </ShowHidePasswordButton>
              </ContainerPasswordInput>
            </LabelForm>
          </ContainerInput>
          <ButtonLabel type="button" onClick={() => clickOnLogin()}>
            Se connecter
          </ButtonLabel>
          <FooterForm>
            Pas encore de compte ?{' '}
            <Link to={SIGN_UP_PATH}>
              <LinkFooter> S'inscrire</LinkFooter>
            </Link>{' '}
          </FooterForm>
        </FormContainer>
      </GlobalFormContainer>
    </SignContainer>
  );
};

export default SignIn;
