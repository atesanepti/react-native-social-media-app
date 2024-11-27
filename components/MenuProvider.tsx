import { MenuContextProvider } from "@/context/menuContext";
import { useGlobalEvent } from "@/hooks/useGlobalEvent";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, Text, PanResponder, Pressable } from "react-native";
import { useMenuContext } from "./../context/menuContext";

const Provider = ({ children }) => {
  const { callback } = useMenuContext();

  const handleClick = () => {
    if (callback) {
      callback();
    }
  };

  return (
    <Pressable onPress={handleClick} style={{ flex: 1 }}>
      {children}
    </Pressable>
  );
};

const MenuProvider = ({ children }) => {
  return (
    <MenuContextProvider>
      <Provider>{children}</Provider>
    </MenuContextProvider>
  );
};

export default MenuProvider;
