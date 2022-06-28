import CommonButton from '@components/shared/CommonButton';
import CommonTextField from '@components/shared/CommonTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  CssBaseline,
  FormHelperText,
  Grid,
  Link,
  Typography,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { verifyEmailApi, verifyPhoneNumberApi } from '@services/user/userApi';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  cognitoSignInFacebook,
  cognitoSignInGoogle,
  cognitoSignUp,
  CognitoSignupData,
} from '../../../services/aws/amplify-service';
import {
  escapeHtml,
  phoneFormat,
  phoneRegExp,
  validPhoneNumber,
  validURL,
} from '../../../utils';
import { MODAL_TYPE } from '../../../utils/constant';
import { FacebookIcon, GoogleIcon } from '../../../utils/icons';

const useStyles = makeStyles((theme: any) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#AEE1D3',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '28px',
  },
  submit: {
    height: 52,
    fontSize: '20px',
    margin: theme.spacing(2, 0, 4),
  },
  link: {
    color: 'blue',
  },
  error: {
    fontStyle: 'italic',
  },
  divider: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #E0E0E0',
    lineHeight: '0.1em',
    margin: '10px 0 20px',
    color: '#BDBDBD',
  },
  signInButton: {
    height: 60,
    fontSize: 18,
    width: '100%',
    border: '1px solid var(--neutral-5)',
    color: 'var(--neutral-1)',
    textTransform: 'none',
    fontWeight: 600,
    background: 'var(--neutral-7)',
    '&:hover': {
      background: 'var(--neutral-7)',
      filter: 'none',
    },
    '& svg': {
      position: 'absolute',
      left: '32px',
      top: '50%',
      transform: 'translateY(-50%)',
      [theme?.breakpoints?.down('sm')]: {
        left: '24px'
      },
    },
  },
}));

