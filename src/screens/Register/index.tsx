import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm/";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import { Container, Fields, Form, Header, Title, TransactionsTypes } from "./styles";

interface FormData {
  description: string;
  amount: string;
}

const transactionSchema = Yup.object().shape({
  description: Yup
    .string()
    .required("Descrição é obrigatória"),
  amount: Yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatório"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(transactionSchema)
  });
  
  function handleSelectTransactionType (type: 'deposit' | 'withdraw') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal () {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal () {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (selectedCategory.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const data = {
      description: form.description,
      amount: form.amount,
      transactionType,
      category: selectedCategory.key
    }
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="description"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              placeholder="Descrição"
              error={errors.description?.message}
            />
            <InputForm
              name="amount"
              control={control}
              keyboardType="numeric"
              placeholder="Valor"
              error={errors.amount?.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton isActive={transactionType === 'deposit'} title="Entrada" type="deposit" onPress={() => handleSelectTransactionType('deposit')} />
              <TransactionTypeButton isActive={transactionType === 'withdraw'} title="Saída" type="withdraw" onPress={() => handleSelectTransactionType('withdraw')} />
            </TransactionsTypes>
            <CategorySelectButton placeholder={selectedCategory.name} onPress={handleOpenSelectCategoryModal} />
          </Fields>
          <Button title="Registrar" onPress={handleSubmit(() => handleRegister)} /> 
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={selectedCategory}
            setCategory={setSelectedCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}