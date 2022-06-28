import CommonButton from '@components/shared/CommonButton';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppSelector } from '@stateManager/stores/appStore';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { MODAL_TYPE } from 'utils/constant';
import { EditIcon } from 'utils/icons';
import Icon from '@components/shared/Icons';
import { defaultDietary } from '@components/apps/UserProfile/mocks';
import get from 'lodash/get';

export interface UserProfileProps {
  handleClose: any;
  handleLogout: () => void;
  setTypeUser: any;
}

const useStyles = makeStyles(() => ({
  menuWrapper: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  dietary: {
    fontSize: 12,
    fontWeight: 600,
  },
  tagDietary: {
    padding: '7px 14px !important',
    gap: '6px',
    cursor: 'unset',
  },
}));

export const UserProfileDropDown = (props: UserProfileProps) => {
  const classes = useStyles();
  const { handleClose, setTypeUser, handleLogout } = props;
  const user = useAppSelector((state: any) => state.user);
  const dispatch = useDispatch();
  

  return (
    <>
      {!user?.dietary.length && !user?.detail.eatEverything ? (
        <Box p="10px 16px 10px 16px">
          <Typography
            fontSize={16}
            fontWeight={700}
            mb={2}
            className="title-font"
          >
            My preferences
          </Typography>
          <Box textAlign="left" mb={2} maxWidth={200}>
            <Typography
              style={{ color: '#BDBDBD' }}
              fontSize={15}
              fontWeight={600}
              fontStyle="italic"
            >
              Set your dietary preferences and we will apply them to all the
              menus, so you only see the food you want
            </Typography>
          </Box>
          <Button
            onClick={() => {
              dispatch(toggleOpenModal(MODAL_TYPE.ADD_DIETARY));
              setTypeUser('old');
            }}
            startIcon={<AddIcon />}
          >
            <Typography
              textTransform="capitalize"
              fontSize={14}
              fontWeight={600}
              className="title-font"
            >
              Add dietary preferences
            </Typography>
          </Button>
        </Box>
      ) : (
        <Box display="flex" p="10px 16px 10px 16px">
          <Box>
            <Box
              mb={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontSize={16}
                fontWeight={700}
                mr={2}
                className="title-font"
              >
                My preferences
              </Typography>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  dispatch(toggleOpenModal(MODAL_TYPE.ADD_DIETARY));
                  setTypeUser('old');
                }}
              >
                <EditIcon
                  fill="var(--fairy-floss-pink-2)"
                  style={{ fontSize: 14 }}
                />
              </IconButton>
            </Box>
            {(get(user, 'detail.eatEverything', false)
              ? (user?.dietary || []).concat(defaultDietary)
              : user?.dietary || []
            ).map((dietary: any) => (
              <Box key={dietary.id} textAlign="left" mb={1.5}>
                <CommonButton
                  className={classes.tagDietary}
                  $borderColor="var(--leafy-green-2)"
                  height={42}
                >
                  <Icon
                    size={24}
                    icon={dietary.name}
                    color="var(--leafy-green-2)"
                  />
                  <Typography
                    fontSize={14}
                    fontWeight={700}
                    color="var(--leafy-green-2)"
                    className="title-font"
                  >
                    {dietary.name}
                  </Typography>
                </CommonButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Divider style={{ marginBottom: 8 }} />
      <Link href="/my-profile" passHref>
        <MenuItem onClick={handleClose} className={classes.menuWrapper}>
          My account
        </MenuItem>
      </Link>
      <Box sx={{ display: {xs: 'block', md: 'none'} }}>
        <MenuItem onClick={handleLogout} className={classes.menuWrapper}>
          Log out
        </MenuItem>
      </Box>
    </>
  );
};
