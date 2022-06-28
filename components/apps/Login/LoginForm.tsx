import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  cognitoSignInGoogle,
  cognitoSignInFacebook,
} from '@services/aws/amplify-service';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import {
  clearUser,
  setUserDetail,
} from '@stateManager/stores/slices/userSlice';
import { IUserDetail } from '@stateManager/stores/types/user.types';
import { checkEmailApi } from '@services/user/userApi';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { MODAL_TYPE } from '../../../utils/constant';
import { FacebookIcon, GoogleIcon } from '../../../utils/icons';
import CommonButton from '@components/shared/CommonButton';
import CommonTextField from '@components/shared/CommonTextField';

const useStyles = makeStyles((theme: any) => ({
  root: {},

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: '#AEE1D3',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    height: 52,
    fontSize: '20px',
    marginTop: '36px',
  },
  error: {
    fontStyle: 'italic',
  },
  divider: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #E0E0E0',
    lineHeight: '0.1em',
    margin: '42px 0px 41px 0px',
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

interface Props {
  handleClaim?: (data: { email: string }) => void;
}

function LoginForm({ handleClaim }: Props) {
  const dispatch = useDispatch();

  const createSignUpSchema = yup.object({
    email: yup
      .string()
      .email('Please enter a vaild email address')
      .required('Please enter your email'),
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
  });

  const classes = useStyles();

  const onSubmit = async (form: any) => {
    if (handleClaim) {
      return handleClaim(form);
    }
    dispatch(clearUser());

    const { success, message } = await checkEmailApi(form?.email);
    if (!success) {
      setError('email', { message: message });
    } else {
      dispatch(
        setUserDetail({
          email: form?.email,
        } as IUserDetail),
      );
      dispatch(toggleOpenModal(MODAL_TYPE.VERIFY_CODE));
    }
  };

  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item className={classes.paper} xs={12}>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
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
                autoComplete="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                FormHelperTextProps={{
                  classes: {
                    root: classes.error,
                  },
                }}
              />
            )}
          />
          <CommonButton
            type="submit"
            fullWidth
            size="large"
            className={classes.submit}
            background="var(--leafy-green-2)"
            $textColor="var(--neutral-7)"
            disabled={errors.email}
          >
            Continue
          </CommonButton>
          <Grid container>
            {!handleClaim && (
              <>
                <Grid item xs={12} display="flex" justifyContent="center">
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
                    size="large"
                    startIcon={
                      <GoogleIcon style={{ fontSize: 50, left: '22px' }} />
                    }
                    onClick={() => cognitoSignInGoogle()}
                  >
                    <Typography
                      fontWeight={600}
                      fontSize={{xs: 16, sm: 18}}
                      color="var(--neutral-1)"
                    >
                      Log in with Google
                    </Typography>
                  </CommonButton>
                </Grid>
                <Grid item xs={12} mb={3}>
                  <CommonButton
                    className={classes.signInButton}
                    startIcon={<FacebookIcon style={{ fontSize: 30 }} />}
                    size="large"
                    onClick={() => cognitoSignInFacebook()}
                  >
                    <Typography
                      fontWeight={600}
                      fontSize={{xs: 16, sm: 18}}
                      color="var(--neutral-1)"
                    >
                      Log in with Facebook
                    </Typography>
                  </CommonButton>
                </Grid>
              </>
            )}
            <Grid
              item
              xs={12}
              sx={{ fontSize: '14px' }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={3}
            >
              Don't have an account?
              <Typography
                color="#148EFF"
                fontWeight="bold"
                fontSize={14}
                ml={1}
                onClick={() => {
                  dispatch(toggleOpenModal(MODAL_TYPE.SIGNUP));
                }}
                style={{ cursor: 'pointer' }}
              >
                Create account
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
