import React from "react";
import { usePermission, usePermissionContext } from "../core/permission-context";
import { CanCmpProps, CanProps, FCC } from "../types";


const CanProd: FCC<CanCmpProps> = (props) => {
  const { can = false, children } = props;

  return can ? <div>{children}</div> : null;
};

const CanDebug: FCC<CanProps & CanCmpProps> = (props) => {
  const { can = false, permissionIds = [], children } = props;

  return (
    <div
      style={{
        position: "relative",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: can ? "green" : "red"
      }}
    >
      <small
        style={{
          background: "#000",
          position: "absolute",
          opacity: "0.65",
          fontSize: "8px",
          fontWeight: "normal",
          color: "#fff",
          textTransform: "uppercase",
          top: 0,
          right: 0
        }}
      >
        {permissionIds.join(",")}
      </small>
      {children}
    </div>
  );
};

const Can: FCC<CanProps> = ({
  permissionIds = [],
  children
}) => {
  const { options } = usePermissionContext();
  const can = usePermission(permissionIds);

  return options?.isDebug ? (
    <CanDebug can={can} permissionIds={permissionIds}>
      {children}
    </CanDebug>
  ) : (
    <CanProd can={can}>{children}</CanProd>
  );
};

export { Can };
