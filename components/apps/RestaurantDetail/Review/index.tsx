import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { getAppDietaryApi } from '@services/dietary/dietaryApi';
import { IDietary } from '@services/dietary/dietaryApi.types';
import {
  likeRestaurant,
  removeLikeRestaurant,
} from '@services/restaurants/restaurantDetailApi';
import { IRestaurantStats } from '@services/restaurants/restaurantDetailApi.type';
import { useAppSelector } from '@stateManager/stores/appStore';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import { getRestaurantDetail } from '@stateManager/stores/slices/restaurantSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reviewsColourCodes } from 'utils';
import { MODAL_TYPE } from 'utils/constant';
import { ArrowRightIcon, DislikeIcon, LikeIcon } from 'utils/icons';
import { BorderLinearProgress, Wrapper } from './styles';

const Reviews = () => {
  const dispatch = useDispatch();
  const setOpenModal = (value: string) => {
    dispatch(toggleOpenModal(value));
  };
  const { detail } = useAppSelector(appState => appState.user);
  const isAuthenticated = useAppSelector(
    appState => appState.user.isAuthenticated,
  );
  const restaurantDetail = useAppSelector(
    appState => appState.restaurant.restaurantDetail,
  );
  const { restaurantLike } = restaurantDetail;

  const [statistics, setStatistics] = useState({} as IRestaurantStats);
  const [listDietary, setListDietary] = useState<IDietary[]>([]);
  const [likeStatus, setLikeStatus] = useState(-1);

  const fetchData = async () => {
    const dataDietary = await getAppDietaryApi();
    if (dataDietary) {
      setListDietary(dataDietary);
    }
  };

  const onLikeRestaurant = async () => {
    if (likeStatus === 1) {
      await removeLikeRestaurant(restaurantDetail?.id);
    } else {
      await likeRestaurant(restaurantDetail?.id, true);
    }
    dispatch(getRestaurantDetail(restaurantDetail.slug));
  };

  const onDislikeRestaurant = async () => {
    if (likeStatus === 0) {
      await removeLikeRestaurant(restaurantDetail?.id);
    } else {
      await likeRestaurant(restaurantDetail?.id, false);
    }
    dispatch(getRestaurantDetail(restaurantDetail.slug));
  };

  useEffect(() => {
    if (restaurantDetail.stats) {
      setStatistics(restaurantDetail.stats);
    }
  }, [restaurantDetail]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isAuthenticated && detail.id) {
      const userLike = restaurantLike?.find(x => x.userId === detail.id);
      const isLike = !userLike ? -1 : userLike.isLiked ? 1 : 0;
      setLikeStatus(isLike);
    }
  }, [restaurantDetail, isAuthenticated, detail]);

  const openSignUpModal = () => {
    dispatch(
      toggleOpenModal({
        title: 'Want to rate this restaurant?',
        description:
          'To ensure the quality of each restaurant’s data, you will need to create an account to submit your rating.',
      }),
    );
  };

  return (
    <Wrapper>
      <Box className="content_wrap" id="reviews">
        <Container>
          {statistics?.all?.totalReviews ? (
            <Box>
              <Typography
                className="review-text title-font"
                mb={3}
                fontSize={{
                  md: 38,
                  xs: 30,
                }}
              >
                Reviews{' '}
                <span className="number-review">
                  ({statistics?.all?.totalReviews || 0})
                </span>
              </Typography>
              <Grid
                container
                border="1px solid #E0E0E0"
                sx={{ borderRadius: '8px', background: '#fff' }}
                mb={7}
              >
                <Grid
                  item
                  md={2}
                  xs={12}
                  borderRight={{
                    xs: 'none',
                    md: '1px solid #E0E0E0',
                  }}
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="center"
                  sx={{ padding: { xs: '18px 0 26px 0', md: '50px 0' } }}
                >
                  <Typography
                    color={
                      reviewsColourCodes(statistics?.all?.percentLikes || 0) ||
                      'red'
                    }
                    fontSize={38}
                    fontWeight={700}
                    className="title-font"
                  >
                    {(statistics?.all?.percentLikes || 0).toFixed(0)}%
                  </Typography>
                  <Typography color="#8C8C8C" fontSize={16} fontWeight={400}>
                    Positive reviews
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={10}
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: {
                      xs: '15px 12px 22px',
                      md: '8px 28px 15px',
                    },
                  }}
                  borderTop={{
                    xs: '1px solid #E0E0E0',
                    md: 'none',
                  }}
                >
                  <Grid container>
                    {Object.keys(statistics)
                      .filter(i => i !== 'all')
                      .map((key, index: number) => {
                        const data = statistics[key];
                        const dieratyFilter = listDietary.find(
                          dietary => dietary?.id.toString() === key,
                        );

                        if (data?.totalReviews)
                          return (
                            <Grid
                              item
                              fontSize={14}
                              md={4}
                              xs={12}
                              p="12px 14px"
                              key={index}
                            >
                              <Typography
                                fontSize={{ xs: 12, md: 14 }}
                                fontWeight={600}
                                mb={1}
                              >
                                {dieratyFilter?.name || ''}{' '}
                                <span
                                  style={{ color: '#8C8C8C', fontWeight: 400 }}
                                >
                                  ({data?.totalReviews})
                                </span>
                              </Typography>
                              <Box
                                display="flex"
                                alignItems="center"
                                gap="17px"
                              >
                                <Box width="100%">
                                  <BorderLinearProgress
                                    variant="determinate"
                                    value={data?.percentLikes}
                                    $bgColor={
                                      reviewsColourCodes(
                                        data?.percentLikes || 0,
                                      ) || 'red'
                                    }
                                  />
                                </Box>
                                <Typography
                                  fontSize={{ xs: 12, md: 14 }}
                                  className="title-font"
                                  fontWeight={600}
                                >
                                  {data?.percentLikes.toFixed(0) || ''}%
                                </Typography>
                              </Box>
                            </Grid>
                          );
                      })}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ) : null}
          <Grid container mb={{ xs: 0, md: 4 }}>
            <Grid item xs={12} md={5}>
              <Typography className="main-title title-font" mb={2}>
                Have you eaten here?
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography fontSize={16} fontWeight={400} mr={2}>
                  What did you think?
                </Typography>
                <LikeIcon
                  onClick={() => {
                    isAuthenticated ? onLikeRestaurant() : openSignUpModal();
                  }}
                  style={{
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                    color: likeStatus === 1 ? '#00A175' : '#8B8B8B',
                  }}
                />
                <DislikeIcon
                  onClick={() => {
                    isAuthenticated ? onDislikeRestaurant() : openSignUpModal();
                  }}
                  style={{
                    marginLeft: 28,
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                    color: likeStatus === 0 ? '#FF856A' : '#8B8B8B',
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              md={7}
              xs={12}
              display="flex"
              justifyContent={'flex-end'}
              py={1}
              sx={{ gap: '24px' }}
            >
              <div className="big_buttons">
                <Box
                  className="arrowButton"
                  onClick={() => {
                    setOpenModal(MODAL_TYPE.REPORT_ISSUE);
                  }}
                >
                  <Box>
                    <Typography className="title title-font" mb={1}>
                      Something doesn’t seem right?
                    </Typography>
                    <Typography className="title-2">Report an issue</Typography>
                  </Box>
                  <IconButton
                    aria-label="open"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <ArrowRightIcon style={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
                <Box
                  className="arrowButton"
                  onClick={() => {
                    setOpenModal(MODAL_TYPE.CLAIM_PAGE);
                  }}
                >
                  <Box>
                    <Typography className="title title-font" mb={1}>
                      Are you the owner?
                    </Typography>
                    <Typography className="title-2">Claim this page</Typography>
                  </Box>
                  <IconButton
                    aria-label="open"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <ArrowRightIcon style={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Wrapper>
  );
};

export default Reviews;
