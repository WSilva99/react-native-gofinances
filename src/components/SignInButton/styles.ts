import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled(RectButton)`
  width: 100%;
  height: ${RFValue(56)}px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const IconContainer = styled.View`
  height: 100%;
  padding: ${RFValue(16)}px;
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  border-color: ${({ theme }) => theme.colors.background};
`;

export const ButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
  