export default function SignUpForm() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const createSignUpSchema = yup.object({
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
      .string()
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
    formState: { errors },
    control,
    setError,
  } = useForm({
    resolver: yupResolver(createSignUpSchema),
    mode: 'onChange',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });
  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch(toggleOpenModal(MODAL_TYPE.LOGIN));
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      let hasError = false;

      if (data?.email) {
        const res = await verifyEmailApi(data?.email);
        if (!res.success) {
          hasError = true;
          setError('email', {
            type: 'exist',
          });
        }
      }

      if (data?.phoneNumber) {
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
        // Use HTML escaping to prevent SQL injection or Cross-Site-Scripting
        const escapeData: CognitoSignupData = {
          firstName: escapeHtml(data?.firstName || ''),
          lastName: escapeHtml(data?.lastName || ''),
          email: escapeHtml(data?.email.toLowerCase() || ''),
          phoneNumber: escapeHtml(
            data?.phoneNumber
              ? '+' +
                  (data?.phoneNumber)
                    .replace(phoneFormat, '')
                    .replace(/\s+/g, ' ')
              : '',
          ),
        };

        const res = await cognitoSignUp(escapeData);
        if (!res?.success) {
          throw res?.message || 'Sign up failed';
        }

        dispatch(toggleOpenModal(MODAL_TYPE.VERIFY_CODE));
        localStorage.setItem('new_user', 'true');
        localStorage.setItem(
          'phone_number',
          data?.phoneNumber.replace(/\s+/g, ' '),
        );
      }

      setLoading(false);
    } catch (error: any) {
      toast.error(error);
      setLoading(false);
    }
  };

  const PhoneErrorMessage = () => {
    if (errors?.phoneNumber?.type !== 'exist')
      return errors?.phoneNumber?.message;
    return (
      <>
        Mobile number already exists. Use a different mobile number or{' '}
        <Link
          color="error"
          href="#"
          fontWeight="bold"
          onClick={() => {
            openLoginModal();
          }}
        >
          sign in here
        </Link>
      </>
    );
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} mb={2}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    inputProps={{ maxLength: 30 }}
                    id="firstName"
                    label="First name"
                    autoFocus
                    color="secondary"
                    error={errors?.firstName || errors?.firstName?.types}
                    helperText={
                      errors?.firstName?.message ||
                      errors?.firstName?.types?.notPhone
                    }
                    FormHelperTextProps={{
                      classes: {
                        root: classes.error,
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    inputProps={{ maxLength: 30 }}
                    autoComplete="lname"
                    error={errors?.lastName || errors?.lastName?.types}
                    helperText={
                      errors?.lastName?.message ||
                      errors?.lastName?.types?.notPhone
                    }
                    color="secondary"
                    FormHelperTextProps={{
                      classes: {
                        root: classes.error,
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <CommonTextField
                      {...field}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      type="email"
                      label="Email address"
                      name="email"
                      color="secondary"
                      autoComplete="email"
                      error={errors.email}
                      helperText={errors?.email?.message}
                      FormHelperTextProps={{
                        classes: {
                          root: classes.error,
                        },
                      }}
                    />

                    {errors.email && errors.email.type === 'exist' && (
                      <FormHelperText
                        className={classes.error}
                        sx={{
                          color: '#BC0000',
                          marginLeft: '14px',
                        }}
                      >
                        Email already exists. Use a different email address or{' '}
                        <Link
                          sx={{
                            color: '#BC0000',
                            textDecorationColor: '#BC0000',
                          }}
                          onClick={() => {
                            openLoginModal();
                          }}
                        >
                          sign in here.
                        </Link>
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <CommonTextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    name="phoneNumber"
                    label="Mobile number"
                    type="text"
                    inputProps={{ maxLength: 30 }}
                    id="phoneNumber"
                    color="secondary"
                    helperText={PhoneErrorMessage()}
                    error={errors.phoneNumber || errors?.phoneNumber?.type}
                    FormHelperTextProps={{
                      classes: {
                        root: classes.error,
                      },
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <CommonButton
            type="submit"
            fullWidth
            size="large"
            className={classes.submit}
            disabled={loading}
            background="var(--leafy-green-2)"
            $textColor="var(--neutral-7)"
          >
            {loading ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              'Continue'
            )}
          </CommonButton>
          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="center" mb={3}>
              <Typography
                color="secondary"
                fontSize={20}
                className={classes.divider}
                fontWeight={600}
              >
                <span
                  style={{
                    background: 'var(--baby-blue-30)',
                    padding: '0 10px',
                  }}
                >
                  OR
                </span>
              </Typography>
            </Grid>
            <Grid item xs={12} mb={3}>
              <CommonButton
                className={classes.signInButton}
                startIcon={
                  <GoogleIcon style={{ fontSize: 50, left: '22px' }} />
                }
                size="large"
                onClick={() => cognitoSignInGoogle(true)}
              >
                <Typography
                  fontWeight={600}
                  fontSize={{xs: 16, sm: 18}}
                  color="var(--neutral-1)"
                >
                  Sign up with Google
                </Typography>
              </CommonButton>
            </Grid>
            <Grid item xs={12} mb={3}>
              <CommonButton
                className={classes.signInButton}
                startIcon={<FacebookIcon style={{ fontSize: 30 }} />}
                size="large"
                onClick={() => cognitoSignInFacebook(true)}
              >
                <Typography
                  fontWeight={600}
                  fontSize={{xs: 16, sm: 18}}
                  color="var(--neutral-1)"
                >
                  Sign up with Facebook
                </Typography>
              </CommonButton>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ fontSize: '14px' }}
              display="flex"
              justifyContent="center"
            >
              Have an account already?
              <Typography
                color="#148EFF"
                fontSize={14}
                fontWeight="bold"
                ml={1}
                onClick={() => {
                  openLoginModal();
                }}
                style={{ cursor: 'pointer' }}
              >
                Sign in
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
