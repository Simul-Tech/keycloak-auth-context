export type FCC<P> = React.FunctionComponent<
  P & { children?: React.ReactNode }
>;

export interface IPermission {
  rsid: string;
  rsname: string;
}

export interface PermissionContextProps {
  permissionSet: Set<string>;
  options: { isDebug?: boolean };
}

export interface PermissionProviderProps {
  permissionToken: string;
  permissionPath?: string;
  permissionMapping?: (perm?: any) => string;
  evaluationMode?: "AND" | "OR";
  isDebug?: boolean;
}

export type UsePermissionType = (args: {
  permissionIds: string[];
  evaluationMode: "AND" | "OR";
}) => boolean;

export type CanProps = Parameters<UsePermissionType>[0];
export type CanCmpProps = { can: boolean };
