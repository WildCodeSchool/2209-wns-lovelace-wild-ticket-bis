import { useApolloClient, useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { LogOutMutation } from '../../gql/graphql';
import { LOGOUT } from '../../gql-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../context/AppContext';

const SignOut = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logOut] = useMutation<LogOutMutation>(LOGOUT);
  const appContext = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await logOut();
      await AsyncStorage.removeItem('Cookie');
      appContext.setIsConnected(false);
    } catch (error) {
      console.log(error);
      console.error('Une Erreur est survenue lors de la déconnexion.', error);
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <Pressable style={styles.button} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.text}>Déconnexion</Text>
      </Pressable>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Êtes-vous sûr de vouloir vous déconnecter ?
            </Text>
            <Pressable style={styles.buttonYes} onPress={handleLogout}>
              <Text style={styles.textYes}>Oui</Text>
            </Pressable>
            <Pressable
              style={styles.buttonNo}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.textNo}>Non</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,

    backgroundColor: '#FF9442',
  },
  buttonYes: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FF9442',
    margin: 10,
  },
  buttonNo: {
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#E7E7E7',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#2a2a2a',
    fontFamily: 'Quicksand_400Regular',
  },
  textYes: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#2a2a2a',
    fontFamily: 'Quicksand_400Regular',
  },
  textNo: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
    color: '#2a2a2a',
    fontFamily: 'Quicksand_400Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Quicksand_400Regular',
    textAlign: 'center',
  },
});
export default SignOut;
