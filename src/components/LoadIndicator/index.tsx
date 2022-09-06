import { Container } from "./styles";
import { useTheme } from "styled-components";
import { ActivityIndicator } from "react-native";

export function LoadIndicator() {
  const theme = useTheme();
  return (
    <Container>
      <ActivityIndicator 
        color={theme.colors.primary}
        size="large"
      />
    </Container>
  );
}