import React,  { CSSProperties } from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue
} from 'react-hook-form';
import { SxProps } from '@mui/material';
import { FGInputProps } from '../../FormComponents/Input';
import { FGNumberInputProps } from '../../FormComponents/NumberInput';
import { FGRadioProps } from '../../FormComponents/Radio';
import { FGSelectProps } from '../../FormComponents/Select';
import { FGSelectAutocompleteProps } from '../../FormComponents/SelectAutocomplete';
import { FGCreatableSelectAutocompleteProps } from '../../FormComponents/CreatableSelectAutocomplete';
import { FGDateProps } from '../../FormComponents/DatePicker';
import { FGDateTimeProps } from '../../FormComponents/DateTimePicker';
import { FGTimeProps } from '../../FormComponents/TimePicker';
import { FGQuillEditorProps } from '../../FormComponents/QuillEditor';
import { FGTextareaProps } from '../../FormComponents/Textarea';
import { FGCheckboxProps } from '../../FormComponents/Checkbox';
import { FGSelectCheckboxProps } from '../../FormComponents/SelectCheckbox';

export type FCC<P> = React.FunctionComponent<P & {children?  : React.ReactNode}> 

export type OverrideRequired<T1> = Omit<T1, 'required'> & {
  required?: boolean;
};

export interface Props<T> {
  structure: (BaseInputProps<T> | GroupProps<T>)[];
  currentStep?: string;
  style?: CSSProperties;
  values?: T;
  type?: null | 'simple' | 'stepper';
}

export type BaseInputProps<T> =
  | InputProps<T>
  | TextareaProps<T>
  | NumberInputProps<T>
  | CheckboxProps<T>
  | SelectProps<T>
  | SelectCheckboxProps<T>
  | SelectAutocompleteProps<T>
  | CreatableSelectAutocompleteProps<T>
  | RadioProps<T>
  | DateProps<T>
  | TimeProps<T>
  | DateTimeProps<T>
  | QuillEditorProps<T>
  | CustomProps<T>;

export interface FGOption {
  label?: string;
  value?: any;
}

export type WhenProps = { accessor: string; value: any; comparator?: any };

export interface FieldProps<T> {
  name?: keyof T;
  mapping_name?: string;
  required?: boolean | Function;
  type?: string;
  hint?: string;
  label?: string;
  labelSize?: 'xs' | 'sm' | 'md' | 'lg' | 'default';
  labelColor?: string;
  placeholder?: string;
  marginTop?: 'none' | 'default' | 'big';
  width?: number;
  marginRight?: number;

  // CSS
  style?: CSSProperties;
  validation?: any;
  pattern?: any;
  step?: number;
  step_id?: string;

  when?: WhenProps[];
  has_when?: boolean;
  when_strategy?: string;
  render?: () => any;
  value?: any;
  default_value?: any;

  sx?: SxProps;

  onChange?: (value) => void;
}

export interface InputProps<T> extends FieldProps<T> {
  type:
    | 'text'
    | 'email'
    | 'url'
    | 'divider'
    | 'space'
    | 'tel'
    | 'address'
    | 'password';
  value?: string;
  inputLeftElement?: JSX.Element;
  inputRightElement?: JSX.Element;
  componentProps?: FGInputProps;
}

export type FGHookForm<T> = Partial<T & ControllerRenderProps>;

export interface TextareaProps<T> extends FieldProps<T> {
  type: 'textarea';
  value?: string;
  componentProps?: FGTextareaProps;
}

export interface NumberInputProps<T> extends FieldProps<T> {
  type: 'number';
  value?: string;
  step?: number;
  showStepper?: boolean;
  precision?: number;
  inputLeftElement?: JSX.Element;
  inputRightElement?: JSX.Element;
  componentProps?: FGNumberInputProps;
}

export interface DateProps<T> extends FieldProps<T> {
  type: 'date';
  value?: string | Date;
  componentProps?: Omit<FGDateProps, 'onChange' | 'value' | 'renderInput'>;
}

export interface TimeProps<T> extends FieldProps<T> {
  type: 'time';
  value?: string | Date;
  componentProps?: Omit<FGTimeProps, 'onChange' | 'value' | 'renderInput'>;
}

export interface DateTimeProps<T> extends FieldProps<T> {
  type: 'date-time';
  value?: string | Date;
  componentProps?: Omit<FGDateTimeProps, 'onChange' | 'value' | 'renderInput'>;
}

export interface CheckboxProps<T extends any> extends FieldProps<T> {
  type: 'checkbox';
  value?: boolean;
  componentProps?: FGCheckboxProps;
}

export interface SelectProps<T> extends FieldProps<T> {
  type: 'select';
  value?: string | number | string[] | number[];
  options?: FGOption[];
  componentProps?: Omit<FGSelectProps, 'options'>;
}

export interface SelectAutocompleteProps<T> extends FieldProps<T> {
  type: 'select-autocomplete';
  label?: string;
  placeholder?: string;
  options?: FGOption[];
  optionMapping?: (arg: any) => FGOption[];
  value?: string | number | any;
  query?: (
    value?: string,
    getValues?: UseFormGetValues<FieldValues>
  ) => Promise<any>;
  onSelect?: (value?: any, setValue?: UseFormSetValue<FieldValues>) => void;
  onInit?: (value?: any) => void;
  clearField?: (setValue?: UseFormSetValue<FieldValues>) => any;
  componentProps?: Omit<
    FGSelectAutocompleteProps,
    'options' | 'onChange' | 'renderInput'
  >;
}

export interface CreatableSelectAutocompleteProps<T> extends FieldProps<T> {
  type: 'creatable-select-autocomplete';
  label?: string;
  placeholder?: string;
  options?: FGOption[];
  optionMapping?: (arg: any) => FGOption[];
  value?: string | number | any;
  query?: (
    value?: string,
    getValues?: UseFormGetValues<FieldValues>
  ) => Promise<any>;
  onSelect?: (
    value?: any,
    setval?: (arg: any) => void,
    setValue?: UseFormSetValue<FieldValues>
  ) => void;
  onInit?: (value?: any) => void;
  clearField?: (setValue?: UseFormSetValue<FieldValues>) => any;
  componentProps?: Omit<
    FGCreatableSelectAutocompleteProps,
    'options' | 'onChange' | 'renderInput'
  >;
  dialogComponent?: (
    getValues?: UseFormGetValues<FieldValues>,
    setval?: (arg: any) => void,
    setValue?: UseFormSetValue<FieldValues>
  ) => JSX.Element;
}

export interface RadioProps<T> extends FieldProps<T> {
  type: 'radio';
  label?: string;
  onInit?: (value?: any) => Promise<any>;
  optionMapping?: (arg: any) => FGOption[];
  options?: FGOption[];
  value?: string | number;
  onSelect?: (value: boolean) => void;
  componentProps?: Omit<FGRadioProps, 'options'>;
}

export interface QuillEditorProps<T> extends FieldProps<T> {
  type: 'quill';
  componentProps?: FGQuillEditorProps;
}

export interface SelectCheckboxProps<T> extends FieldProps<T> {
  type: 'select-checkbox';
  value?: string | number | string[] | number[];
  options?: FGOption[];
  componentProps?: Omit<FGSelectCheckboxProps, 'options'>;
}

export interface CustomProps<T> extends FieldProps<T> {
  type: 'custom';
  render: (props?: any) => any;
}

export interface GroupProps<T> extends FieldProps<T> {
  type: 'group';
  groupItems: BaseInputProps<T>[];
}
