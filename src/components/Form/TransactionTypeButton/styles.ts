import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
  type: "deposit" | "withdraw";
}

interface ButtonProps extends TypeProps {
  isActive: boolean;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme, type }) => type === 'deposit' ? theme.colors.success : theme.colors.attention};
  border-radius: 8px;
  padding: 16px 32px;
  ${({ isActive, type }) => isActive && type === 'deposit' && css`
    background-color: ${({ theme }) => theme.colors.success_light};
    border-color: ${({ theme }) => theme.colors.success_light};
  `}
    ${({ isActive, type }) => isActive && type === 'withdraw' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
    border-color: ${({ theme }) => theme.colors.attention_light};
  `}
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) => type === 'deposit' ? theme.colors.success : theme.colors.attention};
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;