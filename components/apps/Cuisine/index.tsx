import React from 'react';
import { Box, Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useAppSelector } from '@stateManager/stores/appStore';
import Link from 'next/link';
import { listRestaurant as fakeDate } from './mocks';
import { Headline, Background, Title, Name, Masonry, Column } from './styles';
import { flatten } from 'lodash';

export interface CuisineProps {
  data: any;
  isLoading?: boolean;
  keyword: string;
}

export interface ICuisine {
  count: number;
  id: number;
  name: string;
}

export const Cuisine = ({ data, isLoading, keyword }: CuisineProps) => {
  const user = useAppSelector(appState => appState.user);
  const cuisines = data?.cuisines || {};

  const listCuisine = Object.keys(cuisines)
    .map(cuisine => ({
      title: cuisine,
      list: cuisines[cuisine],
    }))
    .filter(item => item.list.length);

  const createHref = (cuisine: ICuisine) => {
    const query = {
      ...user.location,
    } as any;
    if (keyword) query.keyword = keyword;
    query.cuisines = JSON.stringify([cuisine.id]);
    return { pathname: 'search-results', query };
  };

  const heightMasonry =
    flatten(Object.values(cuisines)).length * 38 +
    listCuisine.length * (50 + 24 + 48);
  const heightSkeleton =
    flatten(fakeDate.map(item => item.list)).length * 38 +
    fakeDate.length * (30 + 48);

  return (
    <Background>
      <Container>
        <Headline className="title-font">Cuisine</Headline>
        <Box>
          <Masonry $height={isLoading ? heightSkeleton : heightMasonry}>
            {isLoading
              ? fakeDate.map((skeleton: any) => (
                  <Column key={skeleton.title} sx={{ mb: '48px' }}>
                    <Skeleton variant="text" width={30} height={50} />
                    <Box>
                      {skeleton.list.map((item: any, index: number) => (
                        <Skeleton
                          key={index}
                          variant="text"
                          height={30}
                          width={125}
                        />
                      ))}
                    </Box>
                  </Column>
                ))
              : listCuisine.map((cuisine: any) => (
                  <Column key={cuisine.title}>
                    <Title>{cuisine.title}</Title>
                    <Box>
                      {cuisine.list.map((cuisine: ICuisine, index: number) => (
                        <Link
                          href={createHref(cuisine)}
                          key={index}
                          prefetch={false}
                        >
                          <a>
                            <Name>
                              {cuisine.name} ({cuisine.count})
                            </Name>
                          </a>
                        </Link>
                      ))}
                    </Box>
                  </Column>
                ))}
          </Masonry>
        </Box>
      </Container>
    </Background>
  );
};

export default Cuisine;
