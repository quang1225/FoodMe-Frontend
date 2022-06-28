import React, { FC } from 'react';
import { Box, Container, styled } from '@mui/material';
import { CloseCircleIcon, CloseIcon } from 'utils/icons';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { Cuisines, iType } from '@services/restaurants/restaurantApi.types';
import { IDietary } from '@services/dietary/dietaryApi.types';
import { useAppSelector } from '@stateManager/stores/appStore';

const LIST_COST = ['$', '$$', '$$$', '$$$$'];

export interface Props {
  listCuisines: Array<Cuisines>;
  listType: Array<iType>;
}

const FilterDisplayContainer = styled(Box)(({ theme }) => ({
  borderBottom: '1px solid #E5E5E5',
  padding: '12px 0 12px 0',
  [theme.breakpoints.up('xs')]: {},
}));

const TagDietary = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  fontSize: '14px',
  fontWeight: 600,
  color: 'var(--leafy-green-1)',
  background: 'var(--leafy-green-4)',
  padding: '9px 21px',
  borderRadius: '100px',
  cursor: 'pointer',
  marginRight: '16px',
  minWidth: 'max-content',
  marginBottom: '4px',
  fontFamily: 'PP Agrandir',
  [theme.breakpoints.up('xs')]: {
    margin: '0 7px',
  },
}));

const ClearFilterBtn = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontWeight: 600,
  fontSize: '14px',
  color: 'var(--leafy-green-1)',
  cursor: 'pointer',
  minWidth: 'max-content',
  paddingLeft: '16px',
}));

const ListTagContainer = styled(Box)(({}) => ({
  '&::-webkit-scrollbar': {
    height: '5px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#fff',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#C4C4C4',
    borderRadius: '100px',
  },
}));

export const FilterDisplay: FC<Props> = ({ listType, listCuisines }) => {
  const router = useRouter();
  const dietaryState = useAppSelector(appState => appState.dietary);

  const getCuisineName = (id: number) => {
    return listCuisines.find((item: Cuisines) => item.id == id)?.name;
  };

  const getDietaryName = (id: number) => {
    return get(dietaryState, 'list', []).find(
      (item: IDietary) => item.id === id,
    )?.name;
  };

  const getTypeName = (id: number) => {
    return listType.find((type: iType) => type.id === id)?.name;
  };

  const handleClearFilter = () => {
    router.query.costs = [];
    router.query.types = [];
    router.query.cuisines = [];
    router.query.dietaries = [];
    router.query.sortOrder = [];
    router.query.sortField = [];
    router.push(router);
  };

  const clearByTag = (type: string, value: any) => {
    const query = JSON.parse(get(router, `query.${type}`, '')).filter(
      (item: any) => item !== value,
    );
    router.query[type] = query.length ? JSON.stringify(query) : [];
    router.push(router);
  };

  const clearSuburb = () => {
    router.query['suburb'] = [];
    router.push(router);
  };

  return (
    <FilterDisplayContainer>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: { xs: '0 -15px', sm: '0' },
          }}
        >
          <ListTagContainer
            sx={{
              display: 'flex',
              overflow: 'auto',
              padding: { xs: '0 5px', sm: '0' },
            }}
          >
            {listCuisines.length
              ? JSON.parse(get(router, 'query.cuisines', '[]')).map(
                  (cuisine: number) => (
                    <TagDietary className="" key={cuisine}>
                      <span>{getCuisineName(cuisine)}</span>
                      <CloseIcon
                        onClick={() => clearByTag('cuisines', cuisine)}
                        sx={{
                          width: 12,
                          height: 12,
                          color: 'var(--leafy-green-1)',
                        }}
                      />
                    </TagDietary>
                  ),
                )
              : null}
            {JSON.parse(get(router, 'query.dietaries', '[]')).map(
              (dietray: number) => (
                <TagDietary key={dietray}>
                  <span>{getDietaryName(dietray)}</span>
                  <CloseIcon
                    onClick={() => clearByTag('dietaries', dietray)}
                    sx={{
                      width: 12,
                      height: 12,
                      color: 'var(--leafy-green-1)',
                    }}
                  />
                </TagDietary>
              ),
            )}
            {JSON.parse(get(router, 'query.types', '[]')).map(
              (type: number) => (
                <TagDietary key={type}>
                  <span>{getTypeName(type)}</span>
                  <CloseIcon
                    onClick={() => clearByTag('types', type)}
                    sx={{
                      width: 12,
                      height: 12,
                      color: 'var(--leafy-green-1)',
                    }}
                  />
                </TagDietary>
              ),
            )}
            {JSON.parse(get(router, 'query.costs', '[]')).map(
              (cost: number) => (
                <TagDietary key={cost}>
                  <span>{LIST_COST[cost - 1]}</span>
                  <CloseIcon
                    onClick={() => clearByTag('costs', cost)}
                    sx={{
                      width: 12,
                      height: 12,
                      color: 'var(--leafy-green-1)',
                    }}
                  />
                </TagDietary>
              ),
            )}
            {get(router, 'query.suburb', '') && (
              <TagDietary>
                <span>{get(router, 'query.suburb', '')}</span>
                <CloseIcon
                  onClick={() => clearSuburb()}
                  sx={{ width: 12, height: 12, color: 'var(--leafy-green-1)' }}
                />
              </TagDietary>
            )}
            <Box
              sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}
            >
              <ClearFilterBtn mr={1} onClick={handleClearFilter}>
                <span>Clear filters</span>
                <CloseCircleIcon
                  sx={{ width: 18, height: 18, color: 'var(--leafy-green-1)' }}
                />
              </ClearFilterBtn>
            </Box>
          </ListTagContainer>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <ClearFilterBtn onClick={handleClearFilter}>
              <span>Clear filters</span>
              <CloseCircleIcon
                sx={{ width: 18, height: 18, color: 'var(--leafy-green-1)' }}
              />
            </ClearFilterBtn>
          </Box>
        </Box>
      </Container>
    </FilterDisplayContainer>
  );
};

export default FilterDisplay;
