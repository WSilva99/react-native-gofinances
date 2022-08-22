import { Container, Header, HighlightCards, Icon, Photo, User, UserGreeting, UserInfo, UserName } from "./styles";
import { HighlightCard } from "../../components/HighlightCard";

export function Dashboard() {
  return (
    <>
      <Container>
        <Header>
          <UserInfo>
            <Photo source={{ uri: "https://avatars.githubusercontent.com/u/69635394?v=4" }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Walmir</UserName>
            </User>
          </UserInfo>
          <Icon name={'power'} />
        </Header>
        <HighlightCards>
          <HighlightCard
            type={'deposit'}
            amount={'R$ 17.400,00'}
            lastTransaction={'última entrada em 21/08'}
          />
          <HighlightCard
            type={'withdraw'}
            amount={'R$ 1.400,00'}
            lastTransaction={'última saída em 21/08'}
          />
          <HighlightCard
            type={'total'}
            amount={'R$ 16.000,00'}
            lastTransaction={'de 01/08 até 21/08'}
          />
        </HighlightCards>
      </Container>
    </>
  )
}