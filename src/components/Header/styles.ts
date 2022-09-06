import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View``;

export const HeaderBackground = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(128)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.shape};
`;