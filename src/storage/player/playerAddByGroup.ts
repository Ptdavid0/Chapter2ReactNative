import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";
import { playersGetByGroup } from "./playersGetByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export const playerAddByGroup = async (
  newPLayer: PlayerStorageDTO,
  groupId: string
) => {
  try {
    const storedPlayers = await playersGetByGroup(groupId);
    const playerExists =
      storedPlayers.filter((player) => player.name === newPLayer.name).length >
      0;
    if (playerExists) {
      throw new AppError("Esse jogador já existe");
    }
    const storage = JSON.stringify([...storedPlayers, newPLayer]);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupId}`, storage);
  } catch (error) {
    throw error;
  }
};
