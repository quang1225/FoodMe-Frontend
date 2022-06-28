import React, { useState, FC } from 'react';
import { Box, FormGroup, Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { MenuIcon, GridIcon } from 'utils/icons';
import DropDown from './DropDown';
import { useRouter } from 'next/router';
import get from 'lodash/get';

import { TYPE_VIEW, SORT_TYPE } from './enum';
import { useWidth } from 'utils/useWidth';
import CommonCheckBox from '@components/shared/CommonCheckBox';
export interface Props {
  total: number;
  setView: (type: string) => void;
  view: string;
}

const SortContainer = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  padding: '11px 0 20px 0',
  alignItems: 'center',
}));

const TotalResults = styled(Box)(() => ({
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '32px',
  color: 'var(--orange-zest-2)',
}));

const ViewModeBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 18,
}));

const LabelCheckBox = styled(Box)(() => ({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#4F4F4F',
}));

const TitleGroup = styled(Box)(() => ({
  fontWeight: 600,
  fontSize: '14px',
  textTransform: 'uppercase',
  color: '#BDBDBD',
  paddingBottom: '5px',
}));

const FormGroupBorder = styled(FormGroup)(() => ({
  padding: '15px',
  borderTop: `1px solid ${'#E0E0E0'}`,
  borderBottom: `1px solid ${'#E0E0E0'}`,
}));

export const SortRestaurant: FC<Props> = ({ total, setView, view }) => {
  const router = useRouter();
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const windowWidth = useWidth();

  const applySort = () => {
    sortField
      ? (router.query.sortField = sortField)
      : delete router.query.sortField;
    sortOrder
      ? (router.query.sortOrder = sortOrder)
      : delete router.query.sortOrder;
    router.push(router);
  };

  const closeSort = () => {
    setSortField(get(router, 'query.sortField', ''));
    setSortOrder(get(router, 'query.sortOrder', ''));
  };

  const handleUncheckSort = () => {
    setSortField('');
    setSortOrder('');
  };

  return (
    <SortContainer>
      <TotalResults className="title-font">
        {total} result{total > 1 ? 's' : ''}
      </TotalResults>
      <ViewModeBox>
        <DropDown apply={applySort} close={closeSort} name="Sort by">
          <FormGroup sx={{ padding: '15px' }}>
            <TitleGroup>Distance</TitleGroup>
            <CommonCheckBox
              checked={sortField === SORT_TYPE.DISTANCE}
              onChange={(e: any) => {
                if (e.target.checked) {
                  setSortField(SORT_TYPE.DISTANCE);
                  setSortOrder('');
                } else {
                  handleUncheckSort();
                }
              }}
              text={<LabelCheckBox>Closest to me</LabelCheckBox>}
            />
          </FormGroup>
          <FormGroupBorder>
            <TitleGroup>Price</TitleGroup>
            <CommonCheckBox
              checked={sortField === SORT_TYPE.COSTS && sortOrder === 'desc'}
              onChange={(e: any) => {
                if (e.target.checked) {
                  setSortField(SORT_TYPE.COSTS);
                  setSortOrder('desc');
                } else {
                  handleUncheckSort();
                }
              }}
              text={<LabelCheckBox>Highest to lowest</LabelCheckBox>}
            />
            <CommonCheckBox
              checked={sortField === SORT_TYPE.COSTS && sortOrder === 'asc'}
              onChange={(e: any) => {
                if (e.target.checked) {
                  setSortField(SORT_TYPE.COSTS);
                  setSortOrder('asc');
                } else {
                  handleUncheckSort();
                }
              }}
              text={<LabelCheckBox>Lowest to highest</LabelCheckBox>}
            />
          </FormGroupBorder>
          <FormGroup sx={{ padding: '15px' }}>
            <TitleGroup>Rating</TitleGroup>
            <CommonCheckBox
              checked={sortField === SORT_TYPE.RATING}
              onChange={(e: any) => {
                if (e.target.checked) {
                  setSortField(SORT_TYPE.RATING);
                  setSortOrder('desc');
                } else {
                  handleUncheckSort();
                }
              }}
              text={<LabelCheckBox>Highest to lowest</LabelCheckBox>}
            />
          </FormGroup>
        </DropDown>
        {/* <MapPinIcon fill="#E0E0E0" sx={{ cursor: 'pointer' }} /> */}
        {windowWidth > 1200 && windowWidth && (
          <>
            <Tooltip title="Card view" placement="top">
              <Box display="flex">
                <GridIcon
                  onClick={() => setView(TYPE_VIEW.GRID_VIEW)}
                  fill={
                    TYPE_VIEW.GRID_VIEW === view
                      ? 'var(--leafy-green-1)'
                      : 'var(--orange-zest-3)'
                  }
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </Tooltip>
            <Tooltip title="List view" placement="top">
              <Box sx={{ display: 'flex' }}>
                <MenuIcon
                  onClick={() => setView(TYPE_VIEW.LIST_VIEW)}
                  fill={
                    TYPE_VIEW.LIST_VIEW === view
                      ? 'var(--leafy-green-1)'
                      : 'var(--orange-zest-3)'
                  }
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            </Tooltip>
          </>
        )}
      </ViewModeBox>
    </SortContainer>
  );
};

export default SortRestaurant;
