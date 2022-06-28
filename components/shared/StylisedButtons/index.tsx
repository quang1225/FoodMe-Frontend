import React, { useState, FC } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Image from 'next/image';
import isNumber from 'lodash/isNumber';

const useStyles = makeStyles(() => ({
  stylisedButton: {
    width: '141px',
    height: '139px',
    background: '#FFFFFF',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.18)',
    borderRadius: 4,
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(242, 242, 242, 0.6)',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.18)',
    },
  },
  label: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#333333',
    width: 'max-content',
    margin: 'auto',
  },
  des: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#828282',
  },

  // Square
  square: {},

  // Circle
  circle: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
    borderRadius: '100%',
    width: '45px',
    height: '45px',
    padding: '8px',
    cursor: 'pointer',
  },
  circleLabel: {
    fontSize: '12px',
    marginRight: '3px',
  },
  circleDes: {
    fontWeight: 600,
    color: '#BDBDBD',
  },

  // Disabled
  icon: {
    opacity: 1,
  },

  disabled: {
    cursor: 'unset',
    background: '#F2F2F2',
    boxShadow: 'none',
    '& $icon': {
      opacity: 0.2,
    },
    '& $label, & $des': {
      color: '#BDBDBD',
    },
    '&:hover': {
      boxShadow: 'none',
      background: '#F2F2F2',
    },
  },

  actived: {
    background: '#AEE1D3',
    '& $label, & $des, & $circleDes': {
      color: '#fff',
    },
    '&:hover': {
      background: '#AEE1D3',
    },
  },
}));

export interface ButtonSquareProps {
  icon: string;
  title: string;
  disabled?: boolean;
  count?: number;
  actived?: boolean;
}

export const ButtonSquare: FC<ButtonSquareProps> = ({ ...props }) => {
  const classes = useStyles();
  const { icon, title, disabled, count, actived } = props;
  const [srcImg, setSrcImg] = useState('');
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      className={`${classes.stylisedButton} ${classes.square} ${
        actived && classes.actived
      } ${disabled && classes.disabled}`}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Image
          className={classes.icon}
          src={
            srcImg || `/images/dietary/${icon}${actived ? '-white' : ''}.svg`
          }
          alt="icon"
          width={50}
          height={50}
          onError={() => {
            setSrcImg(`/images/dietary/nutfree${actived ? '-white' : ''}.svg`);
          }}
        />
        <div className={classes.label}>{title}</div>
        {isNumber(count) && <div className={classes.des}>({count})</div>}
      </Box>
    </Box>
  );
};

export interface ButtonCircleProps {
  icon: string;
  label?: string;
  disabled?: boolean;
  actived?: boolean;
  count?: number;
}

export const ButtonCircle: FC<ButtonCircleProps> = ({ ...props }) => {
  const classes = useStyles();
  const { icon, label, disabled, actived, count } = props;
  const [srcImg, setSrcImg] = useState('');

  return (
    <Box sx={{ width: 'max-content', textAlign: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className={`${classes.circle} ${actived && classes.actived} ${
          disabled && classes.disabled
        }`}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            className={classes.icon}
            src={
              srcImg || `/images/dietary/${icon}${actived ? '-white' : ''}.svg`
            }
            alt="icon"
            width={50}
            height={50}
            onError={() => {
              setSrcImg(
                `/images/dietary/nutfree${actived ? '-white' : ''}.svg`,
              );
            }}
          />
        </Box>
      </Box>
      {label && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <div
            style={{ color: disabled ? '#828282' : '#333333' }}
            className={`${classes.label} ${classes.circleLabel}`}
          >
            {label}
          </div>
          <div className={`${classes.label} ${classes.circleDes}`}>
            ({count || '#'})
          </div>
        </Box>
      )}
    </Box>
  );
};
