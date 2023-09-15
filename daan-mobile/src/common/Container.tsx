import React, { useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../modules/Colors";
type Props = {
  children: any;
};
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("screen");

const Container = ({ children }: Props) => {
  const getLocationDevice = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../../assets/font/Poppins-Black.ttf"),
    "Poppins-Medium": require("../../assets/font/Poppins-Medium.ttf"),
    "Poppins-Thin": require("../../assets/font/Poppins-Thin.ttf"),
    "Poppins-Light": require("../../assets/font/Poppins-Light.ttf"),
    "Poppins-Regular": require("../../assets/font/Poppins-Regular.ttf"),
  });
  useEffect(() => {
    getLocationDevice();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      style={[styles.container]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[Colors.colorBG, Colors.colorBG1, Colors.colorBG2]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View onLayout={onLayoutRootView}>{children}</View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});
