import { Button, TextInput, View, Text, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { SignInMutation, SignInMutationVariables } from '../../gql/graphql';
import { SIGN_IN } from '../../gql-store';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

const userSchema = Yup.object({
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short')
    .required('Password is required'),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    paddingTop: 30,
    backgroundColor: `#fefefe`,
    alignItems: 'center',
    justifyContent: 'center',

    gap: 20,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `#ecedf06e`,
    borderRadius: 15,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  input: {
    width: '70%',
    height: '15%',
    borderColor: 'black',
    borderWidth: 2,
  },
});

const SignIn = ({ navigation }) => {
  const initialValues = { emailAddress: '', password: '' };
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);
  const [signIn] = useMutation<SignInMutation, SignInMutationVariables>(
    SIGN_IN
  );
  const appContext = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/internalAppImg/logo_flu.png')}
      />
      <View style={styles.loginContainer}>
        <Text>Bonjour</Text>
        <Formik
          initialValues={{ emailAddress: '', password: '' }}
          onSubmit={async (values) => {
            try {
              await signIn({
                variables: values,
              });
              appContext?.refetch();
              setIsSignInSuccess(true);
              appContext.setIsConnected(true);
              navigation.navigate('Mes Flux');
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Text>Addresse Mail</Text>
              <TextInput
                placeholder="Email Address"
                onChangeText={handleChange('emailAddress')}
                value={values.emailAddress}
                keyboardType="email-address"
                style={styles.input}
              />
              <Text>Mot de passe</Text>
              <TextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry
                style={styles.input}
              />
              <Button onPress={() => handleSubmit()} title="Se connecter" />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SignIn;
