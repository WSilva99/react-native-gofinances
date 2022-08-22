import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

interface TransactionTypeButtonProps extends TouchableOpacityProps  {
  title: string;
  type: 'deposit' | 'withdraw';
  isActive: boolean;
}

export function TransactionTypeButton({title, type, isActive, ...props}: TransactionTypeButtonProps) {
  return (
    <Container type={type} {...props} isActive={isActive}>
      <Icon name={type === 'deposit' ? 'arrow-up-circle' : 'arrow-down-circle'} type={type} />
      <Title type={type}>{title}</Title>
    </Container>
  )
}