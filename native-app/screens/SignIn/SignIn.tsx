import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { SignInMutation, SignInMutationVariables } from '../../gql/graphql';
import { SIGN_IN } from '../../gql-store';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';



const SignIn = () => {
  const initialValues = { emailAddress: '', password: '' };
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);
  const [signIn] = useMutation<SignInMutation, SignInMutationVariables>(
    SIGN_IN
  );
  const appContext = useContext(AppContext);

  const [darkMode, setDarkMode] = useState<boolean>();
  useEffect(() => {
    if (appContext) {
      setDarkMode(appContext.darkMode);
    }
  }, [appContext]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      backgroundColor: `${darkMode ? '#2D2D30' : 'white'}`,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      // margin: 10,
      // borderColor: 'rgba(42, 42, 42, 0.2)',
      borderWidth: 1,
    },
    loginContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: `#ecedf06e`,
      borderColor: 'rgba(42, 42, 42, 0.2)',
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 10,
      borderWidth: 1,
      borderRadius: 15,
      width: '100%',
      height: '100%',
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 10,
      backgroundColor: `${darkMode ? '#ecedf06e' : 'white'}`,
      borderWidth: 1,
    },
    form: {
      height: '80%',
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '70%',
      height: '10%',
      borderColor: 'rgba(42, 42, 42, 0.2)',
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 2,
      minHeight: '10%',
      paddingLeft: 10,
    },
    textWelcome: {
      fontFamily: 'Quicksand_400Regular',
      fontSize: 30,
      margin: 15,
      color: `${darkMode ? 'white' : 'black'}`,
    },
    textInput: {
      fontFamily: 'Quicksand_400Regular',
      fontSize: 20,
      margin: 15,
      alignSelf: 'flex-start',
      color: `${darkMode ? 'white' : 'black'}`,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: '500',
      letterSpacing: 0.25,
      color: '#2a2a2a',
      fontFamily: 'Quicksand_400Regular',
    },
    button: {
      alignItems: 'center',
      margin: 10,
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#FF9442',
    },
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/internalAppImg/transparant-flux-logo.png')}
      />
      <View style={styles.loginContainer}>
        <Text style={styles.textWelcome}>Bonjour</Text>
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
              // navigation.navigate('Mes Flux');
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.form}>
              <Text style={styles.textInput}>Addresse Mail</Text>
              <TextInput
                placeholder="Email Address"
                onChangeText={handleChange('emailAddress')}
                value={values.emailAddress}
                keyboardType="email-address"
                style={styles.input}
              />
              <Text style={styles.textInput}>Mot de passe</Text>
              <TextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry
                style={styles.input}
              />
              <Pressable style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.text}>Se connecter</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SignIn;
