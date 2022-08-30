import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";
import { Container, Error } from "./styles";

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
  error: any; // Resolver tipagem
}

export function InputForm({control, name, error, ...props}: InputFormProps) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...props} />
        )}
      />
      {!!error && <Error>{error}</Error>}
    </Container>
  );
}