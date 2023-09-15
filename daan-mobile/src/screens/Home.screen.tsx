import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../common/Container";
import { Avatar, LoaderScreen } from "react-native-ui-lib";
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { TypeUserData } from "../types/Types";
import { HOST, URLServer } from "../config/config";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../components/HomeComponent/Header.component";
import SnyBarCodeScanner from "../components/Scan.component";
import Toast from "react-native-toast-message";
import { postWithAuthorization } from "../helpers/HelperQuery";
import {io} from 'socket.io-client'
import uuid from 'react-native-uuid';
import Colors from "../modules/Colors";

const HomeScreen = () => {
  const socket = React.useRef<any>()
  const [isLoadingPage, setIsLoadingPage] = React.useState<boolean>(false)
  const { user }: any = useSelector((state: RootState) => state.auth);
    

  const [courseGrades, setCourseGrades] = React.useState<any>();
  const [openQrCode, setOpenQrCode] = React.useState<boolean>(false);
  const onScan = async (data: any) => {
    setIsLoadingPage(true)
    if (data) {
      setOpenQrCode(false);
      const jsonData: {
        type: string,
        data: string
      } = JSON.parse(data);
    
     if(jsonData.type === 'login-with-qr-code'){
      const id = uuid.v4();
      const parameters = {
        to: jsonData.data,
        from: id,
      }
      socket.current = io(HOST)
      socket.current.emit('add-user', id)
      socket.current.emit('status', {
        ...parameters,
        message: 'loading'
      })
      socket.current.emit('send-msg', {
        ...parameters,
        message: user
      })
    }
    }
  };
  const onClose = () => {
    setOpenQrCode(false);
  };
  React.useEffect(() => {
    if(socket.current) {
      socket.current.on('status', (msg: any) => {
        console.log(msg.status)
        if(msg.status === 'success'){
          setIsLoadingPage(false)
          Toast.show({
            type: "success",
            text1: "Notification",
            text2: "Login successful.",
          });
        }
      })
    }
  }, [socket.current])


  if(isLoadingPage)
    return <LoaderScreen message={"Loading..."} color={Colors.mainColor} />;
  if (openQrCode)
    return <SnyBarCodeScanner onScan={onScan} onClose={onClose} />;
  return (
    <Container>
      <Header record={user} setIsVisible={setOpenQrCode} />
      <Text>{JSON.stringify(courseGrades)}</Text>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
