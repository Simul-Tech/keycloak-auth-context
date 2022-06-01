import React, { FunctionComponent, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MUIFormControl from '@mui/material/FormControl';
import MUIFormLabel from '@mui/material/FormLabel';
import { styled, SxProps } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { FCC } from '../../FormGenerator/core/types';

const Quill = dynamic(() => import('react-quill'), { ssr: false });

const QuillEditorRoot = styled(Quill)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: 1,
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  borderStyle: 'solid',
  display: 'flex',
  flexDirection: 'column',

  '& .ql-snow.ql-toolbar': {
    fontFamily: theme.typography.body1.fontFamily,
    borderColor: theme.palette.divider,
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    '& .ql-picker-label': {
      color: theme.palette.text.secondary
    },
    '& .ql-picker-label:hover': {
      color: theme.palette.primary.main
    },
    '& .ql-picker-label.ql-active': {
      color: theme.palette.primary.main
    },
    '& .ql-picker-item:hover': {
      color: theme.palette.primary.main
    },
    '& .ql-picker-item.ql-selected': {
      color: theme.palette.primary.main
    },
    '& button': {
      color: theme.palette.text.secondary,
      '& .ql-stroke': {
        stroke: theme.palette.text.secondary
      }
    },
    '& button:hover': {
      color: theme.palette.primary.main,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main
      }
    },
    '& button:focus': {
      color: theme.palette.primary.main,
      '& .ql-stroke': {
        stroke: theme.palette.primary.main
      }
    },
    '& button.ql-active': {
      '& .ql-stroke': {
        stroke: theme.palette.primary.main
      }
    },
    '& .ql-stroke': {
      stroke: theme.palette.text.primary
    },
    '& .ql-picker': {
      color: theme.palette.text.primary
    },
    '& .ql-picker-options': {
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[10],
      padding: theme.spacing(2)
    }
  },
  '& .ql-snow.ql-container': {
    borderBottom: 'none',
    borderColor: theme.palette.divider,
    borderLeft: 'none',
    borderRight: 'none',
    flexGrow: 1,
    overflow: 'hidden',
    '& .ql-editor': {
      color: theme.palette.text.primary,
      fontFamily: theme.typography.body1.fontFamily,
      fontSize: '0.875rem',
      fontWeight: 500,
      padding: theme.spacing(2),

      '&.ql-blank::before': {
        color: theme.palette.grey[100],
        fontWeight: 400,
        fontStyle: 'normal',
        left: theme.spacing(2)
      }
    }
  }
}));

export type FGQuillEditorProps = {
  name?: string;
  value?: string;
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
  obfuscable?: boolean;
  placeholder?: string;
  label?: string;
  sx?: SxProps;
  onChange?: any;
};

const QuillEditor: FCC<FGQuillEditorProps> = ({
  name,
  value,
  readonly,
  required,
  disabled,
  obfuscable,
  placeholder,
  label,
  sx,
  onChange,
  children,
  ...props
}) => {
  useEffect(() => {
    if (obfuscable) {
      document
        .querySelector(`#quillEditor_${name} .ql-editor`)
        ?.setAttribute('contenteditable', 'false');
    }
  });

  return (
    <MUIFormControl required={required} sx={sx ? sx : { width: '100%' }}>
      {label && (
        <MUIFormLabel
          sx={{
            lineHeight: '1rem',
            fontWeight: 400,
            fontSize: '0.7rem',
            left: '12px'
          }}
        >
          {label}
        </MUIFormLabel>
      )}
      <QuillEditorRoot
        id={`quillEditor_${name}`}
        readOnly={readonly || disabled}
        value={value}
        placeholder={required ? placeholder + ' *' : placeholder}
        onChange={onChange}
        preserveWhitespace
        modules={
          obfuscable
            ? {
                toolbar: [['strike']]
              }
            : {}
        }
        {...props}
      />
    </MUIFormControl>
  );
};

export default QuillEditor;
