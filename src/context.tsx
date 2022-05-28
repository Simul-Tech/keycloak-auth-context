import React, { useContext } from "react";
import jwt_decode from "jwt-decode";
import Logger from "./logger";

export interface IPermission {
  rsid: string;
  rsname: string;
}

export const getPermissionSet: (
  permissionToken: string,
  logger: Console
) => Set<string> = (permissionToken, logger) => {
  if (!permissionToken) {
    logger?.warn("Permission token not found, return empty set");
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
    logger?.error(error?.message);
    return new Set();
  }
};

const PermissionContext = React.createContext<{
  permissionSet: Set<string>;
  data: { logger?: Console; isDebug?: boolean };
}>(null);

export const PermissionProvider: React.FunctionComponent<{
  permissionToken: string;
  isDebug: boolean;
  children?: React.ReactNode
}> = (props) => {
  const { permissionToken, isDebug, children } = props;
  const logger = Logger(isDebug);

  const permissionSet = React.useMemo(
    () => getPermissionSet(permissionToken, logger),
    [permissionToken]
  );

  return (
    <PermissionContext.Provider
      value={{ permissionSet, data: { logger, isDebug } }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission: (permissionIds: string[]) => [boolean, boolean] = (
  permissionIds
) => {
  const { permissionSet, data } = useContext(PermissionContext);

  const can = React.useMemo(() => {
    const isTrue = permissionIds.every((perm) => permissionSet.has(perm));
    if (!isTrue) {
      permissionIds
        .filter((perm) => !permissionSet.has(perm))
        .forEach((perm) => data?.logger?.warn("UNAUTHORIZED", perm));
    }

    return isTrue;
  }, [permissionIds, permissionSet]);

  return [can, data?.isDebug];
};
