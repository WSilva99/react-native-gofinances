import { Container, Header, Icon, Photo, User, UserGreeting, UserInfo, UserName } from "./styles";

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
      </Container>
    </>
  )
}