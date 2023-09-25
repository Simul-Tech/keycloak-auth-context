import jwt_decode from "jwt-decode";
import { IPermission } from "../types";
import get from 'lodash.get';

export const getPermissionSet: (
    permissionToken: string,
    permissionPath?: string

  ) => Set<string> = (permissionToken, permissionPath = "authorization.permissions") => {
    if (!permissionToken) {
      console?.warn("Permission token not found, return empty set");
      return new Set();
    }
  
    try {
      const decoded = jwt_decode<{
        authorization: { permissions: IPermission[] };
      }>(permissionToken);
  

      const permissions = get(decoded, permissionPath) || []

      const permissionSet = new Set<string>(
        permissions?.map(
          (perm: { rsname: string }) => perm.rsname
        )
      );
  
      return permissionSet;
    } catch (error) {
      console?.error(error?.message);
      return new Set();
    }
  };