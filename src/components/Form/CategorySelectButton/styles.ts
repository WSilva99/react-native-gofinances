import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container =  styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 18px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 8px;
`;

export const CategorySelectName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const CategorySelectIcon = styled(Feather)`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
`;
