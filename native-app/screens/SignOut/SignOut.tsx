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
      console.error('Une Erreur est survenue lors de la déconnexion.');
    }
    setIsModalVisible(false);
  };

  // Fonction pour vider le cache d'Apollo

  return (
    <View>
      <Button title="Déconnexion" onPress={() => setIsModalVisible(true)} />
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Êtes-vous sûr de vouloir vous déconnecter ?
            </Text>
            <Button title="Oui" onPress={handleLogout} />
            <Button title="Non" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlign: 'center',
  },
});
export default SignOut;
