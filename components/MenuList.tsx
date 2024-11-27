import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React from "react";
import colors from "@/constants/Colors";
import { useMenuContext } from "@/context/menuContext";

const Menu = ({ style = {}, children, visible }) => {

  return (
    <>
      {visible && (
        <View
          style={[
            {
              width: 140,
              padding: 10,
              borderRadius: 4,
              backgroundColor: colors.while,
              position: "absolute",
              zIndex: 2,
            },
            style,
          ]}
        >
          {children}
        </View>
      )}
    </>
  );
};

export const MenuList = ({ title = "menu", onPress, style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          { color: colors.black, fontSize: 12, paddingVertical: 7 },
          style,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Menu;
