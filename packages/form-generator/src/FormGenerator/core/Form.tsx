import React from 'react';
import Grid from '@mui/material/Grid';
import { isTrue } from '../utils/Functions';
import { Field } from './Field';
import { Props } from './types';

export const Form = <T extends any>(props: Props<T>) => {
  const fields = props.structure;

  return (
    <Grid container spacing={2}>
      {(fields || []).map((field, idx) => {
        const {
          sx = { width: { xs: '100%' } }, // default width
          name,
          required,
          style,
          ...fieldProps
        } = field;
        return (
          <Grid item sx={sx} key={`fg_${idx}`}>
            <Field
              key={`${idx}_${name as string}`}
              required={isTrue(required as any)}
              style={style}
              name={name}
              {...fieldProps}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
