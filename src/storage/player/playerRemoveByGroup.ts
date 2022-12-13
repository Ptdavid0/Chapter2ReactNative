import AsyncStorage from "@react-native-async-storage/async-storage";
import { Group } from "@storage/group/groupCreate";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export const playerRemoveByGroup = async (group: Group, playerId: string) => {
  try {
    const { id: groupId } = group;
    const storage = await playersGetByGroup(groupId);

    if (storage) {
      const players = storage.filter((player) => player.id !== playerId);

      const jsonValue = JSON.stringify(players);

      await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupId}`, jsonValue);
    }
  } catch (error) {
    throw error;
  }
};
