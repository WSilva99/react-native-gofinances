import { Container, Header, HighlightCards, Icon, Photo, Title, Transactions, TransactionsList, User, UserGreeting, UserInfo, UserName } from "./styles";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionProps } from "../../components/TransactionCard";

export interface TransactionData extends TransactionProps {
  id: string;
}

export function Dashboard() {
  const transactions: TransactionData[] = [
    {
      id: '1',
      type: 'deposit',
      title: 'Desenvolimento do GoFinances',
      amount: 'R$ 17.400,00',
      date: '21/08/2022',
      category: {
        name: 'Cartão de Crédito',
        icon: 'credit-card'
      }
    },
    {
      id: '2',
      type: 'withdraw',
      title: 'Mousepad xl',
      amount: 'R$ 120,00',
      date: '21/08/2022',
      category: {
        name: 'Acessórios',
        icon: 'shopping-bag'
      }
    },
    {
      id: '3',
      type: 'withdraw',
      title: 'RGB LED',
      amount: 'R$ 85,00',
      date: '21/08/2022',
      category: {
        name: 'Eletrônicos',
        icon: 'smartphone'
      }
    },
    {
      id: '4',
      type: 'withdraw',
      title: 'Combo Mec 8',
      amount: 'R$ 42,00',
      date: '21/08/2022',
      category: {
        name: 'Comida',
        icon: 'coffee'
      }
    },
  ]

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

        <Transactions>
          <Title>Transações</Title>

          <TransactionsList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TransactionCard data={item} />}
          />
        </Transactions>
      </Container>
    </>
  )
}