import { SafeAreaView, Text, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_700Bold 
} from '@expo-google-fonts/poppins';

import default_theme from './src/global/styles/theme';

import { Register } from './src/screens/Register';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Load</Text>;
  }

  return (
    <ThemeProvider theme={default_theme}>
      <StatusBar barStyle={'default'} />
      <SafeAreaView style={{flex: 1}}>
        <Register />
      </SafeAreaView>
    </ThemeProvider>
  );
}
