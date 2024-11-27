import { View, Text } from "react-native";
import React from "react";

const FormErrorMessage = ({ message }) => {
  return (
    <>
      <Text
        style={{ fontSize: 13, fontFamily: "Poppins-Medium", color: "#f83737",marginVertical : 10 }}
      >
        *{message}
      </Text>
    </>
  );
};

export default FormErrorMessage;
