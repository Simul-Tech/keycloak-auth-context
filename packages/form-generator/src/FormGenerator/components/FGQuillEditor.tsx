import React, { FunctionComponent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import QuillEditor from '../../FormComponents/QuillEditor';
import { useFGProvider } from '../core/context';
import { FGHookForm, OverrideRequired, QuillEditorProps } from '../core/types';

export const FGQuillEditor: FunctionComponent<
  FGHookForm<OverrideRequired<QuillEditorProps<any>>>
> = ({ componentProps, type, ...props }) => {
  const fgProviderProps = useFGProvider();
  const { setValue } = useFormContext();

  useEffect(() => {
    if (props?.value) {
      setValue(props.name as string, props?.value);
    }
  }, []);

  const _onChange = (value: string) => {
    if (value == '<p><br></p>') {
      value = '';
    }
    setValue(props.name as string, value);
    props.onChange(value);
  };

  return (
    <React.Fragment>
      <QuillEditor
        {...fgProviderProps}
        {...componentProps}
        {...props}
        readonly={fgProviderProps?.readonly || componentProps?.readonly}
        value={props.value ? props.value : ''}
        onChange={_onChange}
      />
    </React.Fragment>
  );
};
