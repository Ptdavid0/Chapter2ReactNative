import { groupGetAll } from "./groupGetAll";

export const groupGetTeam = async (teamId: string) => {
  try {
    const groups = await groupGetAll();
    const parsedGroups = groups.map((group) => JSON.parse(group));
    const team = parsedGroups.find((team) => team.id === teamId);
    return team;
  } catch (error) {
    throw error;
  }
};
