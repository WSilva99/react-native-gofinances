import { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input/";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Fields, Form, Header, Title, TransactionsTypes } from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleSelectTransactionType (type: 'deposit' | 'withdraw') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal () {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal () {
    setCategoryModalOpen(false);
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
          <CategorySelectButton placeholder={selectedCategory.name} onPress={handleOpenSelectCategoryModal} />
        </Fields>
        <Button title="Registrar" />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={selectedCategory}
          setCategory={setSelectedCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}