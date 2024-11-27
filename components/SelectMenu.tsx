import {
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { useMenuContext } from "@/context/menuContext";

const SelectMenu = ({
  options,
  defaultOption = "",
  menuAreaStyle = {},
  onSelect,
}) => {
  const [menuSelectArea, setMenuAreaVisible] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setMenuAreaVisible(true)}
        style={{
          backgroundColor: colors.black_100,
          borderColor: colors.black_200,
          borderWidth: 1,
          paddingHorizontal: 4,
          paddingVertical: 3,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: colors.while,
            paddingHorizontal: 10,
            paddingVertical: 4,
            fontSize: 11,
            textTransform: "capitalize",
          }}
        >
          {defaultOption ? defaultOption : options[0]}
        </Text>
      </Pressable>

      {menuSelectArea && (
        <View
          style={[
            {
              width: 250,
              padding: 10,
              backgroundColor: "#fff",
              position: "absolute",
              zIndex: 1,
              borderRadius: 4,
              top: 0,
              left: "20%",
            },
            menuAreaStyle,
          ]}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelect(option == "public" ? true : false);
                setMenuAreaVisible(false);
              }}
            >
              <Text
                style={{
                  textTransform: "capitalize",
                  fontSize: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default SelectMenu;
