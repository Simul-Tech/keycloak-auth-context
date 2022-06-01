import React,  { FunctionComponent } from 'react';
import { SelectProps as MUISelectProps } from '@mui/material';
import MUIFormGroup from '@mui/material/FormGroup';
import MUIFormControl from '@mui/material/FormControl';
import MUIInputLabel from '@mui/material/InputLabel';
import MUIMenuItem from '@mui/material/MenuItem';
import MUISelect from '@mui/material/Select';
import MUICheckbox from '@mui/material/Checkbox';
import MUIListItemText from '@mui/material/ListItemText';

export type FGSelectCheckboxProps = {
  readonly?: boolean;
  options?: any[];
  hiddenLabel?: boolean;
  onDeleteItem?: any;
  value?: any[];
} & MUISelectProps;

const SelectCheckbox: FunctionComponent<FGSelectCheckboxProps> = ({
  name,
  variant,
  size,
  label,
  value,
  required,
  disabled,
  readonly,
  options,
  multiple,
  sx,
  hiddenLabel,
  onChange,
  onDeleteItem,
  ...props
}) => {
  return (
    <MUIFormGroup sx={sx ? sx : { width: '100%' }}>
      <MUIFormControl
        required={required}
        size={size}
        disabled={disabled}
        fullWidth={true}
      >
        {!hiddenLabel && (
          <MUIInputLabel variant={variant}>{label}</MUIInputLabel>
        )}
        <MUISelect
          name={name}
          variant={variant}
          size={size}
          label={label}
          value={value}
          disabled={disabled}
          inputProps={{ readOnly: readonly, placeholder: props?.placeholder }}
          fullWidth={true}
          multiple={multiple}
          onChange={onChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '300px'
              }
            }
          }}
          renderValue={(selected: any[]) => selected.join(', ')}
          {...props}
        >
          {!options || options?.length == 0 ? (
            <MUIMenuItem value="">
              <em>No options available</em>
            </MUIMenuItem>
          ) : (
            options?.map(
              ({ label: optionLabel, value: optionValue }, index) => (
                <MUIMenuItem
                  key={`${name}_${index}`}
                  value={optionValue}
                  disabled={value?.length > 0 && !value.includes(optionValue)}
                  sx={{ maxHeight: '33px' }}
                >
                  <MUICheckbox
                    key={`${name}_${index}_checkbox`}
                    checked={value.includes(optionValue)}
                  />
                  <MUIListItemText primary={optionLabel} />
                </MUIMenuItem>
              )
            )
          )}
        </MUISelect>
      </MUIFormControl>
    </MUIFormGroup>
  );
};

export default SelectCheckbox;
