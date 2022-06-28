import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { grey } from '@mui/material/colors';
import { Box, CircularProgress, Dialog, List, Theme } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorIcon from '@mui/icons-material/Error';
import { toast } from 'react-toastify';
import VerifyCodeForm from '../VerifyCode/VerifyCodeForm';
import {
  updateUserDetailApi,
  verifyUpdateEmailApi,
  verifyPhoneNumberApi,
} from '@services/user/userApi';
import { IUserDetail } from '@stateManager/stores/types/user.types';
import CommonButton from '@components/shared/CommonButton';
import { phoneFormat, phoneRegExp, validPhoneNumber, validURL } from '@/utils';
import isEmpty from 'lodash/isEmpty';
import CommonTextField from '@components/shared/CommonTextField';

const useStyles = makeStyles((theme: Theme) => ({
  editDietaryDialog: {
    padding: '29px 41px 39px 41px',
    maxWidth: '572px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',

    [theme?.breakpoints?.down('sm')]: {
      padding: '29px 20px 39px 20px',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleDialog: {
    fontWeight: 600,
    fontSize: '30px',
    lineHeight: '35px',
    textAlign: 'center',
    color: 'var(--orange-zest-2)',
    fontFamily: 'PP Agrandir',
  },
  submit: {
    backgroundColor: grey[900],
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '30px',
    color: '#F2F2F2',
    '&:hover': {
      backgroundColor: grey[800],
    },
  },
  cancel: {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '30px',
    color: '#333333',
  },
  error: {
    fontStyle: 'italic',
    marginLeft: 0,
  },
}));

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  profileDetail: IUserDetail;
  setDetail: (myDetail: any) => void;
}

export const EditMyDetail = ({
  open,
  onClose,
  profileDetail,
  setDetail,
}: DialogProps) => {
  const classes = useStyles();
  const [verifyModal, setVerifyModal] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);

  const createAccountSchema = yup.object({
    firstName: yup
      .string()
      .max(30, 'First name must be at most 30 characters')
      .min(2, 'First name must be at least 2 characters')
      .required('Please enter your first name')
      .test('firstName', 'Please enter valid name', function (value: any) {
        if (validURL(value) || validPhoneNumber(value)) {
          return false;
        }
        return true;
      }),
    lastName: yup
      .string()
      .max(30, 'Last name must be at most 30 characters')
      .min(2, 'Last name must be at least 2 characters')
      .required('Please enter your last name')
      .test('lastName', 'Please enter valid name', function (value: any) {
        if (validURL(value) || validPhoneNumber(value)) {
          return false;
        }
        return true;
      }),
    email: yup
      .string()
      .email('Please enter a vaild email address')
      .required('Please enter your email'),
    phoneNumber: yup
      .mixed()
      .test(
        '8',
        'Phone number must have at least 8 characters',
        function (value: any = '') {
          if (value) {
            const format = value.replace(phoneFormat, '').length;
            if (format >= 8) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        },
      )
      .test(
        '12',
        'Phone number must have at most 12 characters',
        function (value: any = '') {
          if (value) {
            const format = value.replace(phoneFormat, '').length;
            if (format <= 12) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        },
      )
      .test(
        'phoneNumber',
        'Phone number is not valid',
        function (value: any = '') {
          if (value) {
            const isMatch = new RegExp(phoneRegExp).test(value);
            if (isMatch) {
              return true;
            } else {
              return false;
            }
          }
          return true;
        },
      ),
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    setError,
    getValues,
  } = useForm({
    resolver: yupResolver(createAccountSchema),
    mode: 'onChange',
    shouldFocusError: true,
    defaultValues: profileDetail,
  });

  const handleClose = () => {
    setVerifyModal(false);
    return onClose();
  };

  const onSubmit = async () => {
    setLoading(true);
    const data = getValues();
    let hasError = false;
    let verifiedEmail = false;

    if (data?.email && data?.email !== profileDetail.email) {
      verifiedEmail = true;
      const res = await verifyUpdateEmailApi(data?.email);
      if (!res.success) {
        hasError = true;
        setError('email', {
          type: 'exist',
        });
      }
    }

    if (
      data?.phoneNumber &&
      data?.phoneNumber.replace(phoneFormat, '').replace(/\s+/g, ' ') !==
        (profileDetail.phoneNumber || '')
          .replace(phoneFormat, '')
          .replace(/\s+/g, ' ')
    ) {
      const res = await verifyPhoneNumberApi(
        '+' + data?.phoneNumber.replace(phoneFormat, '').replace(/\s+/g, ' '),
      );
      if (!res.success) {
        hasError = true;
        setError('phoneNumber', {
          type: 'exist',
        });
      }
    }

    if (isEmpty(errors) && !hasError) {
      verifiedEmail ? setVerifyModal(true) : handleUpdateDetail();
    } else {
      setLoading(false);
    }
  };

  const handleUpdateDetail = async () => {
    const payload = { ...control._formValues };
    delete payload.id;
    delete payload.status;
    delete payload.deprecated;
    delete payload.srcName;
    delete payload.landingRestaurantId;
    payload.phoneNumber = (payload.phoneNumber || '').replace(/\s+/g, ' ');
    payload.phoneNumber ? payload.phoneNumber : (payload.phoneNumber = null);
    const res = await updateUserDetailApi(payload);

    const { ok, data, message } = res;
    setLoading(false);
    if (ok) {
      localStorage.setItem('userEmail', payload.email);
      setDetail(data);
    } else {
      toast.error(message);
    }
    handleClose();
  };

  const PhoneErrorMessage = () => {
    if (errors?.phoneNumber?.type !== 'exist')
      return errors?.phoneNumber?.message;
    return 'Mobile already exists. Use a different mobile number';
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
          <Box sx={{ mb: verifyModal ? 3 : 5 }} className={classes.titleDialog}>
            {verifyModal ? 'Check your email' : 'Edit details'}
          </Box>
          {verifyModal ? (
            <VerifyCodeForm
              updateEmail={getValues('email')}
              handleClose={() => handleUpdateDetail()}
            />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Box>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      variant="outlined"
                      required
                      fullWidth
                      label="First name"
                      color="secondary"
                      sx={{ mb: 4 }}
                      error={!!errors.firstName}
                      helperText={errors?.firstName?.message}
                      FormHelperTextProps={{
                        classes: {
                          root: classes.error,
                        },
                      }}
                      InputProps={{
                        endAdornment: errors.firstName ? (
                          <ErrorIcon sx={{ color: '#BC0000' }} />
                        ) : (
                          ''
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last name"
                      name="lastName"
                      color="secondary"
                      sx={{ mb: 4 }}
                      error={!!errors.lastName}
                      helperText={errors?.lastName?.message}
                      FormHelperTextProps={{
                        classes: {
                          root: classes.error,
                        },
                      }}
                      InputProps={{
                        endAdornment: errors.lastName ? (
                          <ErrorIcon sx={{ color: '#BC0000' }} />
                        ) : (
                          ''
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email address"
                      name="email"
                      color="secondary"
                      sx={{ mb: 4 }}
                      error={!!errors.email}
                      helperText={
                        errors?.email?.type !== 'exist'
                          ? errors?.email?.message
                          : 'Email already exists. Use a different email address'
                      }
                      FormHelperTextProps={{
                        classes: {
                          root: classes.error,
                        },
                      }}
                      InputProps={{
                        endAdornment: errors.email ? (
                          <ErrorIcon sx={{ color: '#BC0000' }} />
                        ) : (
                          ''
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      id="phoneNumber"
                      label="Phone number"
                      name="phoneNumber"
                      color="secondary"
                      error={!!errors.phoneNumber}
                      helperText={PhoneErrorMessage()}
                      FormHelperTextProps={{
                        classes: {
                          root: classes.error,
                        },
                      }}
                      InputProps={{
                        endAdornment: errors.phoneNumber ? (
                          <ErrorIcon sx={{ color: '#BC0000' }} />
                        ) : (
                          ''
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            </form>
          )}
        </Box>
        {!verifyModal && (
          <Box>
            <CommonButton
              fullWidth
              size="large"
              sx={{ mb: 3, fontSize: '20px' }}
              type="submit"
              onClick={onSubmit}
              disabled={!isValid || loading}
              background="var(--leafy-green-2)"
              $textColor="var(--neutral-7)"
              height={52}
            >
              {loading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                'Update my details'
              )}
            </CommonButton>
            <CommonButton
              onClick={handleClose}
              fullWidth
              sx={{ fontSize: '20px' }}
              background="var(--orange-zest-2)"
              $textColor="var(--neutral-7)"
              height={52}
            >
              Cancel
            </CommonButton>
          </Box>
        )}
      </List>
    </Dialog>
  );
};

export default EditMyDetail;
