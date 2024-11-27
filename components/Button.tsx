import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import colors from "@/constants/Colors";

const Button = ({
  onPress,
  title,
  isLoading,
  mt = 50,
  color = colors.activeYellow,
}) => {
  const handlepress = () => {
    onPress();
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: mt,
        width: "100%",
      }}
      onPress={handlepress}
      disabled={isLoading}
    >
      {isLoading ? (
        // <ActivityIndicator size="small" color={colors.while} />
        <Text
          style={{
            color: colors.while,
            fontFamily: "Poppins-SemiBold",
            fontSize: 12,
            textAlign: "center",
          }}
        >
          Proccessing...
        </Text>
      ) : (
        <Text
          style={{
            color: colors.while,
            fontSize: 12,
            fontFamily: "Poppins-Medium",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
