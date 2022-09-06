import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LogoutButton,
  Photo,
  Title,
  Transactions,
  TransactionsList,
  User,
  UserGreeting,
  UserInfo,
  UserName
} from "./styles";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionProps } from "../../components/TransactionCard";
import { useCallback, useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { LoadIndicator } from "../../components/LoadIndicator";

export interface TransactionData extends TransactionProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction?: string;
}

interface HighlightData {
  deposits: HighlightProps;
  withdraws: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  function getLastTransactionDate(
    transactions: TransactionData[],
    type: 'deposit' | 'withdraw'
  ) {
    const dateTransaction = transactions
      .filter(transaction => transaction.type === type)
      .reduce((acc, transaction) => {
        const date: Date = new Date(transaction.date);
        return (acc > date) ? acc : date;
      }, new Date(0));

    return `Última ${type === 'deposit' ? 'entrada' : 'saída'} dia ${dateTransaction.getDate()} de ${dateTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  function getPeriodTransactions(transactions: TransactionData[]) {
    const startDate = transactions.reduce((acc, transaction) => {
      const date: Date = new Date(transaction.date);
      return (acc > date) ? date : acc;
    }, new Date());

    const endDate = transactions.reduce((acc, transaction) => {
      const date: Date = new Date(transaction.date);
      return (acc < date) ? date : acc;
    }, new Date(0));

    return `${startDate.getDate()} à ${endDate.getDate()} de ${endDate.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransactions() {
    setIsLoading(true);
    const dataKey = "@gofinances:transactions";
    const data = await AsyncStorage.getItem(dataKey);
    const dataCurr = JSON.parse(data || "[]");

    let depositsTotal = 0;
    let withdrawsTotal = 0;

    const formatted: TransactionData[] = dataCurr.map(
      (transaction: TransactionData) => {

        if (transaction.type === "deposit") {
          depositsTotal += Number(transaction.amount);
        } else {
          withdrawsTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace("R$", "R$ ");
        const date = Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" }).format(new Date(transaction.date));
        return {
          id: transaction.id,
          description: transaction.description,
          amount,
          type: transaction.type,
          categoryKey: transaction.categoryKey,
          date,
        }
      }
    );

    setTransactions(formatted);

    setHighlightData({
      deposits: {
        amount: depositsTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace("R$", "R$ "),
        lastTransaction: getLastTransactionDate(dataCurr, "deposit"),
      },
      withdraws: {
        amount: withdrawsTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace("R$", "R$ "),
        lastTransaction: getLastTransactionDate(dataCurr, "withdraw"),
      },
      total: {
        amount: (depositsTotal - withdrawsTotal).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace("R$", "R$ "),
        lastTransaction: getPeriodTransactions(dataCurr),
      }
    });
    setIsLoading(false);
  }

  async function clearAsyncStorage() {
    await AsyncStorage.removeItem("@gofinances:transactions");
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );



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
          <LogoutButton onPress={() => { console.log('press') }}>
            <Icon name={'power'} />
          </LogoutButton>
        </Header>

        {isLoading ? (
          <LoadIndicator />
        ) : (
          <>
            <HighlightCards>
              <HighlightCard
                type={'deposit'}
                amount={highlightData.deposits.amount}
                lastTransaction={highlightData.deposits.lastTransaction}
              />
              <HighlightCard
                type={'withdraw'}
                amount={highlightData.withdraws.amount}
                lastTransaction={highlightData.withdraws.lastTransaction}
              />
              <HighlightCard
                type={'total'}
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
              />
            </HighlightCards>

            <Transactions>
              <Title>Transações</Title>
              {transactions.length > 0 ? (
                <TransactionsList
                  data={transactions}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <TransactionCard data={item} />}
                />
              ) : (
                <Text>Nenhuma transação encontrada</Text>
              )}
            </Transactions>
          </>
        )}
      </Container>
    </>
  )
}