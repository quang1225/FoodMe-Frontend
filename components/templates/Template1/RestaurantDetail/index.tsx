import ContactInfo from '@components/apps/RestaurantDetail/ContactInfo';
import MenuFilter from '@components/apps/RestaurantDetail/MenuFilter';
import Map from '@components/apps/RestaurantDetail/Map';
import { Typography, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import { getRestaurantMenuApi } from '@services/restaurants/restaurantDetailApi';
import { useAppSelector } from '@stateManager/stores/appStore';
import { isEmpty, get } from 'lodash';
import { useState, useEffect } from 'react';
import { LocationInLineIcon } from 'utils/icons';
import { Wrapper } from './styles';

const RestaurantDetail = () => {
  const [listMenu, setListMenu] = useState<any>([]);
  const [isFetchingMenu, setFetchingMenu] = useState<boolean>(true);
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

  const [coordinates, setCoordinates] = useState({
    lat: geolocation?.x || 0,
    lng: geolocation?.y || 0,
  });

  const renderTime = (openingHours: any) => {
    if (openingHours.isClosed) {
      return <Box>Closed</Box>;
    }
    return openingHours.values.map((item: any, index: number) => (
      <Box sx={{ textTransform: 'lowercase' }} key={index}>
        {Object.values(item).join(' - ')}
      </Box>
    ));
  };

  const getRestaurantMenu = async () => {
    const res = await getRestaurantMenuApi(restaurantDetail.id);
    setFetchingMenu(false);
    setListMenu(res);
  };

  useEffect(() => {
    if (!restaurantDetail?.id) return;

    getRestaurantMenu();

    setCoordinates({
      lat: restaurantDetail.geolocation?.x,
      lng: restaurantDetail.geolocation?.y,
    });
  }, [restaurantDetail]);

  return (
    <Wrapper>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MenuFilter
          isFetchingMenu={isFetchingMenu}
          menus={listMenu}
          hideButtons
        />

        <Box borderTop="1px solid #E5E5E5">
          <Container>
            <Grid container>
              <Grid
                item
                md={8}
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
                      sx={{ height: { md: 323, xs: 192 } }}
                    >
                      <Map coordinates={coordinates} />
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid
                item
                md={4}
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
                {isEmpty(openingHours) ||
                !Object.values(openingHours).some(
                  (item: any) => item.values.length || item.isClosed,
                ) ? (
                  <Box>
                    <Typography fontSize={16} mb={6}>
                      Our team is currently working on getting the correct
                      opening times. Watch this space!
                    </Typography>
                  </Box>
                ) : (
                  <>
                    {Object.keys(openingHours).map((item: any, index: number) =>
                      get(
                        Object.values(openingHours)[index],
                        'isClosed',
                        false,
                      ) ||
                      get(
                        Object.values(openingHours)[index],
                        'values.length',
                        false,
                      ) ? (
                        <Box
                          fontSize={14}
                          key={'openingHours_' + index}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box
                            fontWeight={700}
                            style={{ marginBottom: 12, width: '80px' }}
                            textTransform="capitalize"
                          >
                            {item.toString()}
                          </Box>
                          {renderTime(Object.values(openingHours)[index])}
                        </Box>
                      ) : null,
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
        {(!isEmpty(restaurantDetail?.contactSocialMediaLinks) ||
          restaurantDetail?.contactEmail ||
          restaurantDetail?.contactPhone) && <ContactInfo />}
      </Box>
    </Wrapper>
  );
};

export default RestaurantDetail;
