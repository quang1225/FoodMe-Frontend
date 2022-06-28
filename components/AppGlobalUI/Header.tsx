import BookmarkModal from '@components/apps/BookmarkModal';
import { Box, Button, Menu, MenuItem, Grid, useMediaQuery } from '@mui/material';
import {
  setGoogleMaps,
  toggleOpenModal,
} from '@stateManager/stores/slices/commonSlice';
import {
  setGeoLocation,
  setLocation,
  setMyDietary,
  setUserDetail,
  setUserFetching,
} from '@stateManager/stores/slices/userSlice';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SMALL_MOBILE_BREAKPOINT, MODAL_TYPE, TABLET_BREAKPOINT } from '../../utils/constant';
import LoginDialog from '../apps/Login/LoginDialog';
import SignUpDialog from '../apps/SignUp/SignUpDialog';
import EditDietaryPreferences from '../apps/UserProfile/EditDietaryPreferences';
import VertifyCodeDialog from '../apps/VerifyCode/VertifyCodeDialog';
import { UserProfileDropDown } from './UserProfileDropDown';
import PopupSignUp from '@components/shared/PopupSignUp';
import MakeABookingDialog from '@components/apps/RestaurantDetail/modal/MakeABooking';
import OrderOnlineDialog from '@components/apps/RestaurantDetail/modal/OrderOnline';
import ClaimPageModal from '@components/apps/ClaimPageModal';
import InputSearch from '@components/apps/Search/InputSearch';
import { useAppSelector } from '@stateManager/stores/appStore';
import Link from 'next/link';
import { Loader } from '@googlemaps/js-api-loader';
import {
  getMyDietaryApi,
  getUserDetailApi,
  updateUserDetailApi,
} from '@services/user/userApi';
import { toast } from 'react-toastify';
import { IUserDetail } from '@stateManager/stores/types/user.types';
import { cognitoLogout } from '@services/aws/amplify-service';
import { AppLogo, SearchIcon, CloseCircleIcon } from 'utils/icons';
import styled from 'styled-components';

import {
  HeaderContainer,
  Logo,
  AccountContainer,
  AccountItem,
  Avatar,
  SearchContainer,
  SearchBox,
  SearchInput,
} from './styles';
import { IDietary } from '@services/dietary/dietaryApi.types';

const MenuItemStyle = styled(MenuItem)`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 14;
  width: 120px;
`;

const loader = new Loader({
  apiKey: process.env.GOOGLE_MAP_API_KEY + '',
  version: 'weekly',
  libraries: ['places'],
});

const DEFAULT_LOCATION = {
  lat: -33.865143,
  lng: 151.2099,
};

interface SearchProps {
  isMobile?: boolean;
  openSearch: boolean; 
  setOpenSearch: (type: boolean) => void;
}

const Search = ({isMobile, openSearch, setOpenSearch}: SearchProps) => {
  const user = useAppSelector(state => state.user);
  const [search, setSearch] = useState<string>('');
  const isAuthenticated = useAppSelector(
    appState => appState.user.isAuthenticated,
  );
  const router = useRouter();

  const handleCloseSearch = () => {
    setOpenSearch(false);
    setSearch('');
  };

  const handleSearch = () => {
    const query: any = {
      ...router.query,
      ...get(user, 'location', {}),
    };
    if (search) query.keyword = search;
    if (isAuthenticated && user.dietary.length && router.pathname !== '/search-results')
      query.dietaries = JSON.stringify(
        get(user, 'dietary', []).map((dietary: IDietary) => dietary.id),
      );
    setSearch('');
    delete query.slug;
    router.push({ pathname: '/search-results', query });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <SearchContainer>
        {
          !isMobile && <Box sx={{ width: openSearch ? '400px' : '100%', marginRight: '20px' }}>
            <InputSearch fullWidth />
          </Box>
        }
        <SearchBox>
          {openSearch ? (
            <SearchInput $isMobile={Boolean(isMobile)}>
              <SearchIcon
                style={{ height: '20px', color: 'var(--fairy-floss-pink-2)' }}
              />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`${isMobile ? 'Search' : 'Search for a restaurant, cuisine or dish'}`}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <CloseCircleIcon
                style={{
                  height: '22px',
                  cursor: 'pointer',
                  color: 'var(--fairy-floss-pink-2)',
                }}
                onClick={() => handleCloseSearch()}
              />
            </SearchInput>
          ) : (
            <SearchIcon
              style={{
                width: '20px',
                cursor: 'pointer',
                color: 'var(--fairy-floss-pink-3)',
              }}
              onClick={() => setOpenSearch(true)}
            />
          )}
        </SearchBox>
      </SearchContainer>
    </Box>
  );
};

