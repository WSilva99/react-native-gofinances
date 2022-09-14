import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(75)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding: 0 32px;
`;

export const Logo = styled(Feather)`
  font-size: ${RFValue(80)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const VP = styled.Text`
  font-size: ${RFValue(32)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
  margin-top: ${RFValue(50)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
  margin-top: ${RFValue(50)}px;
  margin-bottom: ${RFValue(75)}px;
`;

export const Content = styled.View`
  width: 100%;
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
`;