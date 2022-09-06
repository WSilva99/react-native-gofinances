
import { categories } from "../../utils/categories";
import { Amount, Container, Title } from "./styles";
import { useEffect, useState } from "react";

interface HistoryCardProps {
  name: string;
  amount: string;
  color: string;
}

export function TotalByCategoryCard({name, amount, color}: HistoryCardProps) {
  return (
    <Container color={color}>
      <Title>{name}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}