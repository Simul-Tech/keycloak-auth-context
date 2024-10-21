import {jwtDecode} from "jwt-decode";
import get from "lodash.get";
import { PermissionProviderProps } from "../types";

export const getPermissionSet: (
  args: PermissionProviderProps
) => Set<string> = ({
  permissionToken,
  permissionPath = "authorization.permissions",
  permissionMapping = (perm: { rsname: string }) => perm.rsname,
  isDebug = false,
}) => {
  if (!permissionToken) {
    console?.warn("Permission token not found, return empty set");
    return new Set();
  }

  try {
    const decoded = jwtDecode(permissionToken);

    const permissionSet = new Set<string>(
      (get(decoded, permissionPath) || [])?.map(permissionMapping)
    );
    if (isDebug) console.log({ decoded, permissionSet });

    return permissionSet;
  } catch (error) {
    console?.error(error?.message);
    return new Set();
  }
};
