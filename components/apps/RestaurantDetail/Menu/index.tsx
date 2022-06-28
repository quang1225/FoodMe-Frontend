import { Collapse, Box } from '@mui/material';
import { styled } from '@mui/system';
import { RestaurantMenuType } from '@services/restaurants/restaurantDetailApi.type';
import { IDietary } from '@services/dietary/dietaryApi.types';
import { FC, useEffect, useState } from 'react';
import MenuSection from '../MenuSection';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import { ArrowIcon } from 'utils/icons';
import { useAppSelector } from '@stateManager/stores/appStore';

interface MenuProps {
  menu: RestaurantMenuType;
  dietaries?: any;
  column?: number;
  filterDietaries?: Array<number>;
  updateMenu: () => void;
}

interface ListMenuSectionProps {
  filterDietaries?: Array<number>;
  menuSections: Array<any>;
  dietaries?: any;
  updateMenu: () => void;
}

const TitleCollapse = styled(Box)<{ $bgColor: string }>(({ $bgColor }) => ({
  backgroundColor: $bgColor || '#00A175',
  color: '#fff',
  padding: '12px 38px',
  height: 56,
  fontFamily: 'PP Agrandir',
  fontWeight: 700,
  fontSize: '26px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
}));

const ArrowIconTransform = styled(ArrowIcon)<{ actived: number }>(
  ({ actived }) => ({
    width: '14px',
    transform: `rotateZ(${actived ? '0deg' : '90deg'})`,
    transition: 'all 0.1s',
  }),
);

const Description = styled(Box)<{ background: string }>(({ background }) => ({
  fontWeight: 600,
  fontSize: '12px',
  color: 'var( --neutral-black-1)',
  background: background,
  padding: '10px 38px',
}));

const initCollapse = [
  {
    title: 'You can eat',
    data: [],
    index: 0,
    description: '',
    color: '#00A175',
    subColor: 'var(--leafy-green-4)',
  },
  // {
  //   title: 'You can possibly eat',
  //   data: [],
  //   index: 1,
  //   description: '',
  //   color: '#00A175',
  //   subColor: 'var(--leafy-green-4)'
  // },
  {
    title: 'You can not eat',
    data: [],
    index: 2,
    description: 'None of these items are suitable',
    color: '#FD9979',
    subColor: 'var(--orange-zest-3)',
  },
];

