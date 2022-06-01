import React, { FunctionComponent } from 'react';
import Textarea from '../../FormComponents/Textarea';
import { useFGProvider } from '../core/context';
import { FGHookForm, OverrideRequired, TextareaProps } from '../core/types';

export const FGTextarea: FunctionComponent<
  FGHookForm<OverrideRequired<TextareaProps<any>>>
> = ({ componentProps, value, ...props }) => {
  const fgProviderProps = useFGProvider();

  return <Textarea {...fgProviderProps} {...componentProps} {...props} />;
};
