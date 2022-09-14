import { StatusBar } from 'react-native';
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

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LoadIndicator } from './src/components/LoadIndicator';

import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { loadingStorageUser } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={default_theme}>
        <StatusBar barStyle={'default'} />

        { !fontsLoaded || loadingStorageUser ? (
          <LoadIndicator />
        ) : (
          <AuthProvider>
            <Routes />
          </AuthProvider>
        )}
        
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