const ListMenuSection = ({
  filterDietaries,
  menuSections,
  dietaries,
  updateMenu,
}: ListMenuSectionProps) => {
  const indexSlice = Math.round(menuSections.length / 2);
  if (menuSections.length > 1) {
    return (
      <Box sx={{ display: { md: 'flex', xs: 'block' } }}>
        <Box
          sx={{
            borderRight: { md: '1px solid #E5E5E5', xs: 'none' },
            width: { md: '50%', xs: '100%' },
          }}
        >
          {menuSections.slice(0, indexSlice).map((section, index) => (
            <Box
              key={index}
              sx={{
                borderTop: index ? '1px solid #E5E5E5' : 'none',
              }}
            >
              <MenuSection
                filterDietaries={filterDietaries || []}
                width="100%"
                section={section}
                key={section.id}
                dietaries={dietaries}
                updateMenu={updateMenu}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ width: { md: '50%', xs: '100%' } }}>
          {menuSections
            .slice(indexSlice, menuSections.length)
            .map((section, index) => (
              <Box
                key={index}
                sx={{
                  borderTop: {
                    md: index ? '1px solid #E5E5E5' : 'none',
                    xs: '1px solid #E5E5E5',
                  },
                }}
              >
                <MenuSection
                  filterDietaries={filterDietaries || []}
                  width="100%"
                  section={section}
                  key={section.id}
                  dietaries={dietaries}
                  updateMenu={updateMenu}
                />
              </Box>
            ))}
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      {menuSections.map(section => (
        <MenuSection
          filterDietaries={filterDietaries || []}
          width="100%"
          section={section}
          key={section.id}
          dietaries={dietaries}
          updateMenu={updateMenu}
        />
      ))}
    </Box>
  );
};

const Menu: FC<MenuProps> = ({
  menu,
  dietaries,
  filterDietaries,
  updateMenu,
}) => {
  const menuSections = cloneDeep(get(menu, 'menuSections', []));
  const [checked, setChecked] = useState<Array<number>>(
    initCollapse.map(col => col.index),
  );
  const [collapses, setCollapses] = useState<Array<any>>(initCollapse);

  const dietaryState = useAppSelector(appState => appState.dietary);

  useEffect(() => {
    if (menuSections) {
      const clCollapes = cloneDeep(collapses);
      if (filterDietaries && filterDietaries.length) {
        const name = get(dietaryState, 'list', [])
          .filter((dietary: IDietary) => filterDietaries.includes(dietary.id))
          .map((dietary: IDietary) => dietary.name.toLocaleLowerCase())
          .join(', ');

        clCollapes.forEach((collapse, index) => {
          const filterMenuSections = cloneDeep(menu.menuSections);
          switch (index) {
            case 0:
              filterMenuSections.forEach((section: any, index: number) => {
                filterMenuSections[index].menuItems = get(
                  section,
                  'menuItems',
                  [],
                ).filter((item: any) =>
                  item.menuItemDietaries
                    .map((itemDietary: any) => itemDietary.dietaryId)
                    .some((dietary: any) => filterDietaries.includes(dietary)),
                );
              });
              collapse.description = `These items have been identified by the restaurant as “${name}”`;
              break;
            // case 1:
            //   filterMenuSections.forEach((section: any, index: number) => {
            //     filterMenuSections[index].menuItems = get(
            //       section,
            //       'menuItems',
            //       [],
            //     ).filter((item: any) => {
            //       const menuItemDietaries = item.menuItemDietaries.map(
            //         (dietary: any) => dietary.dietaryId,
            //       );
            //       return (
            //         menuItemDietaries.some((dietary: any) =>
            //           filterDietaries.includes(dietary),
            //         ) && menuItemDietaries.length !== filterDietaries.length
            //       );
            //     });
            //   });
            //   collapse.description = `The restaurant has not indicated these items as “${name}” however, based on our data base, they are generally vegan. We recommend you check with the restaurant`;
            //   break;
            case 1:
              filterMenuSections.forEach((section: any, index: number) => {
                filterMenuSections[index].menuItems = get(
                  section,
                  'menuItems',
                  [],
                ).filter(
                  (item: any) =>
                    !item.menuItemDietaries
                      .map((itemDietary: any) => itemDietary.dietaryId)
                      .some((dietary: any) =>
                        filterDietaries.includes(dietary),
                      ),
                );
              });
              break;
            default:
              break;
          }
          collapse.data = filterMenuSections.filter(
            item => item.menuItems.length,
          );
        });
      }

      setCollapses(clCollapes);
      setChecked(
        clCollapes.filter(col => col.data.length).map(col => col.index),
      );
    }
  }, [filterDietaries, dietaryState]);

  return (
    <Box
      sx={{
        position: 'relative',
        top: '-1px',
      }}
    >
      {filterDietaries?.length ? (
        <Box>
          {collapses.map(item => (
            <Box key={item.index}>
              <TitleCollapse
                $bgColor={item.color}
                onClick={() =>
                  setChecked(
                    checked.includes(item.index)
                      ? checked.filter(check => check !== item.index)
                      : checked.concat(item.index),
                  )
                }
              >
                <span>{item.title}</span>
                <ArrowIconTransform
                  actived={checked.includes(item.index) ? 1 : 0}
                />
              </TitleCollapse>
              <Collapse in={checked.includes(item.index)}>
                <Description background={item.subColor}>
                  {item.description}
                </Description>
                <ListMenuSection
                  filterDietaries={filterDietaries}
                  menuSections={item.data}
                  dietaries={dietaries}
                  updateMenu={updateMenu}
                />
              </Collapse>
            </Box>
          ))}
        </Box>
      ) : (
        <ListMenuSection
          filterDietaries={filterDietaries}
          menuSections={menuSections}
          dietaries={dietaries}
          updateMenu={updateMenu}
        />
      )}
    </Box>
  );
};

export default Menu;
