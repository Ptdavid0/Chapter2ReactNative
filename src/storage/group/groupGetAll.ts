import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

export const groupGetAll = async () => {
  try {
    // AsyncStorage.clear();
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
    // JSON.parse() parses a JSON string, constructing the JavaScript value or object described by the string
    const groups: string[] = storage ? JSON.parse(storage) : [];
    return groups;
  } catch (error) {
    throw error;
  }
};
