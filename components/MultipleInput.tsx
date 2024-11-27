import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
const MultipleInput = ({
  inputs = [],
  onGet,
  limit = 10,
  selectable = false,
  onSelected = undefined,
}) => {
  const [allInput, setAllInput] = useState<string[]>([]);
  const [selectedInput, setSelectedInput] = useState<string[]>([]);
  const [newInput, setNewInput] = useState("");

  const handleSetSelectedInput = (input: string) => {
    if (!selectable) return;
    if (!selectedInput.includes(input)) {
      setSelectedInput((prev) => {
        const newSelectedInput = [...prev, input];
        if (onSelected) {
          onSelected(newSelectedInput);
        }
        return newSelectedInput;
      });
    } else {
      const newSelectedInput = selectedInput.filter((i) => {
        return i != input;
      });
      if (onSelected) {
        onSelected(newSelectedInput);
      }
      setSelectedInput(newSelectedInput);
    }
  };

  const handleAddInput = () => {
    if (!allInput.includes(newInput) && allInput.length < limit) {
      setAllInput((prev) => {
        const newAllInput = [...prev, newInput];
        onGet(newAllInput);
        return newAllInput;
      });
    }
    setNewInput("");
  };

  const handleRemoveInput = (input: string) => {
    const newAllInput = allInput.filter((i) => i != input);
    onGet(newAllInput);
    setAllInput(newAllInput);
  };

  useEffect(() => {
    setAllInput(inputs);
  }, [inputs]);

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
        {allInput &&
          allInput.length > 0 &&
          allInput.map((input, i) => (
            <Pressable
              onPress={() => handleSetSelectedInput(input)}
              key={i}
              style={{
                paddingHorizontal: 10,
                height: 40,
                borderRadius: 5,
                backgroundColor: selectedInput.includes(input)
                  ? "#AF1740"
                  : colors.black_100,
                borderWidth: 1,
                borderColor: colors.black_200,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 10,
                  color: colors.while,
                }}
              >
                {input}
              </Text>
              <AntDesign
                onPress={() => handleRemoveInput(input)}
                name="closecircleo"
                size={15}
                color={colors.while}
              />
            </Pressable>
          ))}

        <TextInput
          placeholderTextColor={colors.gray_100}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 10,
            color: colors.while,

            fontSize: 13,
          }}
          value={newInput}
          onChangeText={(text) => setNewInput(text)}
          onSubmitEditing={handleAddInput}
          placeholder={allInput.length > 0 ? "Add More..." : "*Add One "}
        />
      </View>
    </View>
  );
};

export default MultipleInput;
