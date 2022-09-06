import { Amount, Container, Content, Header, Icon, LastTransaction, Title } from "./styles";

interface HighlightCardProps {
  type: 'deposit' | 'withdraw' | 'total';
  amount: string;
  lastTransaction?: string;
}

const TitleCard = {
  deposit: 'Entradas',
  withdraw: 'Saídas',
  total: 'Total'
}

const IconCard = {
  deposit: 'arrow-up-circle',
  withdraw: 'arrow-down-circle',
  total: 'dollar-sign',
}

export function HighlightCard({ type, amount, lastTransaction }: HighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{TitleCard[type]}</Title>
        <Icon name={IconCard[type]} type={type} size={32} />
      </Header>
      <Content>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Content>
    </Container>
  )
}