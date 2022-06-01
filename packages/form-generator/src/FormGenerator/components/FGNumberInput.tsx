import React, { FunctionComponent, useEffect, useState } from 'react';
import NumberInput from '../../FormComponents/NumberInput';
import { useFormContext } from 'react-hook-form';
import { FGHookForm, NumberInputProps, OverrideRequired } from '../core/types';
import { useFGProvider } from '../core/context';

export const FGNumberInput: FunctionComponent<
  FGHookForm<OverrideRequired<NumberInputProps<any>>>
> = ({ componentProps, ...props }) => {
  const fgProviderProps = useFGProvider();
  const { setValue } = useFormContext();
  const [val, setVal] = useState('');
  const precision = props?.precision != null ? props?.precision : 2;

  useEffect(() => {
    if (props?.value != undefined && props?.value !== '') {
      setValue(props.name as string, Number(props?.value).toFixed(precision));
      setVal(Number(props?.value).toFixed(precision));
    } else {
      setValue(props.name as string, '');
      setVal('');
    }
  }, []);

  const onChange = (event: any) => {
    const value = event.target.value;
    if (props.onChange) props.onChange(value);
    setValue(props.name as string, value);
    setVal(value);
  };

  const onBlur = (event: any) => {
    const value = event.target.value;
    if (value) {
      setValue(props.name as string, Number(value).toFixed(precision));
      setVal(Number(value).toFixed(precision));
    } else {
      setValue(props.name as string, '');
      setVal('');
    }
  };

  return (
    <NumberInput
      {...fgProviderProps}
      {...componentProps}
      {...props}
      value={val}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
