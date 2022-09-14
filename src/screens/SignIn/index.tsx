import { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Device from 'expo-device';

import { Container, Content, Header, Logo, Title, VP } from "./styles";
import { useTheme } from "styled-components";

import { useAuth } from "../../hooks/auth";

import { SignInButton } from "../../components/SignInButton";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      await signInWithApple();
    } catch (error: any) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <Logo name="dollar-sign" />
        <VP>
          Controle suas {'\n'}
          finanças de forma  {'\n'}
          muito simples
        </VP>
        <Title>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </Title>
      </Header>
      <Content>
        <SignInButton 
          text="Entrar com Google"
          onPress={handleSignInWithGoogle}
          icon={
            <Ionicons
              name={'logo-google'}
              size={RFValue(24)}
            />
          }
        />
        { Device.brand === 'Apple' && (
          <SignInButton 
            text="Entrar com Apple"
            onPress={handleSignInWithApple}
            icon={
              <Ionicons
                name={'logo-apple'}
                size={RFValue(24)}
              />
            }
          />
        )}
        { isLoading && <ActivityIndicator color={theme.colors.shape} size="large" style={{marginTop: 18}} /> }
      </Content>
    </Container>
  )
}