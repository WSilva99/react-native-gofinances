import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import * as Device from 'expo-device';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 60,
          paddingBottom: Device.brand === 'Apple' ? 10 : 0,
        }
      }}
    >
      <Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Cadastro"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="dollar-sign" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Resumo"
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />

    </Navigator>
  )
}