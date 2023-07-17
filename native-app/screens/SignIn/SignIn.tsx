import { Button, TextInput, View, Text, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

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
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});

const SignIn = () => {
  const initialValues = { email: '', password: '' };
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/internalAppImg/logo_flu.png')}
      />
      <View style={styles.loginContainer}>
        <Text>Bonjour</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Text>Addresse Mail</Text>
              <TextInput
                placeholder="Email Address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <Text>Mot de passe</Text>
              <TextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              <Button onPress={() => handleSubmit} title="Se connecter" />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default SignIn;
