import React from 'react';
import FormLabel from '../../FormComponents/FormLabel';

export const Divider: React.FunctionComponent<
  Partial<{ label: string; textTransform: any; marginBottom: string }>
> = ({ label, textTransform, marginBottom = '20px' }) => {
  return (
    <React.Fragment>
      {label && <FormLabel textTransform={textTransform}>{label}</FormLabel>}
      <div
        style={{
          display: 'block',
          background: 'rgb(226 226 226)',
          width: '100%',
          height: '2px',
          marginBottom: marginBottom
        }}
      />
    </React.Fragment>
  );
};
