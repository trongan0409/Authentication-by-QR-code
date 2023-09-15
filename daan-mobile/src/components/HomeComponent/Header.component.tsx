import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "../../modules/Colors";
import Icon from "@expo/vector-icons/Ionicons";
import { TypeUserData } from "../../types/Types";
import { Avatar } from "react-native-ui-lib";
import { HOST } from "../../config/config";
import ScanComponent from "../Scan.component";
import SnyBarCodeScanner from "../Scan.component";
const { width } = Dimensions.get("screen");

interface Props {
  record: TypeUserData | undefined;
  setIsVisible: Function;
}

const Header = ({ record, setIsVisible }: Props) => {
  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <View style={styles.header__left}>
          <Avatar
            source={{
              uri:
                record?.userData?.avatar ?? `${HOST}/image/avatar_default.png`,
            }}
            label={"avatar"}
          />
          <Text style={{ marginTop: 10 }}>{record?.userData?.fullName}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Icon name='scan-outline' size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  header__left: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
});
