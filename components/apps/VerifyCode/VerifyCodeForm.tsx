import {
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { setIsAuthenticated } from '@stateManager/stores/slices/userSlice';
import { useAppSelector } from '@stateManager/stores/appStore';
import React, { useEffect, useState } from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { cognitoSignIn, cognitoVerifyOTP } from '@services/aws/amplify-service';
import {
  verifyUpdateEmailApi,
  verifyUpdateEmailOtp,
} from '@services/user/userApi';

const useStyles = makeStyles((theme: any) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  error: {
    fontStyle: 'italic',
  },
  codeGroupWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  errorMessage: {
    fontZize: 12,
    textAlign: 'center',
    color: theme.palette.error,
  },
  customStyle: {
    '& .ReactInputVerificationCode__container': {
      width: 'unset',
      gap: '29px',
    },
    '& .ReactInputVerificationCode__item': {
      background: '#fff',
      width: '56px',
      height: '56px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));

interface Props {
  handleClose?: () => void;
  updateEmail?: string;
}

export default function VerifyCodeForm({
  handleClose,
  updateEmail = '',
}: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [cognitoUser, setCognitoUser] = useState();
  const [loading, setLoading] = useState(false);
  const [isTimerRun, setIsTimerRun] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const userDetail = useAppSelector(appState => appState.user.detail);

  const verifyCode = async () => {
    const code = otp;
    let result = {} as any;
    setOtp('');

    setLoading(true);
    if (updateEmail) {
      result = await verifyUpdateEmailOtp(code);
    } else {
      result = await cognitoVerifyOTP(cognitoUser, code);
    }
    setLoading(false);
    if (!result?.success) {
      return toast.error('Verfy code fail');
    }

    dispatch(setIsAuthenticated(true));
    handleClose?.();
  };

  const sendCognitoOtp = async () => {
    const resUser = await cognitoSignIn(userDetail.email);
    if (!resUser) {
      toast.error('Invalid user');
    }

    setCognitoUser(resUser);
  };

  const resendOtp = async () => {
    setLoading(true);
    const res = await verifyUpdateEmailApi(updateEmail);
    setLoading(false);
    if (!res.success) {
      toast.error('Invalid user');
    }
  };

  useEffect(() => {
    if (isTimerRun) {
      const myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            setIsTimerRun(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }
  });

  useEffect(() => {
    if (updateEmail) return setLoading(false);
    if (userDetail.email) sendCognitoOtp();
  }, [userDetail]);

  useEffect(() => {
    if (otp.length === 4) {
      verifyCode();
    }
  }, [otp]);

  const handleOnResend = async () => {
    if (!isTimerRun) {
      updateEmail ? resendOtp() : sendCognitoOtp();
      setIsTimerRun(true);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography fontSize={14} variant="body1" mb={'44px'}>
          To verify your account enter the 4 digit code we just sent to your
          <br />
          email <strong>{updateEmail || userDetail?.email}</strong>
        </Typography>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} className={classes.codeGroupWrapper}>
            {loading ? (
              <CircularProgress />
            ) : (
              <div className={classes.customStyle}>
                <ReactInputVerificationCode
                  value={otp}
                  onChange={setOtp}
                  placeholder={''}
                  length={4}
                  autoFocus
                />
              </div>
            )}
          </Grid>
        </Grid>

        <Grid container>
          {isTimerRun && !loading && (
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              mb={2}
              mt={2}
            >
              <Typography fontWeight={500} align="center" color="textSecondary">
                {' '}
                Next resend OTP at{' '}
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                  {' '}
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>{' '}
              </Typography>
            </Grid>
          )}

          <Grid
            item
            xs={12}
            sx={{ fontSize: 14 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            mb={2}
          >
            Didn’t receive it?
            <Typography
              color="#148EFF"
              fontSize={14}
              ml={1}
              onClick={() => {
                !(isTimerRun || !loading) && handleOnResend();
              }}
              style={{ cursor: 'pointer' }}
            >
              Resend code
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
