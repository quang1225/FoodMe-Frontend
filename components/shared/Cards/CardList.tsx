import React, { useState, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import styled from 'styled-components';
import get from 'lodash/get';
import {
  bookmarkRestaurant,
  deleteBookmarkRestaurant,
} from '@services/restaurants/restaurantDetailApi';
import { MODAL_TYPE } from 'utils/constant';
import { useDispatch } from 'react-redux';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import ListDietary from './ListDietary';
import { BookmarkRestaurant } from 'utils/icons';
import { useAppSelector } from '@stateManager/stores/appStore';
import { setListBookingWidgets } from '@stateManager/stores/slices/restaurantSlice';
import { createRestaurantDetailHref, getFullImageUrl } from 'utils';
import Button from '../CommonButton';
import bookingOrderFunc from 'utils/bookingOrder';
import { IRestaurantDetail } from '@services/restaurants/restaurantDetailApi.type';
import { isEmpty } from 'lodash';
export interface ButtonRequestProps {
  buttonName: string;
  buttonIcon: string;
  width?: string;
}

const LIST_COST = ['$', '$$', '$$$', '$$$$'];

const useStyles = makeStyles({
  cardRestaurant: {
    background: '#FFFFFF',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.14)',
    borderRadius: '8px',
    display: 'flex',
    position: 'relative',
    maxHeight: '245px',
  },
  restaurantPicutre: {
    objectFit: 'cover',
  },

  // Info restaurant
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '14px 24px 24px 24px',
    width: '315px',
  },
  location: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '26px',
    color: 'var(--neutral-3)',
  },
  positive: {
    boxSizing: 'border-box',
    borderRadius: '100px',
    fontWeight: 600,
    fontSize: '14px',
    color: 'var(--neutral-3)',
  },
  review: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#828282',
  },

  // Action restaurant
  actions: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
  },
  btnTitle: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#333333',
    lineHeight: '20px',
    textTransform: 'capitalize',
    marginLeft: '10px',
  },
});

const InfoContainer = styled(Box)`
  display: flex;
  width: 100;
  flex: 1;
  justify-content: space-between;
`;

const InfoLeft = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NameRestaurant = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 24px 0px;
  font-weight: 700;
  font-size: 28px;
  line-height: 38px;
  color: var(--neutral-1);
`;

const BookmarkButton = styled(Box)<{ actived: boolean }>`
  position: absolute;
  top: 15px;
  left: 15px;
  background: ${props =>
    props.actived ? 'var(--leafy-green-1)' : 'var(--neutral-7)'};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
  border-radius: 100%;
  width: 38px;
  height: 38px;
  cursor: pointer;
  border: 1px solid
    ${props => (props.actived ? 'transparent' : 'var(--leafy-green-2)')};
`;

const ButtonAction = styled(Button)`
  padding: 5px 18px !important;
  color: var(--neutral-7);
  font-weight: 700;
  font-size: 16px;
  min-width: 170px;
  text-align: center;
  width: max-content;
`;

export const CardList: FC<{ restaurant: IRestaurantDetail }> = ({
  restaurant,
}) => {
  const classes = useStyles();
  const [isBookmarked, setBookmark] = useState<boolean>(
    get(restaurant, 'isBookmarked', false),
  );
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(
    appState => appState.user.isAuthenticated,
  );

  const bookmarking = async (restaurant: IRestaurantDetail) => {
    if (isAuthenticated) {
      await (isBookmarked
        ? deleteBookmarkRestaurant(restaurant.id)
        : bookmarkRestaurant(restaurant.id));
      setBookmark(!isBookmarked);
    } else {
      dispatch(
        toggleOpenModal({
          title: 'Want to bookmark this restaurant?',
          description:
            'Create your own list of restaurants and receive updates when they have specials, update their menus and more.',
        }),
      );
    }
    return;
  };

  const restaurantDetailHref = createRestaurantDetailHref(restaurant.slug);

  return (
    <Box className={classes.cardRestaurant}>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <Link href={restaurantDetailHref} prefetch={false}>
          <a>
            <Image
              className={classes.restaurantPicutre}
              src={
                restaurant.bannerImage
                  ? getFullImageUrl(restaurant.bannerImage)
                  : '/images/shared/default-restaurant.png'
              }
              alt="restaurant-picture"
              width={245}
              height={245}
            />
          </a>
        </Link>
      </Box>

      <InfoContainer>
        <InfoLeft>
          <NameRestaurant className="title-font">
            <Link href={restaurantDetailHref}>{restaurant.name}</Link>
          </NameRestaurant>
          <Box sx={{ display: 'flex', flex: 1 }}>
            <Box className={classes.info}>
              <Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    mb: '12px',
                  }}
                  className={classes.location}
                >
                  {restaurant.city || restaurant.country}
                  {restaurant?.cuisines
                    ? ` • ${get(restaurant, 'cuisines.0.name', '')}`
                    : ''}{' '}
                  {LIST_COST[restaurant.priceRange - 1]
                    ? ` • ${LIST_COST[restaurant.priceRange - 1]}`
                    : ''}{' '}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box className={classes.positive} sx={{ mr: '12px' }}>
                    {parseFloat(
                      get(restaurant, 'stats.all.percentLikes', 0),
                    ).toFixed(2)}
                    % Positive
                  </Box>
                  <Box className={classes.review}>
                    ({get(restaurant, 'stats.all.totalReviews', 0)} reviews)
                  </Box>
                </Box>
              </Box>
              <Link href={restaurantDetailHref} prefetch={false}>
                <a>
                  <ButtonAction background="var(--leafy-green-2)">
                    View menu
                  </ButtonAction>
                </a>
              </Link>
            </Box>
            <ListDietary
              restaurant={restaurant}
              dietaries={get(restaurant, 'dietaries', [])}
            />
          </Box>
        </InfoLeft>
        <Box className={classes.actions}>
          {!isEmpty(restaurant?.bookingWidgets) && (
            <ButtonAction
              onClick={() => {
                dispatch(setListBookingWidgets(restaurant?.bookingWidgets));
                dispatch(toggleOpenModal(MODAL_TYPE.MAKE_BOOKING));
              }}
              sx={{ mb: 2 }}
              background="var(--orange-zest-2)"
              $borderColor="var(--orange-zest-2)"
            >
              Make a booking
            </ButtonAction>
          )}
          {!isEmpty(restaurant?.deliveryProviders) && (
            <ButtonAction
              onClick={() => bookingOrderFunc(restaurant, dispatch)}
              background="var(--orange-zest-2)"
              $borderColor="var(--orange-zest-2)"
            >
              Order online
            </ButtonAction>
          )}
        </Box>
        <BookmarkButton
          onClick={() => bookmarking(restaurant)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          actived={isBookmarked}
        >
          <BookmarkRestaurant
            style={{
              fontSize: '20px',
              color: isBookmarked
                ? 'var(--fairy-floss-pink-3)'
                : 'var(--leafy-green-2)',
            }}
          />
        </BookmarkButton>
      </InfoContainer>
    </Box>
  );
};

export default CardList;
