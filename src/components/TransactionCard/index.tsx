import { Amount, Category, CategoryIcon, CategoryName, Container, Date, Footer, Title } from "./styles";
import { categories } from "../../utils/categories";
import { useEffect, useState } from "react";

interface Category {
  key: string;
  name: string;
  icon: string;
  color: string;
}

export interface TransactionProps {
  type: 'deposit' | 'withdraw';
  description: string;
  amount: string;
  date: string;
  categoryKey: string;
}

interface TransactionCardProps {
  data: TransactionProps;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const category = categories.find(item => item.key === data.categoryKey) ||
    categories.find(item => item.key === 'others') as Category;

  return (
    <Container>
      <Title>{data.description}</Title>
      <Amount type={data.type}>{(data.type === 'deposit') ? data.amount : `- ${data.amount}`}</Amount>
      <Footer>
        <Category>
          <CategoryIcon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}