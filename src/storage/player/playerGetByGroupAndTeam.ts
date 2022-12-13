import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

import { playersGetByGroup } from "./playersGetByGroup";

export const playerGetByGroupAndTeam = async (
  groupId: string,
  teamName: string
) => {
  try {
    const storage = await playersGetByGroup(groupId);

    const playersByTeam = storage.filter((player) => player.team === teamName);

    return playersByTeam;
  } catch (error) {
    if (error instanceof AppError) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Erro ao buscar jogadores");
    }
  }
};
