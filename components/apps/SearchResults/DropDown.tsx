import React, { FC } from 'react';
import { Box, Button, Menu, styled, Typography } from '@mui/material';
import { ArrowDownIcon } from 'utils/icons';
import CommonButton from '@components/shared/CommonButton';

export interface Props {
  children?: React.ReactNode;
  name: string;
  apply?: () => void;
  close?: () => void;
  isBlur?: boolean
}

const Title = styled(Box)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '20px',
  textTransform: 'initial',
  width: 'max-content',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
  },
}));

const BlurBox = styled(Box)(() => ({
  background:
    'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
  position: 'absolute',
  bottom: '64px',
  height: '64px',
  width: '100%',
  left: 0,
  pointerEvents: 'none' 
}));

const TitleDropDown = ({ name, open }: { name: string; open: boolean }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Title
        style={{
          color: open ? 'var(--leafy-green-2)' : 'var(--neutral-black-1)',
        }}
        className="title-font"
      >
        {name}
      </Title>
      <ArrowDownIcon
        sx={{
          width: 12,
          height: 7,
          ml: { md: 3, xs: '12px' },
          position: 'relative',
          bottom: 1,
          color: open ? 'var(--leafy-green-2)' : 'var(--neutral-black-1)',
        }}
      />
    </Box>
  );
};

export const RenderMenuItem: FC<Props> = ({ children, name, apply }) => {
  return (
    <Box sx={{ margin: '-8px 0', minWidth: 200 }}>
      <Box
        sx={{
          padding: '19px 15px 19px 15px',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <TitleDropDown name={name} open={true} />
      </Box>
      {children}
      <Box sx={{ padding: '0 15px 15px', position: 'relative' }}>
        <CommonButton
          style={{ padding: '0 30px' }}
          background="var(--leafy-green-2)"
          onClick={apply}
          height={46}
        >
          <Typography
            className="title-font"
            color="var(--neutral-7)"
            fontSize={16}
          >
            Apply
          </Typography>
        </CommonButton>
      </Box>
    </Box>
  );
};

export const DropDown: FC<Props> = ({ children, name, apply, close, isBlur }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    close && close();
  };

  const handleClose = () => {
    setAnchorEl(null);
    close && close();
  };

  const nameMenu = name.replace(' ', '-');

  return (
    <Box>
      <Button
        id={`${nameMenu}-button`}
        aria-controls={open ? `${nameMenu}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ padding: { md: '15px 15px', xs: '15px 0px' } }}
      >
        <TitleDropDown name={name} open={open} />
      </Button>
      <Menu
        id={`${nameMenu}-menu`}
        aria-labelledby={`${nameMenu}-button`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <RenderMenuItem
          name={name}
          apply={() => {
            apply && apply();
            setAnchorEl(null);
          }}
        >
          {children}
          {isBlur && <BlurBox />}
        </RenderMenuItem>
      </Menu>
    </Box>
  );
};

export default DropDown;
