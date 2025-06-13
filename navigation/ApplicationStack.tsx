import { Stack } from "expo-router";
import React from "react";
import { navigationConstants } from "../constants/NavigationConstants";

export const ApplicationStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen key={"index"} name="index" />
      <Stack.Screen
        key={navigationConstants.SPLASH}
        name={navigationConstants.SPLASH}
      />
      <Stack.Screen
        key={navigationConstants.DASHBOARD}
        name={navigationConstants.DASHBOARD}
      />

      <Stack.Screen
          key={navigationConstants.USER}
          name={navigationConstants.USER}
      />
    </Stack>
  );
};
