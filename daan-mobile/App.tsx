import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthTrack from "./src/navigation/AuthTrack";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "./store";
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AuthTrack />
        <Toast />
      </Provider>
    </NavigationContainer>
  );
}
