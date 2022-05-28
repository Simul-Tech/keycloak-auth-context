/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
import { usePermission } from "./context";

type CanProps = { permissionIds: string[] };
type CanCmpProps = { can: boolean };

const CanProd: React.FunctionComponent<CanCmpProps & {children?: React.ReactNode}> = (props) => {
  const { can = false, children } = props;

  return can ? <div>{children}</div> : null;
};

const CanDebug: React.FunctionComponent<CanProps & CanCmpProps & {children?: React.ReactNode}> = (props) => {
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
          opacity: "0.5",
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

const Can: React.FunctionComponent<CanProps & {children?: React.ReactNode}> = ({
  permissionIds,
  children
}) => {
  const [can, isDebug] = usePermission(permissionIds);

  return isDebug ? (
    <CanDebug can={can} permissionIds={permissionIds}>
      {children}
    </CanDebug>
  ) : (
    <CanProd can={can}>{children}</CanProd>
  );
};

export { Can };
