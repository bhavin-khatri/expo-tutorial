import React from "react";
import {ApplicationStack} from "../navigation/ApplicationStack";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {ThemeProvider} from "../ui/context/ThemeContext";

export default function _layout() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <ApplicationStack />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
