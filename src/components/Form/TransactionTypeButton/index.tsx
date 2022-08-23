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
      <Icon isActive={isActive} name={type === 'deposit' ? 'arrow-up-circle' : 'arrow-down-circle'} type={type} />
      <Title isActive={isActive} type={type}>{title}</Title>
    </Container>
  )
}