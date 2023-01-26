import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignUpMutation, SignUpMutationVariables } from "../../gql/graphql";
import { getErrorMessage } from "../../utils";
import { SIGN_IN_PATH } from "../paths";
import "./SignUp.styled.tsx";
import {
  ContainerInput,
  FormContainer,
  SignUpLeft,
  SignUpRight,
  FooterForm,
  InputForm,
  LabelForm,
} from "./SignUp.styled";
import {
  GlobalFormContainer,
  LinkFooter,
  ButtonLabel,
  LabelTitle,
  TextLabel,
} from "../SignIn/SignIn.styled";

const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $emailAddress: String!
    $password: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      emailAddress: $emailAddress
      password: $password
    ) {
      id
      emailAddress
    }
  }
`;

const SignUp = ({ displayNavbar }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setconfirmedPassword] = useState("");

  const [signUp] = useMutation<SignUpMutation, SignUpMutationVariables>(
    SIGN_UP
  );
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await signUp({
        variables: { firstName, lastName, emailAddress, password },
      });
      toast.success(
        `Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.`
      );
      navigate(SIGN_IN_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    displayNavbar(false);
    return () => {
      displayNavbar(false);
    };
  });

  return (
    <GlobalFormContainer
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 20,
      }}
      exit={{ x: 1000, opacity: 0 }}
    >
      <FormContainer
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
                name="confirmed-password"
                value={confirmedPassword}
                onChange={(event) => {
                  setconfirmedPassword(event.target.value);
                }}
              />
            </LabelForm>
            <LabelForm>
              <TextLabel>Confirmer le mot de passe</TextLabel>

              <InputForm
                type="password"
                required
                autoComplete="new-password"
                id="sign-up-password"
                name="sign-up-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </LabelForm>
            <FooterForm>
              Déjà un compte ?{" "}
              <Link to={SIGN_IN_PATH}>
                <LinkFooter> Se connecter</LinkFooter>
              </Link>{" "}
            </FooterForm>
          </SignUpRight>
        </ContainerInput>
        <ButtonLabel>S'enregistrer</ButtonLabel>
      </FormContainer>
    </GlobalFormContainer>
  );
};

export default SignUp;

