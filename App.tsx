import { View, Text, StatusBar, ActivityIndicator } from 'react-native';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';

// Importando pq crasha no android
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import default_theme from './src/global/styles/theme';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LoadIndicator } from './src/components/LoadIndicator';

import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={default_theme}>
        <StatusBar barStyle={'default'} />

        { !fontsLoaded ? (
          <LoadIndicator />
        ) : (
          <AuthProvider>
            {/* <NavigationContainer>
              <AppRoutes />
            </NavigationContainer> */}
            <SignIn />
          </AuthProvider>
        )}
        
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
