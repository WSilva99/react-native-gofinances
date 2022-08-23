import { TouchableOpacityProps } from "react-native";
import { CategorySelectIcon, CategorySelectName, Container } from "./styles";

interface CategorySelectButtonProps extends TouchableOpacityProps {
  placeholder: string;
}

export function CategorySelectButton({ placeholder, onPress, ...props }: CategorySelectButtonProps) {
  return (
    <Container onPress={onPress} {...props}>
      <CategorySelectName>{placeholder}</CategorySelectName>
      <CategorySelectIcon name={'chevron-down'} />
    </Container>
  )
}