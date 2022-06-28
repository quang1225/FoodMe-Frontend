import React, { FC } from 'react';
import get from 'lodash/get';
import { IDietary } from '@services/dietary/dietaryApi.types';

import { Box, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createRestaurantDetailHref } from 'utils';
import { useWidth } from 'utils/useWidth';
import Icon from '../Icons';
import Button from '../CommonButton';
import { ExtraDietaryItem, Popover, PopoverStyle } from '../PopoverDietary';

const DietaryRequirements = styled(Box)(({ theme }) => ({
  padding: '0px 26px 26px 26px',
  width: 'max-content',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  maxWidth: '370px',
  [theme.breakpoints.down('md')]: {
    maxWidth: 'min-content',
  },
}));

const DietaryTitle = styled(Box)(() => ({
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#8B8B8B',
  marginBottom: '14px',
  width: 'max-content',
}));

const ExtraDietaryBox = styled(Box)<{ actived: boolean }>(({ actived }) => ({
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
  borderRadius: '100%',
  width: '28px',
  height: '28px',
  fontSize: '12px',
  color: actived ? 'var(--fairy-floss-pink-4)' : 'var(--leafy-green-2)',
  background: actived ? 'var(--leafy-green-2)' : 'var(--neutral-7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  cursor: 'pointer',
  marginLeft: 'auto',
  padding: '5px 0',
  marginBottom: '10px',
  position: 'relative',
  zIndex: 98,
}));

const TextDescription = styled(Box)(() => ({
  fontWeight: 400,
  fontSize: '14px',
  color: 'var(--neutral-4)',
  marginBottom: '10px',
}));

const TagButton = styled(Button)(() => ({
  height: '42px',
  width: '50px',
  minWidth: '50px',
  marginBottom: '8px',
  '& svg': {
    minWidth: '24px',
  },
}));

const LIST_DIETARY_DEFAULT = [
  {
    name: 'VGN',
    icon: 'Vegan',
  },
  {
    name: 'VEG',
    icon: 'Vegetarian',
  },
  {
    name: 'GF',
    icon: 'Gluten free',
  },
  {
    name: 'DF',
    icon: 'Dairy free',
  },
  {
    name: 'NF',
    icon: 'Nut free',
  },
];

export interface ExtraDietaryProps {
  dietaries: Array<IDietary>;
  filterDietaries: Array<number>;
  restaurant: any;
  totalView: number;
}

export interface TagDietaryProps {
  icon: string;
  label: string;
  count?: number;
  actived?: boolean;
  disabled?: boolean;
}

const TagDietary: FC<TagDietaryProps> = ({
  icon,
  label,
  count,
  actived,
  disabled,
}) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <TagButton
        background={
          disabled
            ? 'var(--neutral-6)'
            : actived
            ? 'var(--leafy-green-2)'
            : 'var(--neutral-7)'
        }
        $borderColor={disabled ? 'var(--neutral-5)' : 'var(--leafy-green-2)'}
      >
        <Icon
          size={24}
          icon={icon}
          color={
            disabled
              ? 'var(--neutral-4)'
              : !actived
              ? 'var(--leafy-green-2)'
              : 'var(--neutral-7)'
          }
        />
      </TagButton>
      <Typography
        fontSize={14}
        fontWeight={700}
        color={disabled ? 'var(--neutral-4)' : 'var(--leafy-green-2)'}
        className="title-font"
      >
        {label} ({count || '?'})
      </Typography>
    </Box>
  );
};

const ExtraDietary: FC<ExtraDietaryProps> = ({
  dietaries,
  filterDietaries,
  restaurant,
  totalView,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<boolean>(false);
  const open = anchorEl;
  const windowWidth = useWidth();

  const handleClose = () => {
    setAnchorEl(false);
  };

  const numberExtra = get(dietaries, 'length', 0) - totalView;

  const listIds = dietaries.slice(-numberExtra).map(dietary => dietary.id);

  const actived = filterDietaries.some(id => listIds.includes(id));

  const restaurantHref = (dietaryId: number) =>
    createRestaurantDetailHref(restaurant.slug) + `?dietaries=${dietaryId}`;

  return (
    <Box sx={{ position: 'absolute', right: '-45px', top: 0 }}>
      <Box
        onMouseEnter={() => setAnchorEl(true)}
        onMouseLeave={() => handleClose()}
      >
        <ExtraDietaryBox actived={actived}>+{numberExtra}</ExtraDietaryBox>
        <PopoverStyle
          sx={{
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'unset' : 'none',
            right: windowWidth && windowWidth < 550 ? '0px' : 'unset',
          }}
        >
          <Popover>
            {dietaries.slice(-numberExtra).map(dietary => (
              <Link key={dietary.id} href={restaurantHref(dietary.id)} passHref>
                <a>
                  <ExtraDietaryItem
                    actived={filterDietaries.includes(dietary.id)}
                  >
                    <Icon
                      size={24}
                      icon={dietary.name}
                      color={
                        !filterDietaries.includes(dietary.id)
                          ? 'var(--leafy-green-2)'
                          : 'var(--neutral-7)'
                      }
                    />
                    <b>
                      {dietary.alias} - {dietary.name} (
                      {get(dietary, 'menuItemDietCount', '#')})
                    </b>
                  </ExtraDietaryItem>
                </a>
              </Link>
            ))}
          </Popover>
        </PopoverStyle>
      </Box>
    </Box>
  );
};

export const ListDietary: FC<{
  dietaries: Array<IDietary>;
  restaurant: any;
  isGridView?: boolean;
}> = ({ dietaries, restaurant, isGridView }) => {
  const router = useRouter();

  const restaurantHref = (dietaryId: number) =>
    createRestaurantDetailHref(restaurant.slug) + `?dietaries=${dietaryId}`;

  const filterDietaries = JSON.parse(get(router, 'query.dietaries', '[]'));
  const totalView = isGridView ? 4 : 5;

  return (
    <DietaryRequirements>
      <DietaryTitle className="title-font">Dietary requirements</DietaryTitle>
      <Box>
        {get(dietaries, 'length', 0) ? (
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              gap: '14px',
              position: 'relative',
              alignItems: 'center',
            }}
          >
            {dietaries.slice(0, totalView).map((dietary: IDietary) => (
              <Tooltip key={dietary.id} title={dietary.name} placement="bottom">
                <Link href={restaurantHref(dietary.id)} passHref>
                  <a>
                    <TagDietary
                      actived={filterDietaries.includes(dietary.id)}
                      icon={dietary.name}
                      label={dietary.alias || ''}
                      count={get(dietary, 'menuItemDietCount', 0)}
                    />
                  </a>
                </Link>
              </Tooltip>
            ))}
            {get(dietaries, 'length', 0) > totalView && (
              <ExtraDietary
                dietaries={dietaries}
                filterDietaries={filterDietaries}
                restaurant={restaurant}
                totalView={totalView}
              />
            )}
          </Box>
        ) : (
          <>
            <TextDescription>
              We’ll have more dietary information on this menu soon. Watch this
              space!
            </TextDescription>
            <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
              {LIST_DIETARY_DEFAULT.slice(0, totalView).map(dietary => (
                <TagDietary
                  key={dietary.name}
                  disabled
                  icon={dietary.icon}
                  label={dietary.name}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </DietaryRequirements>
  );
};

export default ListDietary;
