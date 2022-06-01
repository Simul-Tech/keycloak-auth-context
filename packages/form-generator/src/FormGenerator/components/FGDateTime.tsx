import React,  { FunctionComponent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DateTimePicker from '../../FormComponents/DateTimePicker';
import { useFGProvider } from '../core/context';
import { DateTimeProps, FGHookForm, OverrideRequired } from '../core/types';

export const FGDateTime: FunctionComponent<
  FGHookForm<OverrideRequired<DateTimeProps<any>>>
> = ({ componentProps, ...props }) => {
  const { setValue } = useFormContext();
  const [val, setVal] = useState(null);
  const fgProviderProps = useFGProvider();

  useEffect(() => {
    if (props?.value) {
      setValue(props.name as string, props?.value);
      setVal(props?.value);
    }
  }, []);

  const onChange = (newValue: any) => {
    if (props.onChange) props.onChange(newValue);
    setValue(props.name as string, newValue);
    setVal(newValue);
  };

  return (
    <DateTimePicker
      {...fgProviderProps}
      {...componentProps}
      {...props}
      onChange={onChange}
      value={val}
    />
  );
};
