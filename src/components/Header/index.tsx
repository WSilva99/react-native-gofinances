import { Container, HeaderBackground, Title } from "./styles";

interface HeaderProps {
  title: string;
}

export function Header({title}: HeaderProps) {
  return (
    <Container>
      <HeaderBackground>
        <Title>{title}</Title>
      </HeaderBackground>
    </Container>
  )
}