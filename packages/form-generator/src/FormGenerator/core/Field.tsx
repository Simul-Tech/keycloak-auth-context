import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { useController, useWatch } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { BaseInputProps, GroupProps } from './types';
import { getDefaultValue, isTrue, when as whenFn } from './util';
import { FieldInput } from './FieldInput';

export const Field: FunctionComponent<BaseInputProps<any> | GroupProps<any>> = (
  props
) => {
  const {
    when,
    has_when,
    when_strategy,
    type,
    value,
    default_value,
    pattern,
    validation,
    required,
    label,
    hint,
    name
  } = props;

  const watcher = useWatch({
    //name: when?.map((item) => item.accessor),
    disabled: !has_when && !(required instanceof Function)
  });

  const isRequired = useMemo(() => {
    return isTrue(required, watcher);
  }, [required, watcher]);

  const {
    field,
    formState: { errors }
  } = useController({
    name: name as any,
    defaultValue: getDefaultValue({
      type,
      value: value || default_value
    }),
    rules: {
      pattern: pattern,
      ...validation,
      required: isRequired && `Il campo '${label}' è obbligatorio`
    }
  });

  const computeWhen = useCallback(
    () =>
      has_when
        ? whenFn(
            when?.reduce((acc, curr, index) => {
              return { ...acc, [curr?.accessor]: watcher[curr?.accessor] };
            }, {}),
            when,
            when_strategy
          )
        : true,
    [when, has_when, watcher]
  );

  if (computeWhen() !== true) return null;

  return (
    <React.Fragment>
      <FieldInput {...field} {...props} required={isRequired} />

      {hint && (
        <small style={{ color: '#ccc', fontWeight: 600, margin: '0px 3px' }}>
          {hint || <React.Fragment>&nbsp;</React.Fragment>}
        </small>
      )}

      {errors[name as any] && (
        <small style={{ color: 'red', fontWeight: 600, margin: '0px 3px' }}>
          <ErrorMessage errors={errors} name={name as any} />
        </small>
      )}
    </React.Fragment>
  );
};
