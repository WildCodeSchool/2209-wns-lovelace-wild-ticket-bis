import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BACKGROUND_COLOR } from './styles/style-constants';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome in Flux !</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${BACKGROUND_COLOR}`,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
