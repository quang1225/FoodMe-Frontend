import { Grid, Typography } from '@mui/material';
import { MenuSectionType } from '@services/restaurants/restaurantDetailApi.type';
import React, { FC } from 'react';
import MenuItem from './MenuItem';

interface MenuSectionProps {
  section: MenuSectionType;
  dietaries?: any;
  width?: string | number;
  updateMenu: () => void;
  filterDietaries: Array<number>;
}

const MenuSection: FC<MenuSectionProps> = ({
  section,
  dietaries,
  width,
  updateMenu,
  filterDietaries,
}) => {
  return (
    <Grid
      key={section.name}
      item
      container
      direction="column"
      width={width || '50%'}
      sx={theme => ({
        padding: '19px 22px 28px 38px',
        [theme.breakpoints.down('md')]: {
          width: '100%',
          padding: '19px 16px 28px 16px',
          borderRight: 'none',
        },
      })}
    >
      <Typography
        sx={{
          fontFamily: 'PP Agrandir',
          color: '#00A175',
          fontWeight: 700,
          fontSize: '22px',
        }}
        gutterBottom
      >
        {section.name}
      </Typography>
      <Grid container>
        <Grid item container direction="column" gap={4}>
          {section.menuItems &&
            section.menuItems.map(item => (
              // menu item goes here
              <MenuItem
                filterDietaries={filterDietaries}
                item={item}
                key={item.id}
                dietaries={dietaries}
                updateMenu={updateMenu}
              >
                {/* {!index && (
                  <Grid
                    item
                    md={2}
                    sx={{
                      backgroundColor: 'gray',
                      width: {
                        md: 116,
                        xs: 92,
                      },
                      minWidth: {
                        md: 116,
                        xs: 92,
                      },
                      height: {
                        md: 85,
                        xs: 72,
                      },
                      mb: 2,
                    }}
                  ></Grid>
                )} */}
              </MenuItem>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MenuSection;
