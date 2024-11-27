import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import colors from "@/constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  useConnectMutation,
  useDisconnectMutation,
} from "@/redux/api/connectionApiSlice";
import { useSelector } from "react-redux";

const ProfileActions = ({ userIsConnected, userId }) => {
  const { token } = useSelector((state) => state.auth);
  const [connectApi, { isLoading: connectLoading }] = useConnectMutation();
  const [disconnectApi, { isLoading: disconnectLoading }] =
    useDisconnectMutation();

  const handleConnection = async () => {
    if (userIsConnected) {
      try {
        const res = await disconnectApi({ token, userId }).unwrap();
        console.log("DISCONNECT RESPONSE ", res);
      } catch (error) {
        console.log("ERROR", error);
      }
    } else {
      try {
        const res = await connectApi({ token, userId }).unwrap();
        console.log("CONNECT RESPONSE", res);
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <TouchableOpacity
        onPress={handleConnection}
        style={{
          backgroundColor: colors.while,
          paddingHorizontal: 25,
          paddingVertical: 4,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.black,
            fontSize: 11,
            fontFamily: "Poppins-Medium",
            marginTop: 3,
          }}
        >
          {userIsConnected ? "Connected" : "Connect"}
        </Text>
        {userIsConnected ? (
          <Feather name="minus" size={18} color="black" />
        ) : (
          <AntDesign name="plus" size={17} color="black" />
        )}
      </TouchableOpacity>
      <Pressable
        style={{
          backgroundColor: colors.black_200,
          paddingHorizontal: 25,
          paddingVertical: 4,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.while,
            fontSize: 11,
            fontFamily: "Poppins-Medium",
            marginTop: 3,
          }}
        >
          Message
        </Text>
        <Feather name="message-circle" size={17} color="white" />
      </Pressable>
    </View>
  );
};

export default ProfileActions;
