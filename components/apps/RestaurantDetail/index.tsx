import { Box, Container, Grid, Typography } from '@mui/material';
import { getRestaurantMenuApi } from '@services/restaurants/restaurantDetailApi';
import { isEmpty, isBoolean, chunk } from 'lodash';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LocationInLineIcon } from 'utils/icons';
import AboutRestaurant from './AboutRestaurant';
import ContactInfo from './ContactInfo';
import Map from './Map';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import Reviews from './Review';
import { setListBookingWidgets } from '@stateManager/stores/slices/restaurantSlice';
import CommonButton from '@components/shared/CommonButton';
import { CustomTabs, Wrapper, StyleTag } from './styles';
import MenuFilter from './MenuFilter';
import { useAppSelector } from '@stateManager/stores/appStore';
import bookingOrderFunc from 'utils/bookingOrder';
import { scrollToId, formatTime } from 'utils';
import { MODAL_TYPE } from 'utils/constant';

const RestaurantDetail = () => {
  const [value, setValue] = useState(0);
  const [listMenu, setListMenu] = useState<any>([]);
  const [isFetchingMenu, setFetchingMenu] = useState<boolean>(true);
  const [opening, setOpeningHours] = useState<Array<any>>([]);
  const handleChange = (event: SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };
  const restaurantDetail = useAppSelector(
    appState => appState.restaurant.restaurantDetail,
  );
  const {
    geolocation,
    street,
    city,
    country,
    state,
    openingHours,
    address,
    postcode,
  } = restaurantDetail;
  const dispatch = useDispatch();

  const [coordinates, setCoordinates] = useState({
    lat: geolocation?.x || 0,
    lng: geolocation?.y || 0,
  });

  const renderTime = (openingHours: any) => {
    if (isBoolean(openingHours)) {
      return <Box>Closed</Box>;
    }
    return chunk(openingHours, 2).map((item: any, index: number) => (
      <Box
        key={index}
        display="grid"
        gap="20px"
        gridTemplateColumns={`repeat(${item.length}, 1fr)`}
        justifyContent="flex-end"
        width="100%"
        ml="auto"
      >
        {item.map((times: any, timeIndex: number) => (
          <Box
            sx={{
              width: 'max-content',
              textTransform: 'lowercase',
              textAlign: 'right',
            }}
            key={timeIndex}
            mb={'12px'}
            ml="auto"
          >
            <span>{formatTime(times.openTime)}</span> -{' '}
            <span>{formatTime(times.closeTime)}</span>
          </Box>
        ))}
      </Box>
    ));
  };

  const getRestaurantMenu = async (id: string) => {
    const res = await getRestaurantMenuApi(id);
    setFetchingMenu(false);
    setListMenu(res);
  };

  useEffect(() => {
    if (!restaurantDetail?.id) return;

    getRestaurantMenu(restaurantDetail.id);

    setCoordinates({
      lat: restaurantDetail.geolocation?.x,
      lng: restaurantDetail.geolocation?.y,
    });
  }, [restaurantDetail]);

  useEffect(() => {
    if (openingHours) {
      const formatOpeningHours = Object.keys(openingHours).map(
        (item, index) => {
          const time = Object.values(openingHours)[index] as {
            isClosed: boolean;
            values: Array<{ openTime: string; closeTime: string }>;
          };
          return {
            name: item,
            times: time.isClosed
              ? time.isClosed
              : time.values.filter(
                  timeItem => timeItem.closeTime && timeItem.openTime,
                ),
          };
        },
      ) as Array<{ name: string; times: any }>;
      setOpeningHours(
        formatOpeningHours.filter(
          (item: any) => isBoolean(item.times) || item.times.length,
        ),
      );
    }
  }, [openingHours]);

  return (
    <Wrapper>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box className="detail_tab">
          <Container sx={{ padding: { xs: 0, md: '0px 24px' } }}>
            <CustomTabs
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#00A175',
                },
              }}
              value={value}
              onChange={handleChange}
            >
              <StyleTag
                disableRipple
                label="Menu"
                onClick={() => scrollToId('menu')}
              />
              {restaurantDetail.description && (
                <StyleTag label="About" onClick={() => scrollToId('gallery')} />
              )}
              <StyleTag
                disableRipple
                label="Location"
                onClick={() => scrollToId('location')}
              />
              {!isEmpty(openingHours) && opening.length && (
                <StyleTag
                  disableRipple
                  label="Opening hours"
                  onClick={() => scrollToId('opening')}
                />
              )}
              {restaurantDetail?.bookingWidgets && (
                <StyleTag
                  disableRipple
                  label="Make a booking"
                  onClick={() => scrollToId('menu')}
                />
              )}
              {(!isEmpty(restaurantDetail?.contactSocialMediaLinks) ||
                restaurantDetail?.website ||
                restaurantDetail?.contactPhone) && (
                <StyleTag
                  disableRipple
                  label="Contact"
                  onClick={() => scrollToId('contacts')}
                />
              )}
              {restaurantDetail?.stats?.all?.totalReviews && (
                <StyleTag
                  disableRipple
                  label="Reviews"
                  onClick={() => scrollToId('reviews')}
                />
              )}
            </CustomTabs>
          </Container>
        </Box>

        <MenuFilter isFetchingMenu={isFetchingMenu} menus={listMenu} />
        {restaurantDetail.description && <AboutRestaurant />}
        <Box borderTop="1px solid #E5E5E5">
          <Container>
            <Grid container>
              <Grid
                item
                lg={8}
                xs={12}
                className="location_content"
                id="location"
              >
                <Typography
                  className="title-font"
                  fontSize={{
                    md: 38,
                    xs: 30,
                  }}
                  fontWeight={700}
                  mb={2}
                >
                  Location
                </Typography>
                {isEmpty(geolocation) ? (
                  <Typography fontSize={16} fontWeight={400}>
                    Looks like we don’t have the exact address for{' '}
                    {restaurantDetail?.name || ''} at the moment. Don’t worry,
                    our team is working very hard to ensure we have all the
                    information you need. Watch this space!
                  </Typography>
                ) : (
                  <Box>
                    <Box
                      display="flex"
                      mb={2}
                      sx={{ gap: '10px', alignItems: 'center' }}
                    >
                      <LocationInLineIcon />
                      <Typography fontSize={16} fontWeight={400}>
                        {address
                          ? address
                          : `${street}, ${city} ${state} ${postcode}, ${country}`}
                      </Typography>
                    </Box>
                    <Box
                      textAlign="center"
                      width="100%"
                      sx={{ height: { sm: 323, xs: 192 } }}
                    >
                      <Map coordinates={coordinates} />
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid
                item
                lg={4}
                xs={12}
                className="opening_content"
                id="opening"
              >
                <Typography
                  fontSize={{
                    md: 38,
                    xs: 30,
                  }}
                  fontWeight={700}
                  sx={{
                    marginBottom: {
                      md: '38px',
                      xs: '32px',
                    },
                  }}
                  className="title-font"
                >
                  Opening hours
                </Typography>
                {isEmpty(openingHours) || !opening.length ? (
                  <Box>
                    <Typography fontSize={16} mb={6}>
                      Our team is currently working on getting the correct
                      opening times. Watch this space!
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {opening.map((item: any, index: number) => (
                      <Box
                        fontSize={14}
                        key={'openingHours_' + index}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '10px',
                        }}
                      >
                        <Box
                          fontWeight={700}
                          style={{ marginBottom: 12, width: '80px' }}
                          textTransform="capitalize"
                        >
                          {item.name}
                        </Box>
                        <Box sx={{ width: '100%', textAlign: 'right' }}>
                          {renderTime(item.times)}
                        </Box>
                      </Box>
                    ))}
                  </>
                )}

                <div className="booking_buttons">
                  {!isEmpty(restaurantDetail?.bookingWidgets) && (
                    <CommonButton
                      background="#FD9979"
                      $textColor="white"
                      onClick={() => {
                        dispatch(
                          setListBookingWidgets(
                            restaurantDetail?.bookingWidgets,
                          ),
                        );
                        dispatch(toggleOpenModal(MODAL_TYPE.MAKE_BOOKING));
                      }}
                    >
                      Make a booking
                    </CommonButton>
                  )}
                  {!isEmpty(restaurantDetail?.deliveryProviders) && (
                    <CommonButton
                      background="#FD9979"
                      $textColor="white"
                      onClick={() =>
                        bookingOrderFunc(restaurantDetail, dispatch)
                      }
                    >
                      Order online
                    </CommonButton>
                  )}
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {(!isEmpty(restaurantDetail?.contactSocialMediaLinks) ||
          restaurantDetail?.contactEmail ||
          restaurantDetail?.contactPhone) && <ContactInfo />}
        <Reviews />
      </Box>
    </Wrapper>
  );
};

export default RestaurantDetail;
