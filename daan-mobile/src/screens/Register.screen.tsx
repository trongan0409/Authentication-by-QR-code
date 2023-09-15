import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Container from "../common/Container";
import Learning_sketching from "../../assets/svg/learning_sketching.svg";
import { ChipsInput, Checkbox, Button } from "react-native-ui-lib";
import Colors from "../modules/Colors";
const { width, height } = Dimensions.get("window");
const RegisterScreen = () => {
  return (
    <Container>
      <View style={styles.container}>
        <Learning_sketching width={width / 1.5} height={height / 4} />
        <View style={styles.formLogin}>
          <ChipsInput style={styles.input} placeholder={"Username"} />
          <ChipsInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry={true}
          />
          <ChipsInput
            style={styles.input}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
          />
          <Button
            label={"Register"}
            size={Button.sizes.medium}
            backgroundColor={Colors.mainColor}
            style={styles.buttonLogin}
          />
          <TouchableOpacity>
            <Text style={styles.register}>You already have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default RegisterScreen;

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
