import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  systemButton: (props: any) => ({
    border: 0,
    borderRadius: 4,
    padding: `${props.size}px 20px`,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    textTransform: 'unset',
    display: 'block',
    '&.Mui-disabled': {
      background: '#F2F2F2',
      border: 0,
    },
  }),
  primary: {
    background: '#333333',
    border: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    color: '#F2F2F2',
    borderColor: '#333333',
    '&:hover, &:focus': {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
      background: '#4F4F4F',
    },
  },
  secondary: {
    background: '#FFFFFF',
    border: 1,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    color: '#333333',
    borderColor: '#BDBDBD',
    '&:hover, &:focus': {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
    },
    '&:active': {
      color: '#4F4F4F',
      background: '#BDBDBD',
      borderColor: '#BDBDBD',
    },
  },
  tertiary: {
    color: '#333333',
    '&:hover, &:focus': {
      boxShadow: 'none',
    },
    '&:active': {
      color: '#4F4F4F',
    },
  },
});

export interface ButtonProps {
  click?: () => void;
  size?: number;
}

export const PrimaryButton: FC<ButtonProps> = ({
  click,
  size = 12,
  ...props
}) => {
  const styleProps: any = { size: size };
  const classes = useStyles(styleProps);

  return (
    <Button
      onClick={click}
      className={`${classes.systemButton} ${classes.primary}`}
    >
      {props.children}
    </Button>
  );
};

export const SecondaryButton: FC<ButtonProps> = ({ size = 12, ...props }) => {
  const styleProps: any = { size: size };
  const classes = useStyles(styleProps);
  return (
    <Button className={`${classes.systemButton} ${classes.secondary}`}>
      {props.children}
    </Button>
  );
};

export const TertiaryButton: FC<ButtonProps> = ({ size = 12, ...props }) => {
  const styleProps: any = { size: size };
  const classes = useStyles(styleProps);

  return (
    <Button className={`${classes.systemButton} ${classes.tertiary}`}>
      {props.children}
    </Button>
  );
};
