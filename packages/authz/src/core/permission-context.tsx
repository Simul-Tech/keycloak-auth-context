import React, { useContext } from "react";
import { getPermissionSet } from "./utils";
import { FCC, PermissionContextProps, PermissionProviderProps, UsePermissionType } from "../types";


const PermissionContext = React.createContext<PermissionContextProps>(null);

export const usePermissionContext = () => useContext(PermissionContext);

export const PermissionProvider: FCC<PermissionProviderProps> = (props) => {
  const { permissionToken, isDebug = false, children } = props;


  const permissionSet = React.useMemo(
    () => getPermissionSet(permissionToken),
    [permissionToken]
  );

  return (
    <PermissionContext.Provider
      value={{ permissionSet, options: {  isDebug } }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission: UsePermissionType = (
  permissionIds
) => {
  const { permissionSet, options } = usePermissionContext();

  const can = React.useMemo(() => {
    const isTrue = permissionIds.every((perm) => permissionSet.has(perm));
    if (!isTrue) {
      permissionIds
        .filter((perm) => !permissionSet.has(perm))
        .forEach((perm) => options?.isDebug && console.warn("UNAUTHORIZED", perm));
    }

    return isTrue;
  }, [permissionIds, permissionSet]);

  return can;
};
