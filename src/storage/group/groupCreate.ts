import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export interface Group {
  name: string;
  id: string;
  members: string[];
}

export const groupCreate = async (groupName: string) => {
  try {
    const newGroup: Group = {
      name: groupName,
      id: Math.random().toString(36).slice(2, 9),
      members: [],
    };

    // JSON.stringify() converts a JavaScript object or value to a JSON string
    const storedGroups = await groupGetAll();

    const group = JSON.stringify(newGroup);
    const storage = JSON.stringify([...storedGroups, group]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
};
