import React, { useContext, useMemo } from "react";
import {
  FCC,
  PermissionContextProps,
  PermissionProviderProps,
  UsePermissionType,
} from "../types";
import { getPermissionSet } from "./utils";

const PermissionContext = React.createContext<PermissionContextProps>(null);

export const usePermissionContext = () => useContext(PermissionContext);

export const PermissionProvider: FCC<PermissionProviderProps> = (props) => {
  const {
    permissionToken,
    permissionPath,
    permissionMapping,
    isDebug = false,
    children,
  } = props;

  const permissionSet = React.useMemo(
    () =>
      getPermissionSet({
        permissionToken,
        permissionPath,
        permissionMapping,
        isDebug,
      }),
    [permissionToken, permissionPath, permissionMapping, isDebug]
  );

  const provider = useMemo(
    () => (
      <PermissionContext.Provider
        value={{ permissionSet, options: { isDebug } }}
      >
        {children}
      </PermissionContext.Provider>
    ),
    [permissionSet, isDebug]
  );

  return provider;
};

export const usePermission: UsePermissionType = ({
  permissionIds = [],
  evaluationMode = "AND",
}) => {
  const { permissionSet, options } = usePermissionContext();

  const can = React.useMemo(() => {
    let isTrue = false;

    switch (evaluationMode) {
      case "OR":
        isTrue = permissionIds.some((perm) => permissionSet.has(perm));
        if (!isTrue && options?.isDebug) {
          console.log(permissionIds, permissionSet);
        }
        break;

      case "AND":
      default:
        isTrue = permissionIds.every((perm) => permissionSet.has(perm));
        if (!isTrue && options?.isDebug) {
          permissionIds
            .filter((perm) => !permissionSet.has(perm))
            .forEach((perm) => console.warn("UNAUTHORIZED", perm));
        }
        break;
    }

    return isTrue;
  }, [permissionIds, permissionSet]);

  return can;
};
