import React, { FunctionComponent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Checkbox from '../../FormComponents/Checkbox';
import { useFGProvider } from '../core/context';
import { FGHookForm, CheckboxProps, OverrideRequired } from '../core/types';

export const FGCheckbox: FunctionComponent<
  FGHookForm<OverrideRequired<CheckboxProps<any>>>
> = ({ componentProps, ...props }) => {
  const [checked, setChecked] = useState(props?.value ? props?.value : false);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (props?.value) {
      setValue(props.name as string, props?.value);
    }
  }, []);

  const fgProviderProps = useFGProvider();

  const onChange = (event: any) => {
    const val = event.target.checked;
    if (props.onChange) props.onChange(val);
    setChecked(val);
  };

  return (
    <Checkbox
      {...fgProviderProps}
      {...componentProps}
      {...props}
      onChange={onChange}
      checked={checked}
    />
  );
};
