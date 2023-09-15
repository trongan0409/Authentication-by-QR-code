import Colors from "../modules/Colors";
import HomeScreen from "../screens/Home.screen";
import LoginScreen from "../screens/Login.screen";
import { TypeRouter } from "../types/Types";

export const Routes = <TypeRouter[]>[
  // {
  //   component: LoginScreen,
  //   name: "login-screen",
  //   auth: true,
  //   options: {
  //     headerShown: false,
  //     title: "Login Screen",
  //     headerStyle: {
  //       backgroundColor: Colors.white,
  //     },
  //     headerTintColor: "#000",
  //   },
  // },
  {
    component: HomeScreen,
    name: "home-screen",
    auth: true,
    options: {
      headerShown: false,
      title: "Home Screen",
      headerStyle: {
        backgroundColor: Colors.white,
      },
      headerTintColor: "#000",
    },
  },
  // {
  //   component: StudentScreen,
  //   name: "student-screen",
  //   auth: true,
  //   options: {
  //     headerShown: true,
  //     title: "StudentScreen",
  //     headerStyle: {
  //       backgroundColor: Colors.white,
  //     },
  //     headerTintColor: "#000",
  //   },
  // },
];
