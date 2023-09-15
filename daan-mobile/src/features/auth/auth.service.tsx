import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-toast-message";
import { URLServer } from "../../config/config";

const getData = async () => {
  const response: any = await AsyncStorage.getItem("user");
  return response;
};
const register = async (userData: any) => {
  const response = await axios.post(URLServer + "/sign-up", userData);
  if (response.data) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
    // window.location.href = '/sign-in'
  }
  return response.data;
};
const login = async (userData: {
  username: string;
  password: string;
  remember: boolean;
}) => {
  const response = await axios.post(URLServer + "auth/login", {
    username: userData.username,
    password: userData.password,
  });
  if (response?.data) {
    if (response?.data?.accessToken) {
      Toast.show({
        type: "success",
        text1: "Notification",
        text2: "Successfully login.",
      });
      await AsyncStorage.setItem("user", JSON.stringify(response?.data));
    } else {
      Toast.show({
        type: "error",
        text1: "Notification",
        text2: "Incorrect Username or Password.",
      });
    }
  }
  return response.data;
};

const logout = () => {
  AsyncStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  getData,
};
export default authService;
