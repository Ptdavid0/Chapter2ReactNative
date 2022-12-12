import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components";
import AppRoutes from "./app.routes";

const Routes: React.FC = () => {
  const { COLORS } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
};

export default Routes;
