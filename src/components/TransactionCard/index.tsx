import { Amount, Category, CategoryIcon, CategoryName, Container, Date, Footer, Title } from "./styles";

interface Category {
  name: string;
  icon: string;
}

export interface TransactionProps {
  type: 'deposit' | 'withdraw';
  title: string;
  amount: string;
  date: string;
  category: Category;
}

interface TransactionCardProps {
  data: TransactionProps;
}

export function TransactionCard({ data }: TransactionCardProps) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>{(data.type === 'deposit') ? data.amount : `- ${data.amount}`}</Amount>
      <Footer>
        <Category>
          <CategoryIcon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}