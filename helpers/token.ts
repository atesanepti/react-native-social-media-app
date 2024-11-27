import * as SecureStore from "expo-secure-store";

export const getToken = async (name: string) => {
  try {
    const token = await SecureStore.getItemAsync(name);
    return token;
  } catch (error) {
    throw error;
  }
};

export const setToken = async (name: string, value: string) => {
  try {
    await SecureStore.setItemAsync(name, value);
    return true;
  } catch (error) {
    throw error;
  }
};

export const deleteToken = async (name: string) => {
  try {
    await SecureStore.deleteItemAsync(name);
    return true;
  } catch (error) {
    throw error;
  }
};

