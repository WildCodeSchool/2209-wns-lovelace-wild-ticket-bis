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
import { Image, Text, StyleSheet } from 'react-native';

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
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
            } else if (route.name === 'QR Code') {
              iconName = 'qr-code-outline';
            } else if (route.name === 'Corbeille') {
              iconName = 'trash-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={iconeSize} color={color} />;
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  link: {
    fontSize: 12,
    color: `${TITLE_FONT_COLOR}`,
  },
});

export default Navigation;