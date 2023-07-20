import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MesFlux from '../../screens/MesFlux/MesFlux';
import Tickets from '../../screens/Tickets/Tickets';
import { Ionicons } from '@expo/vector-icons';
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
  SELECT_LINK_COLOR,
  TEXT_FONT_COLOR,
  TITLE_FONT_COLOR,
} from '../../styles/style-constants';
import { Image, Text, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from '../../screens/SignIn/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import SignOut from '../../screens/SignOut/SignOut';

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const appContext = useContext(AppContext);

  useEffect(() => {
    const fetchCookie = async () => {
      try {
        const cookieValue = await AsyncStorage.getItem('Cookie');
        const sessionIdIndex = cookieValue.indexOf('sessionId=');
        if (sessionIdIndex !== -1) {
          const sessionId = cookieValue.substring(
            sessionIdIndex + 'sessionId='.length
          );
          console.log('Session ID : ', sessionId);
          appContext.setIsConnected(true);
        } else {
          console.log('sessionId non trouvé dans la chaîne de cookie.');
          appContext.setIsConnected(false);
        }
      } catch {
        console.log('sessionId non trouvé dans la chaîne de cookie.');
      }
    };
    fetchCookie(); // Appeler la fonction asynchrone immédiatement
  }, [appContext]);
  console.log(appContext.isConnected);
  return (
    <>
      <NavigationContainer>
        <SafeAreaProvider>
          {appContext.isConnected ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                  let iconName;
                  let iconeSize = 34;

                  if (route.name === 'Mes Flux') {
                    return (
                      <Image
                        source={require('../../assets/internalAppImg/Flu-icone.png')}
                        style={{ width: 39, resizeMode: 'contain' }}
                      />
                    );
                  } else if (route.name === 'Tickets') {
                    iconName = 'receipt-outline';
                  }

                  // You can return any component that you like here!
                  return (
                    <Ionicons name={iconName} size={iconeSize} color={color} />
                  );
                },
                tabBarStyle: {
                  height: 70,
                  borderTopColor: `${BOX_BORDER}`,
                },
                tabBarInactiveTintColor: `${TEXT_FONT_COLOR}`,
                tabBarActiveBackgroundColor: `${SELECT_LINK_COLOR}`,
                tabBarInactiveBackgroundColor: `${BOX_BACKGROUND_COLOR}`,
                tabBarActiveTintColor: `${TEXT_FONT_COLOR}`,
              })}
            >
              <Tab.Screen
                name="Mes Flux"
                component={MesFlux}
                options={{
                  tabBarLabel: () => <Text style={styles.link}>Mes Flux</Text>,
                }}
              />
              <Tab.Screen
                name="Tickets"
                component={Tickets}
                options={{
                  tabBarLabel: () => <Text style={styles.link}>Tickets</Text>,
                }}
              />

              <Tab.Screen
                name="SignOut"
                component={SignOut}
                options={{
                  tabBarLabel: () => <Text style={styles.link}>SignOut</Text>,
                }}
              />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarStyle: {
                  display: 'none',
                },
              })}
            >
              <Tab.Screen
                name="SignIn"
                component={SignIn}
              />
            </Tab.Navigator>
          )}
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 12,
    color: `${TITLE_FONT_COLOR}`,
  },
});

export default Navigation;