const Header = () => {
  const [typeUser, setTypeUser] = useState<string>('');
  const { openModal, googleMaps } = useAppSelector(appState => appState.common);
  const deliveryProviders = useAppSelector(
    appState => appState.restaurant.listDeliveryProviders,
  );
  const { isAuthenticated, location, detail, geoLocation, dietary } =
    useAppSelector(appState => appState.user);
  const router = useRouter();
  const { t } = useTranslation(['login', 'signup']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const isTablet = useMediaQuery(`(max-width: ${TABLET_BREAKPOINT}px)`);
  const isMobile = useMediaQuery(`(max-width: ${SMALL_MOBILE_BREAKPOINT}px)`);

  const signOutHandler = async () => {
    cognitoLogout();
    if (router.pathname === '/my-profile') {
      router.push('/');
    }
  };

  const loadGoogleMaps = async () => {
    const google = await loader.load();
    dispatch(setGoogleMaps(google));
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          dispatch(
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          );
        },
        function () {
          dispatch(setLocation(DEFAULT_LOCATION));
        },
      );
    }
  };

  useEffect(() => {
    loadGoogleMaps();
    getPosition();
  }, []);

  useEffect(() => {
    if (!location || !googleMaps) return;
    decodeLatLong();
  }, [location, googleMaps, geoLocation]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnOpenLoginForm = () => {
    dispatch(toggleOpenModal(MODAL_TYPE.LOGIN));
  };

  const getUserDetail = async () => {
    const res = await getUserDetailApi();

    if (!res?.email) return toast.error(`Get user fail`);

    const data = {
      id: res.id,
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      phoneNumber: res.phoneNumber,
      eatEverything: res.eatEverything,
    } as IUserDetail;
    dispatch(setUserDetail(data));
  };

  const getDietary = async () => {
    dispatch(setUserFetching(true));
    const res = await getMyDietaryApi();
    if (!res) return toast.error(`Get dietary fail`);

    dispatch(setMyDietary(res));
  };

  const closeModal = () => {
    dispatch(toggleOpenModal(''));
  };

  useEffect(() => {
    const getPosition = (position: any) => {
      if (position.coords) {
        dispatch(
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        );
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          getPosition(position);
        },
        function () {
          dispatch(setLocation(DEFAULT_LOCATION));
        },
      );
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getUserDetail();
      getDietary();
      if (localStorage.getItem('new_user')) {
        dispatch(toggleOpenModal(MODAL_TYPE.ADD_DIETARY));
        localStorage.getItem('phone_number') &&
          updateUserDetailApi({
            phoneNumber: localStorage.getItem('phone_number'),
          });

        setTypeUser('new');
        localStorage.removeItem('new_user');
        localStorage.removeItem('phone_number');
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    closeModal();
    const iframe = get(
      document.querySelectorAll('[aria-labelledby="find-a-table-title"]'),
      '0',
      false,
    );
    const body = document.getElementsByTagName('body')[0];
    if (iframe) {
      iframe.remove();
      body.style.position = 'unset';
      body.style.width = 'unset';
    }
  }, [router]);

  const decodeLatLong = async () => {
    if (!location?.lat || !location?.lng) return;

    let { lat } = location;
    let { lng } = location;

    if (router.pathname === '/search-results') {
      lat = router.query.lat ? Number(router.query.lat) : location.lat;
      lng = router.query.lng ? Number(router.query.lng) : location.lng;
    }

    const google = await loader.load();
    if (!google?.maps?.Geocoder) return;

    const geocoder = new google.maps.Geocoder();

    const res = await geocoder.geocode({
      location: {
        lat,
        lng,
      },
    });

    if (res?.results?.[0]) {
      const listLocation = res.results.filter(
        (item: any) =>
          item.types.includes('administrative_area_level_2') ||
          item.types.includes('administrative_area_level_1'),
      );
      dispatch(setGeoLocation(listLocation[0].formatted_address));
    }
  };

  return (
    <React.Fragment>
      <HeaderContainer>
        {
          (!openSearch || !isMobile) && (
            <Logo>
              <Link href={`/`} prefetch={false}>
                <a>
                  <AppLogo style={{ width: '118px', height: '28px' }} />
                </a>
              </Link>
            </Logo>
          )
        }
        {
          isTablet ? (
            <Box width="100%" display="flex" justifyContent="flex-end">
              <Box width="100%" display="flex" gap="18px">
                <Search isMobile setOpenSearch={setOpenSearch} openSearch={openSearch} />
                <Button
                  onClick={handleClick}
                  sx={{ padding: 0, margin: 0, minWidth: '24px' }}
                >
                  <Image
                    src="/images/icons/list.svg"
                    alt="list"
                    width={24}
                    height={18}
                  />
                </Button>
              </Box>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <Grid>
                  {isAuthenticated ? (
                    <UserProfileDropDown
                      handleClose={handleClose}
                      setTypeUser={setTypeUser}
                      handleLogout={signOutHandler}
                    />
                  ) : (
                    <>
                      <MenuItemStyle
                        onClick={() => {
                          handleOnOpenLoginForm();
                          handleClose();
                        }}
                      >
                        Login
                      </MenuItemStyle>
                      <MenuItemStyle
                        onClick={() => {
                          dispatch(toggleOpenModal(MODAL_TYPE.SIGNUP));
                          handleClose();
                        }}
                      >
                        Sign up
                      </MenuItemStyle>
                    </>
                  )}
                </Grid>
              </Menu>
            </Box>
          ) : (
            <>
              <Search setOpenSearch={setOpenSearch} openSearch={openSearch} />
              <AccountContainer>
                {/* <AccountItem>For restaurants</AccountItem> */}
                {!isAuthenticated ? (
                  <>
                    <AccountItem onClick={handleOnOpenLoginForm}>
                      {t('login')}
                    </AccountItem>
                    <AccountItem
                      onClick={() => {
                        dispatch(toggleOpenModal(MODAL_TYPE.SIGNUP));
                      }}
                    >
                      Sign up
                    </AccountItem>
                  </>
                ) : (
                  <>
                    <AccountItem
                      onClick={() => {
                        signOutHandler();
                      }}
                    >
                      Log out
                    </AccountItem>
                    <AccountItem>
                      <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <Avatar>
                          {detail.firstName?.[0]}
                          {detail.lastName?.[0]}
                        </Avatar>
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <Grid>
                          <UserProfileDropDown
                            handleClose={handleClose}
                            setTypeUser={setTypeUser}
                            handleLogout={signOutHandler}
                          />
                        </Grid>
                      </Menu>
                    </AccountItem>
                  </>
                )}
              </AccountContainer>
            </>
          )
        }
      </HeaderContainer>
      <LoginDialog
        isOpen={openModal === MODAL_TYPE.LOGIN}
        handleClose={closeModal}
      />
      <VertifyCodeDialog
        isOpen={openModal === MODAL_TYPE.VERIFY_CODE}
        handleClose={closeModal}
      />
      <SignUpDialog
        isOpen={openModal === MODAL_TYPE.SIGNUP}
        setTypeUser={setTypeUser}
        handleClose={closeModal}
      />
      {isAuthenticated && (
        <EditDietaryPreferences
          open={openModal === MODAL_TYPE.ADD_DIETARY || typeUser === 'new'}
          onClose={() => {
            closeModal();
            setTypeUser('');
          }}
          myDietary={dietary}
          isCreate={typeUser === 'new'}
        />
      )}
      <BookmarkModal
        isOpen={openModal === MODAL_TYPE.BOOKMARK}
        handleClose={closeModal}
      />
      <MakeABookingDialog
        isOpen={openModal === MODAL_TYPE.MAKE_BOOKING}
        handleClose={closeModal}
      />
      <OrderOnlineDialog
        deliveryProviders={deliveryProviders}
        isOpen={openModal === MODAL_TYPE.ORDER_ONLINE}
        handleClose={closeModal}
      />
      <ClaimPageModal
        isOpen={openModal === MODAL_TYPE.CLAIM_PAGE}
        handleClose={closeModal}
      />
      <PopupSignUp isOpen={typeof openModal === 'object'} />
    </React.Fragment>
  );
};

export default Header;
