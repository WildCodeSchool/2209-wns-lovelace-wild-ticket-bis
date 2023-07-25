import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MesFlux from '../../screens/MesFlux/MesFlux';
import Tickets from '../../screens/Tickets/Tickets';
import { Ionicons } from '@expo/vector-icons';
import {
  BOX_BACKGROUND_COLOR,
  BOX_BORDER,
} from '../../styles/style-constants';
import { Image, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignIn from '../../screens/SignIn/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';


const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const appContext = useContext(AppContext);

  useEffect(() => {
    const fetchCookie = async () => {
      // await AsyncStorage.removeItem('Cookie');
      try {
        const cookieValue = await AsyncStorage.getItem('Cookie');
        const sessionIdIndex = cookieValue.indexOf('sessionId=');
        if (sessionIdIndex !== -1) {
          const sessionId = cookieValue.substring(
            sessionIdIndex + 'sessionId='.length
          );
          
          appContext.setIsConnected(true);
        } else {
          appContext.setIsConnected(false);
        }
      } catch {
        console.error('sessionId non trouvé dans la chaîne de cookie.');
      }
    };
    fetchCookie(); // Appeler la fonction asynchrone immédiatement
  }, [appContext]);

  const [darkMode, setDarkMode] = useState<boolean>();
  useEffect(() => {
    if (appContext) {
      setDarkMode(appContext.darkMode);
    }
  }, [appContext]);
  const styles = StyleSheet.create({
    link: {
      fontSize: 12,
      color: `${darkMode ? 'white' : 'black'}`,
    },
  });
  return (
    <>
      <NavigationContainer>
        <SafeAreaProvider>
          {appContext.isConnected ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                //  headerShown: false,
                headerStyle: {
                  backgroundColor: `${darkMode ? '#2D2D30' : '#fefefe'}`,
                },
                tabBarIcon: ({ color }) => {
                  let iconName;
                  let iconeSize = 34;

                  if (route.name === 'Mes Flux') {
                    return (
                      <Image
                        source={require('../../assets/internalAppImg/Flu-icone.png')}
                        style={{
                          width: 39,
                          resizeMode: 'contain',
                          tintColor: `${darkMode ? 'white' : 'black'}`,
                        }}
                      />
                    );
                  } else if (route.name === 'Tickets') {
                    iconName = 'receipt-outline';
                  }

                  // You can return any component that you like here!
                  return (
                    <Ionicons
                      name={iconName}
                      size={iconeSize}
                      color={`${darkMode ? 'white' : 'black'}`}
                    />
                  );
                },
                tabBarStyle: {
                  height: 60,
                  borderTopColor: `${darkMode ? 'black' : `${BOX_BORDER}`}`,
                },
                tabBarInactiveTintColor: `${darkMode ? 'white' : '#D3D3D3'}`,
                tabBarActiveBackgroundColor: `${
                  darkMode ? '#282A3A' : '#D3D3D3'
                }`,
                tabBarInactiveBackgroundColor: `${
                  darkMode ? 'gray' : `${BOX_BACKGROUND_COLOR}`
                }`,
                tabBarActiveTintColor: `${darkMode ? 'white' : '#2a2a2a'}`,
              })}
            >
              <Tab.Screen
                name="Mes Flux"
                component={MesFlux}
                options={{
                  headerTintColor: `${darkMode ? 'white' : '#2D2D30'}`,
                  tabBarLabel: () => <Text style={styles.link}>Mes Flux</Text>,
                }}
              />
              <Tab.Screen
                name="Tickets"
                component={Tickets}
                options={{
                  headerTintColor: `${darkMode ? 'white' : '#2D2D30'}`,
                  tabBarLabel: () => <Text style={styles.link}>Tickets</Text>,
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
                options={{
                  headerTintColor: `${darkMode ? 'white' : 'black'}`,
                }}
              />
            </Tab.Navigator>
          )}
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
