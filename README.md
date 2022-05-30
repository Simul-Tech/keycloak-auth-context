# Simultech Toolkit

This repository provides a set of tools and helpers for React applications


## List of tools

### AuthZ 

<a aria-label="NPM version" href="https://www.npmjs.com/package/@4dd/authz" target="_blank">
   <img alt="" src="https://img.shields.io/npm/v/@4dd/authz.svg?style=for-the-badge&labelColor=000000">
</a>
  
---
> AuthZ is a simple set of components to use with keycloak authorization token

  
  

#### Installation

```
# NPM
npm install --save @4dd/authz

# YARN
yarn add @4dd/authz
```


#### Usage

This tool works with a <strong>Keycloak</strong> Autorization token


- Wrap the component of inside a Permission Provider

```jsx
// MyApp.jsx

import { PermissionProvider } from "@4dd/authz";

const PERMISSION_TOKEN = "your_Keycloak_autorization_token"

const MyApp =  () => (
  <PermissionProvider
    permissionToken={PERMISSION_TOKEN}
    isDebug={false}
  >
      <MyComponent />
  </PermissionProvider>
);

export default MyApp;

```

- Use the permission wrapper with `usePermission` hook or with helper `Can` component


    They accept a list of `permissionIds` (`["Resource"]`). Each element of the list is a resource defined on keycloak Autorization section. The resource is evaluated using the keycloak policies and permissions

```jsx
// MyComponent.jsx using usePermission hook
import { usePermission } from "@4dd/authz";

const MyComponent = () => {
    const canViewResource = usePermission(["Resource"]);

    return canViewResource && <div>My super secret resource</div>
}

```

```jsx
// MyComponent.jsx using Can component
import { Can } from "@4dd/authz";

const MyComponent = () => (
    <Can permissionIds={["Resource"]}>
        My super secret resource
    </Can>
);

```


#### Keycloack setup

TODO

#### Obtain authorization token

TODO


#### Sandbox Examples
TODO 
- Using with Next.js
- Using with React Component
