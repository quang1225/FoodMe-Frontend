import React, { useState, FC, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Dialog, List, Theme, Typography, useMediaQuery } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '@stateManager/stores/appStore';
import { createMyDietaryApi } from '../../../services/dietary/dietaryApi';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  getMyDietary,
  setUserDetail,
} from '@stateManager/stores/slices/userSlice';
import CommonButton from '@components/shared/CommonButton';
import Icon from '@components/shared/Icons';
import { IDietary } from '@services/dietary/dietaryApi.types';
import { defaultDietary } from './mocks';
import { MOBILE_BREAKPOINT } from 'utils/constant';

const useStyles = makeStyles((theme: Theme) => ({
  editDietaryDialog: {
    padding: '29px 55px 39px 55px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',

    [theme?.breakpoints?.down('sm')]: {
      padding: '29px 15px 39px 15px',
    },
  },
  titleDialog: {
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '35px',
    textAlign: 'center',
    color: 'var(--orange-zest-2)',
    fontFamily: 'PP Agrandir',
  },
  descriptionDialog: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '24px',
    color: '#111111',
    maxWidth: 455,
  },
  list: {
    margin: '-10px',
  },
  submit: {
    textTransform: 'none',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '30px',
    color: '#F2F2F2',
    fontFamily: 'PP Agrandir',
    backgroundColor: 'var(--leafy-green-2)',
    boxShadow: 'none',
    borderRadius: '100px',
    height: '52px',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  cancel: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '30px',
    color: 'var(--neutral-black-1)',
    textAlign: 'center',
    cursor: 'pointer',
  },
}));

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  update?: (dietarySelected: any) => void;
  myDietary: any;
  isCreate?: boolean;
}

export const EditDietaryPreferences: FC<DialogProps> = ({
  open,
  onClose,
  myDietary,
  isCreate,
}) => {
  const classes = useStyles();
  const dietaryState = useAppSelector(appState => appState.dietary);
  const { detail } = useAppSelector(appState => appState.user);
  const [dietarySelected, setDietary] = useState<any>(myDietary);
  const [isLoading, setLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);

  const dispatch = useDispatch();

  useEffect(() => {
    open &&
      setDietary(
        detail.eatEverything ? myDietary.concat(defaultDietary) : myDietary,
      );
  }, [open]);

  // useEffect(() => {
  //   !dietarySelected.length && setDietary([defaultDietary]);
  // }, [dietarySelected]);

  const handleClose = () => {
    setLoading(false);
    return onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const listDietary = dietarySelected.map((dietary: IDietary) => dietary.id);
    try {
      await createMyDietaryApi({ idList: listDietary });
    } catch (error: any) {
      toast.error(error);
    }

    dispatch(
      setUserDetail({
        ...detail,
        ...{
          eatEverything: dietarySelected.some(
            (item: IDietary) => item.id === 0,
          ),
        },
      }),
    );
    dispatch(getMyDietary());
    handleClose();
  };

  const handleSetDietary = (dietary: IDietary) => {
    const position = dietarySelected?.findIndex(
      (item: IDietary) => item.id === dietary.id,
    );
    if (position > -1) {
      return setDietary(
        dietarySelected?.filter((item: IDietary) => item.id !== dietary.id),
      );
    }
    if (!dietary.id) {
      return setDietary([dietary]);
    }
    setDietary(dietarySelected?.concat(dietary));
  };

  const isSelectedDietary = (dietary: IDietary) => {
    return dietarySelected?.some((item: IDietary) => item.id === dietary.id);
  };

  const hideDietary = (dietaryName: string) => {
    return !(dietaryName.includes('option') || dietaryName === 'Omnivore');
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          maxWidth: '572px',
          backgroundColor: 'var(--baby-blue-30)',
          height: 'calc(100% - 20px)',
          maxHeight: '900px',
        },
      }}
    >
      <List className={classes.editDietaryDialog}>
        <Box>
          {isCreate ? (
            <>
              <Box className={classes.titleDialog}>
                Great! One last thing...
              </Box>
              <Box
                sx={{ mb: '49px', mt: '20px' }}
                className={classes.descriptionDialog}
              >
                Set your dietary preferences and we will apply them to all the
                menus,
                <br /> so you only see the food you want.{' '}
                <b>Select all that apply.</b>
              </Box>
            </>
          ) : (
            <Box sx={{ mb: '49px' }} className={classes.titleDialog}>
              Dietary preferences
            </Box>
          )}
          <Box className={classes.list}>
            {[...get(dietaryState, 'list', []), ...[defaultDietary]].filter((dietary: any) => hideDietary(dietary.name))
              .map((dietary: any) => (
                <Box
                  sx={{
                    display: 'inline-block',
                    margin: '10px',
                    verticalAlign: 'middle',
                  }}
                  key={dietary.id}
                >
                  <CommonButton
                    onClick={() => handleSetDietary(dietary)}
                    sx={{ width: 'max-content' }}
                    height={isMobile ? 45 : 55}
                    background={
                      isSelectedDietary(dietary)
                        ? 'var(--leafy-green-2)'
                        : 'var(--neutral-7)'
                    }
                    $borderColor="var(--leafy-green-2)"
                    $textColor={
                      !isSelectedDietary(dietary)
                        ? 'var(--leafy-green-2)'
                        : 'var(--fairy-floss-pink-4)'
                    }
                    disabled={
                      dietary.id &&
                      dietarySelected.some((item: IDietary) => !item.id)
                    }
                  >
                    <Icon
                      size={34}
                      icon={dietary.name}
                      color={
                        dietary.id &&
                        dietarySelected.some((item: IDietary) => !item.id)
                          ? 'var(--neutral-4)'
                          : !isSelectedDietary(dietary)
                          ? 'var(--leafy-green-2)'
                          : 'var(--fairy-floss-pink-4)'
                      }
                    />
                    <Typography
                      fontSize={14}
                      fontWeight={700}
                      className="title-font"
                      sx={{ ml: 1 }}
                    >
                      {dietary.name}
                    </Typography>
                  </CommonButton>
                </Box>
              ),
            )}
          </Box>
        </Box>
        <Box mt={5}>
          <LoadingButton
            fullWidth
            variant="contained"
            size="large"
            className={classes.submit}
            sx={{ mb: 3 }}
            onClick={handleSubmit}
            loading={isLoading}
          >
            {isCreate ? 'Create my account' : 'Update my preferences'}
          </LoadingButton>
          <Typography sx={{pb: {xs: 3, md: 0}}} onClick={handleClose} className={classes.cancel}>
            {isCreate ? 'Skip for now' : 'Cancel'}
          </Typography>
        </Box>
      </List>
    </Dialog>
  );
};

export default EditDietaryPreferences;
