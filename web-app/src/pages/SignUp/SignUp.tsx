import { gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { SignUpMutation, SignUpMutationVariables } from '../../gql/graphql'
import { getErrorMessage } from '../../utils'
import { SIGN_IN_PATH } from '../paths'
import {
  ButtonLabel,
  ContainerInput,
  FormContainer,
  InputForm,
  LabelForm,
  LabelTitle,
  Logo,
  SignUpContainer,
  TextLabel,
} from './SignUp.styled'
import './SignUp.styled.tsx'
import imglogo from '../../logo_flu.png'

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
`

const SignUp = ({ displayNavbar }: any) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const [signUp, { loading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP)
  const navigate = useNavigate()

  const submit = async () => {
    try {
      await signUp({
        variables: { firstName, lastName, emailAddress, password },
      })
      toast.success(
        `Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.`,
      )
      navigate(SIGN_IN_PATH)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  useEffect(() => {
    displayNavbar(false)
  })

  return (
    <SignUpContainer>
      <Logo src={imglogo} />
      <FormContainer
        onSubmit={async (event) => {
          event.preventDefault()
          await submit()
        }}
      >
        <LabelTitle>S'inscrire</LabelTitle>
        <ContainerInput>
          <LabelForm>
            <TextLabel> Prénom</TextLabel>
            <InputForm
              type="text"
              required
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value)
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
                setLastName(event.target.value)
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
                setEmailAddress(event.target.value)
              }}
            />
          </LabelForm>

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
                setPassword(event.target.value)
              }}
            />
          </LabelForm>
        </ContainerInput>

        <ButtonLabel disabled={loading}>
          {loading ? <Loader /> : 'Valider'}
        </ButtonLabel>
      </FormContainer>
    </SignUpContainer>
  )
}

export default SignUp
