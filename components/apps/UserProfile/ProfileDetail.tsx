import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@stateManager/stores/appStore';
import EditDietaryPreferences from './EditDietaryPreferences';
import EditMyDetail from './EditMyDetail';
import { EditIcon, EmailIcon, PhoneIcon } from 'utils/icons';
import CommonButton from '@components/shared/CommonButton';
import Icon from '@components/shared/Icons';
import { IUserDetail } from '@stateManager/stores/types/user.types';
import { defaultDietary } from './mocks';
export interface DietaryTagProps {
  id: number;
  created: any;
  deprecated: any;
  name: string;
  icon: any;
}

const ProfileDetailContainer = styled(Container)(() => ({
  paddingTop: '49px',
  paddingBottom: '49px',
}));

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '26px',
  color: '#333333',
  '& svg': {
    fontSize: '20px',
  },
}));

const Title = styled(Box)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '28px',
  color: '#333333',
  marginRight: '7px',
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
  },
}));

const BoxDetail = styled(Box)(() => ({
  background: '#FFFFFF',
  boxShadow: '0px 3px 9px rgba(0, 0, 0, 0.17)',
  borderRadius: '4px',
}));

const Welcome = styled(Box)(({ theme }) => ({
  padding: '23px 34px 34px 34px',
  fontWeight: 700,
  fontSize: '38px',
  lineHeight: '50px',
  color: 'var(--leafy-green-2)',
  borderBottom: '1px solid #E0E0E0',
  [theme.breakpoints.down('md')]: {
    padding: '15px',
  },
}));

const Info = styled(Box)(({ theme }) => ({
  padding: '28px 34px 37px 34px',
  [theme.breakpoints.down('md')]: {
    padding: '15px',
  },
}));

const DietaryTag = styled(CommonButton)(({}) => ({
  padding: '7px 14px !important',
  gap: '6px',
  cursor: 'unset',
}));

const ButtonAddDietary = styled(CommonButton)(({}) => ({
  padding: '10px 18px !important',
}));

export const ProfileDetail = () => {
  const user = useAppSelector(appState => appState.user);
  const [openEditDietary, setOpenEditDietary] = useState<boolean>(false);
  const [openEditDetail, setOpenEditDetail] = useState<boolean>(false);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [detail, setDetail] = useState({} as IUserDetail);

  useEffect(() => {
    if (!user.dietary && !user?.detail.id) return;

    setDietaryPreferences(
      detail.eatEverything ? [defaultDietary] : user.dietary,
    );
  }, [user]);

  useEffect(() => {
    if (!user.detail.email) return;

    setDetail(user.detail);
  }, [user.detail]);

  const handleClose = () => {
    setOpenEditDietary(false);
    setOpenEditDetail(false);
  };

  const handleUpdateDietary = () => {};

  return (
    <ProfileDetailContainer>
      <BoxDetail>
        <Welcome className="title-font">Hi, {detail.firstName}</Welcome>
        <Info>
          <Grid container columnSpacing={{ xs: 2 }}>
            <Grid item sm={4} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Title className="title-font">My details</Title>
                <IconButton
                  aria-label="edit"
                  onClick={() => setOpenEditDetail(true)}
                >
                  <EditIcon
                    style={{ fontSize: 16 }}
                    fill="var(--fairy-floss-pink-2)"
                  />
                </IconButton>
              </Box>
              <Box>
                <FlexBox sx={{ mb: '14px' }}>
                  <EmailIcon color="var(--orange-zest-2)" />
                  <Box sx={{ ml: 2 }}>{detail.email}</Box>
                </FlexBox>
                <FlexBox>
                  <PhoneIcon color="var(--orange-zest-2)" />
                  <Box sx={{ ml: 2 }}>{detail.phoneNumber}</Box>
                </FlexBox>
              </Box>
            </Grid>
            <Grid item sm={8} xs={12} sx={{ mt: { xs: 2, sm: 0 } }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Title className="title-font">Dietary preferences</Title>
                {dietaryPreferences?.length || detail.eatEverything ? (
                  <IconButton
                    aria-label="edit"
                    onClick={() => setOpenEditDietary(true)}
                  >
                    <EditIcon
                      style={{ fontSize: 16 }}
                      fill="var(--fairy-floss-pink-2)"
                    />
                  </IconButton>
                ) : null}
              </Box>
              <Box sx={{ margin: '-5px' }}>
                {dietaryPreferences?.length || detail.eatEverything ? (
                  dietaryPreferences?.map((dietary: any) => (
                    <Box
                      key={dietary.id}
                      sx={{
                        display: 'inline-block',
                        margin: '5px',
                        verticalAlign: 'middle',
                      }}
                    >
                      <DietaryTag
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
                      </DietaryTag>
                    </Box>
                  ))
                ) : (
                  <ButtonAddDietary
                    onClick={() => setOpenEditDietary(true)}
                    variant="contained"
                    background="var(--leafy-green-2)"
                    height={46}
                  >
                    <Typography
                      fontSize={14}
                      fontWeight={700}
                      color="var(--neutral-7)"
                    >
                      Add dietary preferences
                    </Typography>
                  </ButtonAddDietary>
                )}
              </Box>
            </Grid>
          </Grid>
        </Info>
      </BoxDetail>
      <EditDietaryPreferences
        open={openEditDietary}
        onClose={handleClose}
        update={() => handleUpdateDietary()}
        myDietary={dietaryPreferences}
      />
      {openEditDetail && (
        <EditMyDetail
          open={openEditDetail}
          onClose={handleClose}
          profileDetail={detail}
          setDetail={(data: any) => setDetail(data)}
        />
      )}
    </ProfileDetailContainer>
  );
};

export default ProfileDetail;
