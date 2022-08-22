import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
  name: string;
  size: number;
  type: 'deposit' | 'withdraw' | 'total';
}

interface TypeProps {
  type: 'deposit' | 'withdraw' | 'total';
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) => type === 'total' ? theme.colors.secondary : theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 8px;
  padding: 18px 24px;
  padding-bottom: ${RFValue(40)}px;
  margin-left: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(16)}px;
  color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${({size}) => RFValue(size)}px;

  ${({type}) => type === 'deposit' && css`
    color: ${({theme}) => theme.colors.success};
  `};

  ${({type}) => type === 'withdraw' && css`
    color: ${({theme}) => theme.colors.attention};
  `};

  ${({type}) => type === 'total' && css`
    color: ${({theme}) => theme.colors.shape};
  `};
`;

export const Content = styled.View`
  padding-top: ${RFValue(16)}px;
`;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const LastTransaction = styled.Text<TypeProps>`
  color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text};
`;
