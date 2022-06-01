import React, { createContext, useContext } from 'react';

export interface FGContextProps {
  variant: 'filled' | 'outlined' | 'standard';
  size?: 'medium' | 'small';
  color?: any;
  disabled?: boolean;
  readonly?: boolean;
}

const Context = createContext<FGContextProps>({
  variant: 'outlined',
  size: 'small',
  color: 'primary',
  disabled: false,
  readonly: false
});

export const Provider = Context.Provider;

export const useFGProvider = () => useContext(Context);
