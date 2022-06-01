import { debounce } from '@mui/material';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import SelectAutocomplete from '../../FormComponents/SelectAutocomplete';
import { useFGProvider } from '../core/context';
import {
  FGHookForm,
  OverrideRequired,
  SelectAutocompleteProps
} from '../core/types';

export const FGSelectAutocomplete: FunctionComponent<
  FGHookForm<OverrideRequired<SelectAutocompleteProps<any>>>
> = ({ componentProps, type, query, optionMapping, onSelect, ...props }) => {
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(props?.options);
  const [loading, setLoading] = useState(false);
  const { getValues, setValue } = useFormContext();
  const [val, setval] = useState(
    props?.value ? props?.value : componentProps?.multiple ? [] : null
  );
  const fgProviderProps = useFGProvider();

  useEffect(() => {
    if (props?.value) {
      setValue(props.name as string, props?.value);
    }
  }, []);

  /* Serve per resettare il valore dell'input */
  useEffect(() => {
    if (props?.value == null) {
      setval(null);
    }
  }, [props?.value]);

  const getAsyncOptions = (value = '') => {
    setLoading(true);
    try {
      query?.(value, getValues)
        .then((data: any) => {
          if (optionMapping) setFilteredOptions(optionMapping(data));
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const onInputChange = useCallback(
    debounce((event: any) => {
      const value = event?.target?.value;
      if (query) {
        getAsyncOptions(value);
      } else {
        setFilteredOptions(filteredOptions);
      }
    }, 300),
    []
  );

  const onChange = (event: any, newValue: any) => {
    if (onSelect && newValue !== null) {
      onSelect(newValue, setValue);
    }
    setval(newValue);
    setValue(props.name as string, newValue);
    if (props.onChange) props.onChange(newValue);
  };

  const onOpen = () => {
    setOpen(true);
    if (query) {
      setLoading(true);
      getAsyncOptions();
    } else {
      setFilteredOptions(filteredOptions);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <SelectAutocomplete
      {...fgProviderProps}
      {...componentProps}
      {...props}
      options={filteredOptions}
      required={props?.required}
      value={val}
      open={open}
      loading={loading}
      onChange={onChange}
      onInputChange={onInputChange}
      onOpen={onOpen}
      onClose={onClose}
    ></SelectAutocomplete>
  );
};
