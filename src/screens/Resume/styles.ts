import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { FlatList, ScrollView } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { TotalByCategoryData } from ".";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  flex: 1;
  width: 100%;
  padding: 0 24px;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(24)}px;
`;

export const MonthSelectButton = styled(BorderlessButton)`
  padding: 4px;
`;

export const MonthSelectIcon = styled(Feather)`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const TotalByCategories = styled.View`
  flex: 1;
  width: 100%;
  margin: ${RFValue(8)}px 0;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const TotalByCategoriesList = styled(
  FlatList<TotalByCategoryData>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;

