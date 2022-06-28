import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '@stateManager/stores/appStore';
import Link from 'next/link';
import InputSearch from '../Search/InputSearch';
import {
  Headline,
  RestaurantContainer,
  List,
  Spacing,
  SkeletonStyle,
} from './styles';
import CommonButton from '@components/shared/CommonButton';

export interface Props {
  data: any;
  isLoading?: boolean;
  locationSelected: string;
  keyword: string;
}

export const RestaurantsNearMe: FC<Props> = ({ data, isLoading, keyword }) => {
  const user = useAppSelector(state => state.user);
  const suburbs = data?.suburbs || [];

  const createHref = (suburb: string) => {
    const query = {
      ...user.location,
    } as any;
    if (keyword) query.keyword = keyword;
    query.suburb = suburb;
    return { pathname: 'search-results', query };
  };

  return (
    <RestaurantContainer>
      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          mb: '40px',
        }}
      >
        <Headline className="title-font">Restaurants near me</Headline>
        <InputSearch dark fullWidth isRestaurantNearMe />
      </Box>
      <List>
        {isLoading
          ? Array(14)
              .fill('')
              .map((skeleton: string, index: number) => (
                <Spacing key={index}>
                  <SkeletonStyle
                    variant="rectangular"
                    width={150}
                    height={50}
                  />
                </Spacing>
              ))
          : suburbs
              .sort((a: any, b: any) => a.name.localeCompare(b.name))
              .map((suburb: any, index: number) => (
                <Spacing key={index}>
                  <Link href={createHref(suburb.name)} prefetch={false}>
                    <a rel="noreferrer">
                      <CommonButton
                        style={{ padding: '18px 24px' }}
                        height={50}
                        $borderColor="var(--leafy-green-2)"
                      >
                        <Typography
                          fontSize={16}
                          fontWeight={700}
                          color="var(--leafy-green-2)"
                          className="title-font"
                        >
                          {suburb.name} ({suburb.count})
                        </Typography>
                      </CommonButton>
                    </a>
                  </Link>
                </Spacing>
              ))}
      </List>
    </RestaurantContainer>
  );
};

export default RestaurantsNearMe;
