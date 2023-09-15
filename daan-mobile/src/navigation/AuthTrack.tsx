import { TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Ionicons";
import { TypeRouter } from "../types/Types";
import { Routes } from "../routes/Routes";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import LoginScreen from "../screens/Login.screen";
import { checkLogin } from "../features/auth/auth.slice";

const Stack = createNativeStackNavigator();

const AuthTrack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>()
  
  const { user: userData }: any = useSelector((state: RootState) => state.auth);
  React.useEffect(() => {
    dispatch(checkLogin())
  }, [])
  return (
    <Stack.Navigator>
      {!userData?.error && userData ? (
        <>
          {Routes.map((item: TypeRouter, index: number) => {
            return (
              <Stack.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{
                  headerShown: item.options.headerShown,
                  title: item.options.title,
                  headerStyle: item.options.headerStyle,
                  headerTintColor: item.options.headerTintColor,
                  headerTitleStyle: item.options.headerTitleStyle,
                  headerRight: () => {
                    return (
                      <>
                        {item.options.headerRight && (
                          <TouchableOpacity
                            style={{ marginRight: 20 }}
                            onPress={() => {
                              navigation.dispatch(DrawerActions.toggleDrawer());
                            }}
                          >
                            <Icon name='menu-outline' size={30} />
                          </TouchableOpacity>
                        )}
                      </>
                    );
                  },
                }}
              />
            );
          })}
        </>
      ) : (
        <Stack.Screen
          name='login-screen'
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AuthTrack;
