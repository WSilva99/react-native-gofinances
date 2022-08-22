import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface TypeProps {
  type: 'deposit' | 'withdraw';
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 8px;
  padding: 18px 24px;
  margin-bottom: ${RFValue(12)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) => type === 'deposit' ? theme.colors.success : theme.colors.attention};
  padding: 8px 0;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

export const CategoryIcon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(18)}px;
  width: ${RFValue(20)}px;
`;

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${RFValue(8)}px;
  font-size: ${RFValue(14)}px;
`;

export const Date = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;
