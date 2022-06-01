import React, { FunctionComponent } from 'react';
import type { TimePickerProps as MUITimePickerProps } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MUILocalizationProvider from '@mui/lab/LocalizationProvider';
import MUITextField from '@mui/material/TextField';
import MUIFromGroup from '@mui/material/FormGroup';
import MUITimePicker from '@mui/lab/TimePicker';
import itLocale from 'date-fns/locale/it';

export type FGTimeProps = {
  name?: string;
  variant?: string;
  size?: string;
  required?: boolean;
  readonly?: boolean;
  sx?: any;
} & Omit<MUITimePickerProps, 'renderInput'>;

const TimePicker: FunctionComponent<FGTimeProps> = ({
  name,
  variant,
  size,
  label,
  required,
  readonly,
  value,
  sx,
  onChange,
  ...props
}) => {
  return (
    <MUIFromGroup row={true} sx={sx ? sx : { width: '100%' }}>
      <MUILocalizationProvider dateAdapter={AdapterDateFns} locale={itLocale}>
        <MUITimePicker
          label={label}
          value={value}
          readOnly={readonly}
          onChange={(newValue) => onChange(newValue)}
          {...props}
          renderInput={(params: any) => (
            <MUITextField
              type={'date'}
              name={name}
              variant={variant}
              size={size}
              required={required}
              fullWidth={true}
              {...params}
            />
          )}
        />
      </MUILocalizationProvider>
    </MUIFromGroup>
  );
};

export default TimePicker;
