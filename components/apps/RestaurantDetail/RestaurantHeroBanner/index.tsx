import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { BookmarkRestaurant } from 'utils/icons';
import {
  bookmarkRestaurant,
  deleteBookmarkRestaurant,
  getRestaurantBookmarkStatus,
} from '@services/restaurants/restaurantDetailApi';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import { useDispatch } from 'react-redux';
import { MODAL_TYPE } from 'utils/constant';
import { useAppSelector } from '@stateManager/stores/appStore';
import {
  StyledWrapper,
  StyledContainer,
  Bookmark,
  StyledBox,
  Name,
  StyledTypography,
  Rate,
  Review,
} from './styles';
import get from 'lodash/get';

function priceType(price: number, symbol = '$'): string {
  let result: string = symbol;
  if (price >= 2) {
    result += symbol;
  }
  if (price >= 3) {
    result += symbol;
  }
  if (price >= 4) {
    result += symbol;
  }
  return result;
}

function formatRestaurantInfo(detail: any): string {
  const info: string[] = [];
  if (detail.country) info.push(detail.country);
  if (detail.cuisines && detail.cuisines.length) {
    detail.cuisines.forEach((cuisine: any) => info.push(cuisine.name));
  }
  if (detail.priceRange)
    info.push(priceType(detail.priceRange, detail.currencySymbol));
  const result = info.join(' • ');
  return result;
}

const RestaurantHeroBanner = () => {
  const dispatch = useDispatch();
  const setOpenModal = (value: string) => {
    dispatch(toggleOpenModal(value));
  };
  const [bookmark, setBookmark] = useState(false);
  const isAuthenticated = useAppSelector(
    appState => appState.user.isAuthenticated,
  );
  const restaurantDetail = useAppSelector(
    appState => appState.restaurant.restaurantDetail,
  );

  const bookmarking = () => {
    if (isAuthenticated && bookmark) {
      const res = deleteBookmarkRestaurant(restaurantDetail.id);
      setBookmark(!bookmark);
      return res;
    }
    if (isAuthenticated && !bookmark) {
      const res = bookmarkRestaurant(restaurantDetail.id);
      setBookmark(!bookmark);
      return res;
    }
    setOpenModal(MODAL_TYPE.BOOKMARK);
    return;
  };

  useEffect(() => {
    const getBookmark = async () => {
      const isBookmarked = await getRestaurantBookmarkStatus(
        restaurantDetail.id,
      );
      setBookmark(isBookmarked);
    };
    isAuthenticated && restaurantDetail.id && getBookmark();
  }, [isAuthenticated, restaurantDetail.id]);

  return (
    <StyledWrapper bannerImage={restaurantDetail.bannerImage}>
      <StyledContainer>
        <Bookmark isBookmarked={bookmark || false} onClick={bookmarking}>
          <BookmarkRestaurant />
        </Bookmark>
        <StyledBox>
          <Name className="title-font">
            {restaurantDetail.name || 'IRestaurant name'}
          </Name>
          <StyledTypography>
            {formatRestaurantInfo(restaurantDetail)}
          </StyledTypography>
          <Box>
            <Rate>
              {get(restaurantDetail, 'stats.all.percentLikes', 0).toFixed(2)}%
              Positive
            </Rate>
            <Review>
              ({restaurantDetail?.stats?.all?.totalReviews} reviews)
            </Review>
          </Box>
        </StyledBox>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default RestaurantHeroBanner;
