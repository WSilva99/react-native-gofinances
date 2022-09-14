import { Alert,
  Keyboard,
  Modal, 
  TouchableWithoutFeedback
} from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm/";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import { Container,
  Fields, 
  Form, 
  TransactionsTypes
} from "./styles";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";

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
    .transform((value, originalValue) => {
      if (originalValue.includes(",")) {
        return Number(originalValue.replace(",", "."));
      }
      return Number(originalValue);
    })
    .typeError("Informe um valor numérico")
    .moreThan(0, "O valor deve ser maior que 0")
    .required("O valor é obrigatório"),
});

export function Register() {
  const { user } = useAuth();
  const [transactionType, setTransactionType] = useState('');
  
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(transactionSchema)
  });

  const navigation = useNavigation();
  
  function handleSelectTransactionType (type: 'deposit' | 'withdraw') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal () {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal () {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (selectedCategory.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      description: form.description,
      amount: form.amount,
      type: transactionType,
      categoryKey: selectedCategory.key,
      date: new Date()
    }
    
    try {
      const dataKey = `@gofinances:transactions:user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const dataPrev = data ? JSON.parse(data) : [];
      const dataCurr = [...dataPrev, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataCurr));

      reset();
      setTransactionType('');
      setSelectedCategory({
        key: 'category',
        name: 'Categoria'
      });
      // Resolvendo tipagem bugada
      navigation.navigate("Home" as never);
    } catch(error) {
      console.log(error);
      Alert.alert('Erro ao registrar transação');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastro" />
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
          {/* Modo gambiarra para resolver tipagem */}
          <Button title="Registrar" onPress={handleSubmit(handleRegister as unknown as any)} /> 
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