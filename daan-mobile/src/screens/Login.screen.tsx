import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import Container from "../common/Container";
import Learning_sketching from "../../assets/svg/learning_sketching.svg";
import {
  ChipsInput,
  Checkbox,
  Button,
  LoaderScreen,
} from "react-native-ui-lib";
import Colors from "../modules/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/auth.slice";
import { AppDispatch } from "../../store";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [checkboxRememberLogin, setCheckboxRememberLogin] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [valueUsername, setValueUsername] = React.useState<string>("");
  const [valuePassword, setValuePassword] = React.useState<string>("");

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    setIsLoading(true);
    const parameters = {
      username: valueUsername?.toLowerCase(),
      password: valuePassword,
      remember: checkboxRememberLogin,
    };
    const result = await dispatch(login(parameters));
    console.log("🚀 ~ file: Login.screen.tsx:38 ~ handleLogin ~ result:", result)

    if (result.payload.status !== 200) return setIsLoading(false);
    setIsLoading(false);
    navigation.navigate("home-screen", result?.payload);
  };

  if (isLoading)
    return <LoaderScreen message={"Loading..."} color={Colors.mainColor} />;

  return (
    <Container>
      <View style={styles.container}>
        <Learning_sketching width={width / 1.5} height={height / 4} />
        <View style={styles.formLogin}>
          <ChipsInput
            style={styles.input}
            placeholder={"Username"}
            onChangeText={(value: string) => setValueUsername(value)}
          />
          <ChipsInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry={true}
            onChangeText={(value: string) => setValuePassword(value)}
          />
          <Checkbox
            label={"Remember login"}
            value={checkboxRememberLogin}
            onValueChange={(value: boolean) => setCheckboxRememberLogin(value)}
            color={Colors.mainColor}
            size={20}
            style={styles.checkbox}
          />
          <Button
            label={"Login"}
            size={Button.sizes.medium}
            backgroundColor={Colors.mainColor}
            style={styles.buttonLogin}
            onPress={() => handleLogin()}
          />
        </View>
      </View>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  formLogin: {
    marginTop: 50,
    width: "100%",
  },
  input: {
    height: 50,
    marginVertical: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    borderWidth: 0,
    borderRadius: 10,
  },
  checkbox: {
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonLogin: {
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "700",
  },
  register: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
  },
});
