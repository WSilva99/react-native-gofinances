import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface TypeProps {
  type: "deposit" | "withdraw";
}

interface ButtonProps extends RectButtonProps {
  isActive: boolean;
  type: "deposit" | "withdraw";
}

export const Container = styled.View<ButtonProps>`
  width: 48%;
  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme, type }) => type === 'deposit' ? theme.colors.success_light : theme.colors.attention_light};
  border-radius: 8px;
  ${({ isActive, type }) => isActive && type === 'deposit' && css`
    background-color: ${({ theme }) => theme.colors.success};
    border-color: ${({ theme }) => theme.colors.success};
  `}
    ${({ isActive, type }) => isActive && type === 'withdraw' && css`
    background-color: ${({ theme }) => theme.colors.attention};
    border-color: ${({ theme }) => theme.colors.attention};
  `}
`;

export const Button = styled(RectButton)<ButtonProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
`;

export const Icon = styled(Feather)<ButtonProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) => type === 'deposit' ? theme.colors.success : theme.colors.attention};
  margin-right: 12px;
  ${({ isActive, type }) => isActive && css`
    color: ${({ theme }) => theme.colors.shape};
  `};
`;

export const Title = styled.Text<ButtonProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  ${({ isActive, type }) => isActive && css`
    color: ${({ theme }) => theme.colors.shape};
  `};
`;