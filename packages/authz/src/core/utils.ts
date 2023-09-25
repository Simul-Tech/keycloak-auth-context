import jwt_decode from "jwt-decode";
import get from "lodash.get";

export const getPermissionSet: (
  permissionToken: string,
  permissionPath?: string,
  isDebug?: boolean
) => Set<string> = (
  permissionToken,
  permissionPath = "authorization.permissions",
  isDebug = false
) => {
  if (!permissionToken) {
    console?.warn("Permission token not found, return empty set");
    return new Set();
  }

  try {
    const decoded = jwt_decode(permissionToken);

    const permissionSet = new Set<string>(
      (get(decoded, permissionPath) || [])?.map(
        (perm: { rsname: string }) => perm.rsname
      )
    );
    if (isDebug) console.log({ decoded, permissionSet });

    return permissionSet;
  } catch (error) {
    console?.error(error?.message);
    return new Set();
  }
};
