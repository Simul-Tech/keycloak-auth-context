import jwt_decode from "jwt-decode";
import { IPermission } from "../types";

export const getPermissionSet: (
    permissionToken: string
  
  ) => Set<string> = (permissionToken) => {
    if (!permissionToken) {
      console?.warn("Permission token not found, return empty set");
      return new Set();
    }
  
    try {
      const decoded = jwt_decode<{
        authorization: { permissions: IPermission[] };
      }>(permissionToken);
  
      const permissionSet = new Set<string>(
        decoded?.authorization?.permissions?.map(
          (perm: { rsname: string }) => perm.rsname
        )
      );
  
      return permissionSet;
    } catch (error) {
      console?.error(error?.message);
      return new Set();
    }
  };