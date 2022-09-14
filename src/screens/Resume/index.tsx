import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "../../components/Header";
import { TotalByCategoryCard } from "../../components/TotalByCategoryCard";
import { ChartContainer, Container, Content, Month, MonthSelect, MonthSelectButton, MonthSelectIcon, Title, TotalByCategories } from "./styles";
import { useCallback, useState } from "react";
import { categories } from "../../utils/categories";
import { useFocusEffect } from "@react-navigation/native";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LoadIndicator } from "../../components/LoadIndicator";
import { useAuth } from "../../hooks/auth";

interface TransactionData {
  type: 'deposit' | 'withdraw';
  amount: string;
  categoryKey: string;
  date: string;
}

interface Category {
  key: string;
  name: string;
  icon: string;
  color: string;
}

export interface TotalByCategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  percent: string;
  color: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<TotalByCategoryData[]>([]);

  const { user } = useAuth();
  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadTotalByCategories() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions:user:${user.id}`;
    const data = await AsyncStorage.getItem(dataKey);
    const dataWithdraws = JSON.parse(data || "[]")
      .filter(
        (item: TransactionData) => item.type === "withdraw" &&
          new Date(item.date).getMonth() === selectedDate.getMonth() &&
          new Date(item.date).getFullYear() === selectedDate.getFullYear()
      ) as TransactionData[];

    const totalWithdraws = dataWithdraws.reduce(
      (acc: number, item: TransactionData) => acc + Number(item.amount), 0
    );

    const totalByCategory: TotalByCategoryData[] = 
      categories.map(
        (category: Category) => {
          let total = 0;
          dataWithdraws.forEach((item: TransactionData) => {
            if (item.categoryKey === category.key) {
              total += Number(item.amount);
            }
          });
          return {
            key: category.key,
            name: category.name,
            total: Number(total),
            totalFormatted: Number(total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
            percent: `${((total / totalWithdraws) * 100).toFixed(1)}%`,
            color: category.color,
          }
        }
      )
      .filter((item) => item.total > 0);
    
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadTotalByCategories();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header title="Resumo" />

      { isLoading ? (
        <LoadIndicator />
      ) : (
        <Content>
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>
            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>
            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          { totalByCategories.length > 0 ? (
            <>
              <ChartContainer>
                <VictoryPie
                  data={totalByCategories}
                  x="percent"
                  y="total"
                  colorScale={totalByCategories.map((item) => item.color)}
                  labelRadius={RFValue(80)}
                  style={{
                    labels: {
                      fontSize: RFValue(12),
                      fontWeight: "bold",
                      fill: theme.colors.shape,
                    }
                  }}
                />
              </ChartContainer>

              <TotalByCategories>
                <Title>
                  Total por categoria
                </Title>
                { totalByCategories.map((item) => (
                  <TotalByCategoryCard
                    key={item.key}
                    name={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                  />
                )) }
              </TotalByCategories>
            </>
          ) : (
            <ChartContainer>
              <Title>Não há dados para exibir</Title>
            </ChartContainer>
          )}
        </Content>
      )}
    </Container>
  )
}