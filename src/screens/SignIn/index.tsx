import { Container, Content, Header, Logo, Title, VP } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { SignInButton } from "../../components/SignInButton";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const { user } = useAuth();

  console.log(user);

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
          icon={
            <Ionicons
              name={'logo-google'}
              size={RFValue(24)}
            />
          }
        />
        <SignInButton 
          text="Entrar com Apple"
          icon={
            <Ionicons
              name={'logo-apple'}
              size={RFValue(24)}
            />
          }
        />
      </Content>
    </Container>
  )
}