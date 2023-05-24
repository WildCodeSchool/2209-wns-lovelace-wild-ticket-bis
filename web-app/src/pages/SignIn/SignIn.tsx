import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignInMutation, SignInMutationVariables } from '../../gql/graphql';
import { getErrorMessage } from '../../utils';
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
} from './SignIn.styled';
import Logo from 'components/Logo/Logo';
import { SIGN_IN } from 'gql-store';

const SignIn = ({ onSuccess, displayNavbar }: any) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);

  const [signIn] = useMutation<SignInMutation, SignInMutationVariables>(
    SIGN_IN
  );
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await signIn({
        variables: { emailAddress, password },
      });
      setIsSignInSuccess(true);
      toast.success(`Vous vous êtes connecté avec succès.`);
      onSuccess();
      navigate(MES_FLUX_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
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
          <Logo />
        </GlobalLogoContainer>
      ) : (
        <GlobalLogoContainer>
          <Logo />
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
        <FormContainer
          aria-label="form"
          onSubmit={async (event) => {
            event.preventDefault();
            await submit();
          }}
        >
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
              <InputForm
                type="password"
                required
                autoComplete="current-password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </LabelForm>
          </ContainerInput>
          <ButtonLabel>Se connecter</ButtonLabel>
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
