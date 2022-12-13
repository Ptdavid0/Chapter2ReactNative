import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "../storageConfig";
import { Group } from "./groupCreate";
import { groupGetAll } from "./groupGetAll";

export const groupRemoveById = async (groupId: string) => {
  try {
    const storage = await groupGetAll();
    const groups: Group[] = storage.map((group: string) => {
      return JSON.parse(group);
    });
    const filteredGroups = groups.filter((group) => group.id !== groupId);
    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify(filteredGroups)
    );
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupId}`);
  } catch (error) {
    throw new AppError("Erro ao remover grupo");
  }
};
