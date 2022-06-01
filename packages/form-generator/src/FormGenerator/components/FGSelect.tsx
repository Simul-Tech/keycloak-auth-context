import React, { FunctionComponent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from '../../FormComponents/Select';
import { useFGProvider } from '../core/context';
import { FGHookForm, OverrideRequired, SelectProps } from '../core/types';

export const FGSelect: FunctionComponent<
  FGHookForm<OverrideRequired<SelectProps<any>>>
> = ({ componentProps, ...props }) => {
  const [val, setval] = useState(
    props?.value ? props?.value : componentProps?.multiple ? [] : ''
  );
  const { setValue } = useFormContext();

  useEffect(() => {
    if (props?.value) {
      setValue(props.name as string, props?.value);
    }
  }, []);

  const fgProviderProps = useFGProvider();

  const onChange = (event: any) => {
    const value = event.target.value;
    setval(value);
    setValue(props.name as string, value);
    if (props.onChange) props.onChange(value);
  };

  const onDeleteItem = (value: any) => {
    let selected = val.filter((option: any) => {
      return option !== value;
    });
    setval(selected);
    setValue(props.name as string, selected);
  };

  return (
    <Select
      {...fgProviderProps}
      {...componentProps}
      {...props}
      options={props.options}
      value={val}
      required={props?.required}
      onChange={onChange}
      onDeleteItem={onDeleteItem}
    ></Select>
  );
};
