import { useState } from "react";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input/";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { Container, Fields, Form, Header, Title, TransactionsTypes } from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleSelectTransactionType (type: 'deposit' | 'withdraw') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Descrição" />
          <Input placeholder="Valor" />
          <TransactionsTypes>
            <TransactionTypeButton isActive={transactionType === 'deposit'} title="Entrada" type="deposit" onPress={() => handleSelectTransactionType('deposit')} />
            <TransactionTypeButton isActive={transactionType === 'withdraw'} title="Saída" type="withdraw" onPress={() => handleSelectTransactionType('withdraw')} />
          </TransactionsTypes>
        </Fields>
        <Button title="Registrar" />
      </Form>
    </Container>
  )
}