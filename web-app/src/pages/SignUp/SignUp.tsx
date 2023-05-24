import { useMutation } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SignUpMutation, SignUpMutationVariables } from '../../gql/graphql';
import { SIGN_IN_PATH } from '../paths';
import {
  ContainerInput,
  FormContainer,
  SignUpLeft,
  SignUpRight,
  FooterForm,
  InputForm,
  LabelForm,
  TextWrongPassword,
  TextGoodPassword,
} from './SignUp.styled';
import {
  GlobalFormContainer,
  LinkFooter,
  ButtonLabel,
  LabelTitle,
  TextLabel,
  SignContainer,
  GlobalLogoContainer,
} from '../SignIn/SignIn.styled';
import Logo from 'components/Logo/Logo';
import { SIGN_UP } from 'gql-store';
import { AppContext } from 'context/AppContext';

type props = {
  displayNavbar: (isItDisplayed: boolean) => void;
};

const SignUp = ({ displayNavbar }: props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setconfirmedPassword] = useState('');
  const appContext = useContext(AppContext);

  const [signUp] = useMutation<SignUpMutation, SignUpMutationVariables>(
    SIGN_UP
  );
  const navigate = useNavigate();

  const submit = async () => {
    if (password !== confirmedPassword) {
      toast.warning('Confirmation du mot de passe erronée');
    } else {
      try {
        await signUp({
          variables: { firstName, lastName, emailAddress, password },
        });
        toast.success(
          'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.'
        );
        appContext?.refetch();
        navigate(SIGN_IN_PATH);
      } catch (error) {
        toast.error(
          'Un problème est survenue. Veuillez réessayer ultérieurement.'
        );
      }
    }
  };

  useEffect(() => {
    displayNavbar(false);
    return () => {
      displayNavbar(false);
    };
  });

  return (
    <SignContainer>
      <GlobalLogoContainer>
        <Logo />
      </GlobalLogoContainer>
      <GlobalFormContainer
        key="signUpKey"
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
        }}
        exit={{ x: 1000, opacity: 0 }}
      >
        <FormContainer
          aria-label="form"
          onSubmit={async (event) => {
            event.preventDefault();
            await submit();
          }}
        >
          <LabelTitle>S'inscrire</LabelTitle>
          <ContainerInput>
            <SignUpLeft>
              <LabelForm>
                <TextLabel> Prénom</TextLabel>
                <InputForm
                  type="text"
                  required
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </LabelForm>
              <LabelForm>
                <TextLabel>Nom</TextLabel>

                <InputForm
                  type="text"
                  required
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </LabelForm>

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
            </SignUpLeft>
            <SignUpRight>
              <LabelForm>
                <TextLabel>Mot de passe</TextLabel>

                <InputForm
                  type="password"
                  required
                  autoComplete="new-password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </LabelForm>
              <LabelForm>
                <TextLabel>Confirmer le mot de passe</TextLabel>

                <InputForm
                  type="password"
                  required
                  autoComplete="new-password"
                  id="confirmed-password"
                  name="confirmed-password"
                  value={confirmedPassword}
                  onChange={(event) => {
                    setconfirmedPassword(event.target.value);
                  }}
                />
                {password === confirmedPassword || confirmedPassword === '' ? (
                  <TextGoodPassword></TextGoodPassword>
                ) : (
                  <TextWrongPassword>Mot de passe différents</TextWrongPassword>
                )}
              </LabelForm>
              <FooterForm>
                Déjà un compte ?{' '}
                <Link to={SIGN_IN_PATH}>
                  <LinkFooter> Se connecter</LinkFooter>
                </Link>{' '}
              </FooterForm>
            </SignUpRight>
          </ContainerInput>
          <ButtonLabel>S'enregistrer</ButtonLabel>
        </FormContainer>
      </GlobalFormContainer>
    </SignContainer>
  );
};

export default SignUp;
