export type FCC<P> = React.FunctionComponent<P & {children?  : React.ReactNode}> 

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
    isDebug? : boolean;
}


export type UsePermissionType = (permissionIds: string[]) => boolean


export type CanProps = { permissionIds: string[] };
export type CanCmpProps = { can: boolean };