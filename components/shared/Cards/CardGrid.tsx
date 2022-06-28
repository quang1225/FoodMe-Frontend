import React, { useState } from 'react';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import get from 'lodash/get';
import {
  bookmarkRestaurant,
  deleteBookmarkRestaurant,
} from '@services/restaurants/restaurantDetailApi';
import { useDispatch } from 'react-redux';
import { MODAL_TYPE } from 'utils/constant';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import Link from 'next/link';
import ListDietary from './ListDietary';
import { BookmarkRestaurant } from 'utils/icons';
import { setListBookingWidgets } from '@stateManager/stores/slices/restaurantSlice';
import { useAppSelector } from '@stateManager/stores/appStore';
import { createRestaurantDetailHref, getFullImageUrl } from 'utils';
import Button from '../CommonButton';
import bookingOrderFunc from 'utils/bookingOrder';
import { IRestaurantDetail } from '@services/restaurants/restaurantDetailApi.type';
import { isEmpty } from 'lodash';
export interface ButtonRequest {
  buttonName: string;
  buttonIcon: string;
}

const LIST_COST = ['$', '$$', '$$$', '$$$$'];

const useStyles = makeStyles({
  cardRestaurant: {
    background: '#FFFFFF',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.14)',
    borderRadius: '8px',
    display: 'grid',
    position: 'relative',
  },
  restaurantPicutre: {
    objectFit: 'cover',
    maxHeight: '233px',
  },

  imageFit: {
    '& span': {
      width: '100% !important',
    },
  },

  // Info restaurant
  info: {
    padding: '20px 26px 26px 26px',
    borderBottom: '1px solid #E0E0E0',
  },
  name: {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '38px',
    color: 'var(--neutral-1)',
    fontFamily: 'PP Agrandir',
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
  },
  btn: {
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #BDBDBD',
    boxSizing: 'border-box',
    borderRadius: '4px',
    padding: '8px 0',
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginBottom: '16px',
    },
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
  padding: 7px 18px !important;
  color: var(--neutral-7);
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  width: 100%;
`;

interface Props {
  restaurant: IRestaurantDetail;
  isMyBookmark?: boolean;
}

export const CardGrid = ({ restaurant, isMyBookmark = false }: Props) => {
  const classes = useStyles();
  const [isBookmarked, setBookmark] = useState<boolean>(
    isMyBookmark || get(restaurant, 'isBookmarked', false),
  );
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(
    appState => appState.user.isAuthenticated,
  );

  const restaurantDetailHref = createRestaurantDetailHref(restaurant.slug);

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

  return (
    <Box className={classes.cardRestaurant}>
      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <Link href={restaurantDetailHref} prefetch={false}>
          <a className={classes.imageFit} style={{ maxHeight: 233 }}>
            <Image
              className={classes.restaurantPicutre}
              src={
                restaurant.bannerImage
                  ? getFullImageUrl(restaurant.bannerImage)
                  : '/images/shared/default-restaurant.png'
              }
              alt="restaurant-picture"
              width="100%"
              height={233}
            />
          </a>
        </Link>
      </Box>
      <Box className={classes.info}>
        <Typography className={classes.name} variant="body1" component="div">
          <Link href={restaurantDetailHref}>{restaurant.name}</Link>
        </Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', m: '10px 0' }}
          className={classes.location}
        >
          {restaurant.city}
          {restaurant.country ? ` • ${restaurant.country}` : ''}{' '}
          {LIST_COST[restaurant.priceRange - 1]
            ? ` • ${LIST_COST[restaurant.priceRange - 1]}`
            : ''}{' '}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box className={classes.positive} sx={{ mr: '12px' }}>
            {parseFloat(get(restaurant, 'stats.all.percentLikes', 0)).toFixed(
              2,
            )}
            % Positive
          </Box>
          <Box className={classes.review}>
            ({get(restaurant, 'stats.all.totalReviews', 0)} reviews)
          </Box>
        </Box>
      </Box>
      <Box className={classes.actions}>
        <Link href={restaurantDetailHref} prefetch={false}>
          <a>
            <ButtonAction background="var(--leafy-green-2)" sx={{ mb: '10px' }}>
              View menu
            </ButtonAction>
          </a>
        </Link>

        {!isEmpty(restaurant?.bookingWidgets) && (
          <ButtonAction
            background="var(--orange-zest-2)"
            $borderColor="var(--orange-zest-2)"
            onClick={() => {
              dispatch(setListBookingWidgets(restaurant?.bookingWidgets));
              dispatch(toggleOpenModal(MODAL_TYPE.MAKE_BOOKING));
            }}
            sx={{ mb: '10px' }}
          >
            Make a booking
          </ButtonAction>
        )}
        {!isEmpty(restaurant?.deliveryProviders) && (
          <ButtonAction
            background="var(--orange-zest-2)"
            $borderColor="var(--orange-zest-2)"
            onClick={() => bookingOrderFunc(restaurant, dispatch)}
          >
            Order online
          </ButtonAction>
        )}
      </Box>
      <ListDietary
        restaurant={restaurant}
        dietaries={get(restaurant, 'dietaries', [])}
        isGridView
      />
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
    </Box>
  );
};

export default CardGrid;
