import { TouchableOpacityProps } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { Button, Container, Icon, Title } from "./styles";

interface TransactionTypeButtonProps extends RectButtonProps  {
  title: string;
  type: 'deposit' | 'withdraw';
  isActive: boolean;
  onPress: () => void;
}

export function TransactionTypeButton({title, type, isActive, onPress, ...props}: TransactionTypeButtonProps) {
  return (
    <Container type={type} isActive={isActive}>
      <Button onPress={onPress} isActive={isActive} type={type} {...props} >
        <Icon isActive={isActive} name={type === 'deposit' ? 'arrow-up-circle' : 'arrow-down-circle'} type={type} />
        <Title isActive={isActive} type={type}>{title}</Title>
      </Button>
    </Container>
  )
}