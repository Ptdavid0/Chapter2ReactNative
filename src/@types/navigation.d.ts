import { Group } from "@storage/group/groupCreate";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined;
      new: undefined;
      players: {
        group: Group;
      };
    }
  }
}
