import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlatList } from "react-native";
import { TransactionData } from ".";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  height: ${RFPercentage(36)}px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 24px;
  padding-top: ${getStatusBarHeight() + RFValue(28)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserInfo = styled.View`
  flex-direction: row;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 18px;
`;

export const UserGreeting = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled.TouchableOpacity``;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 12,
  }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 24px;
  margin-top: ${RFPercentage(10)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const TransactionsList = styled(
  FlatList<TransactionData>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;
