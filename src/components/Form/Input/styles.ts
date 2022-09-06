import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import default_theme from '../../../global/styles/theme';

export const Container = styled.TextInput.attrs({
  placeholderTextColor: default_theme.colors.text
})`
  width: 100%;
  padding: 16px 18px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 8px;
  margin-bottom: 8px;
`;