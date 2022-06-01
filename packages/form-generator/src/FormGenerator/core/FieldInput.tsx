import React,{ forwardRef } from 'react';

import {
  FGCheckbox,
  FGInput,
  FGNumberInput,
  FGTextarea,
  FGRadio,
  FGSelect,
  FGDate,
  FGTime,
  FGDateTime,
  FGSelectAutocomplete,
  FGCreatableSelectAutocomplete,
  FGQuillEditor,
  FGSelectCheckbox
} from '../components';

import {
  BaseInputProps,
  CheckboxProps,
  DateProps,
  DateTimeProps,
  FGHookForm,
  GroupProps,
  InputProps,
  NumberInputProps,
  RadioProps,
  SelectAutocompleteProps,
  CreatableSelectAutocompleteProps,
  SelectProps,
  TextareaProps,
  TimeProps,
  QuillEditorProps,
  SelectCheckboxProps,
  OverrideRequired
} from './types';

export const FieldInput = forwardRef<
  unknown,
  FGHookForm<
    OverrideRequired<BaseInputProps<any>> | OverrideRequired<GroupProps<any>>
  >
>((props, ref) => {
  const { has_when, when, when_strategy, ...fieldProps } = props;

  switch (props.type) {
    case 'select-autocomplete':
      return (
        <FGSelectAutocomplete
          {...(fieldProps as FGHookForm<
            OverrideRequired<SelectAutocompleteProps<any>>
          >)}
        />
      );

    case 'creatable-select-autocomplete':
      return (
        <FGCreatableSelectAutocomplete
          {...(fieldProps as FGHookForm<
            OverrideRequired<CreatableSelectAutocompleteProps<any>>
          >)}
        />
      );

    case 'date-time':
      return (
        <FGDateTime
          {...(fieldProps as FGHookForm<OverrideRequired<DateTimeProps<any>>>)}
        />
      );

    case 'time':
      return (
        <FGTime
          {...(fieldProps as FGHookForm<OverrideRequired<TimeProps<any>>>)}
        />
      );

    case 'date':
      return (
        <FGDate
          {...(fieldProps as FGHookForm<OverrideRequired<DateProps<any>>>)}
        />
      );

    case 'select':
      return (
        <FGSelect
          {...(fieldProps as FGHookForm<OverrideRequired<SelectProps<any>>>)}
        />
      );

    case 'select-checkbox':
      return (
        <FGSelectCheckbox
          {...(fieldProps as FGHookForm<
            OverrideRequired<SelectCheckboxProps<any>>
          >)}
        />
      );

    case 'radio':
      return (
        <FGRadio
          {...(fieldProps as FGHookForm<OverrideRequired<RadioProps<any>>>)}
        />
      );

    case 'checkbox':
      return (
        <FGCheckbox
          {...(fieldProps as FGHookForm<OverrideRequired<CheckboxProps<any>>>)}
        />
      );

    case 'textarea':
      return (
        <FGTextarea
          {...(fieldProps as FGHookForm<OverrideRequired<TextareaProps<any>>>)}
        />
      );

    case 'number':
      return (
        <FGNumberInput
          {...(fieldProps as FGHookForm<
            OverrideRequired<NumberInputProps<any>>
          >)}
        />
      );

    case 'quill':
      return (
        <FGQuillEditor
          {...(fieldProps as FGHookForm<
            OverrideRequired<QuillEditorProps<any>>
          >)}
        />
      );

    default:
      return (
        <FGInput
          {...(fieldProps as FGHookForm<OverrideRequired<InputProps<any>>>)}
        />
      );
  }
});

FieldInput.displayName = 'FieldInput';
