import { Box, Grid, Typography, Skeleton } from '@mui/material';
import { Container, styled } from '@mui/system';
import { getMenuById } from '@services/restaurants/restaurantDetailApi';
import { RestaurantMenuType } from '@services/restaurants/restaurantDetailApi.type';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import FilterItem from './FilterItem';
import Menu from './Menu';

import flattenDeep from 'lodash/flattenDeep';
import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import { toggleOpenModal } from '@stateManager/stores/slices/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_TYPE } from 'utils/constant';

import { EmailIcon, PhoneIcon } from 'utils/icons';
import { setListBookingWidgets } from '@stateManager/stores/slices/restaurantSlice';
import { useRouter } from 'next/router';
import ReportListDialog from './modal/Report/ReportList';
import ThanksModal from './modal/Report/ThanksModal';
import { RootState, useAppSelector } from '@stateManager/stores/appStore';
import {
  StyleCommonButton,
  StyleContainer,
  StyleTag,
  CustomTabsMenu,
} from './styles';
import bookingOrderFunc from 'utils/bookingOrder';
import { isEmpty } from 'lodash';

interface MenuFilterProps {
  menus: RestaurantMenuType[];
  isFetchingMenu: boolean;
  hideButtons?: boolean;
}

const Wrapper = styled(Grid)(() => ({
  paddingRight: 'unset',
  transition: 'all 0.5s linear',
}));

const Filter = styled(Grid)(({ theme }) => ({
  borderRight: '1px solid #E5E5E5',
  padding: '78px 30px 100px 0',
  [theme.breakpoints.down('md')]: {
    padding: '22px 16px',
    overflow: 'auto',
    borderRight: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const ListDiatarySelect = styled(Grid)(({ theme }) => ({
  gap: '12px',
  [theme.breakpoints.down('md')]: {
    gap: '24px',
    padding: '0px',
  },
}));

const Content = styled(Grid)(() => ({
  width: '100%',
}));

const SkeletonDietary = styled(Skeleton)(({ theme }) => ({
  width: '100%',
  height: '46px',
  borderRadius: '100px',
  [theme.breakpoints.down('md')]: {
    width: '55px',
    height: '55px',
    borderRadius: '100%',
  },
}));

const EmptyData = styled(Typography)(() => ({
  fontStyle: 'italic',
  fontWeight: '600',
  fontSize: '15px',
  maxWidth: '490px',
  color: '#BDBDBD',
}));

interface TabPanelProps {
  children?: any;
  index: number;
  value: number;
  width: number;
}

interface IMenuEmty {
  contactPhone: string;
  contactEmail: string
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, width } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ width: `calc(100% + ${width / 2}px` }}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const RenderPdfMenu = ({ pdfMenu, width }: {pdfMenu: string, width: number}) => {
  return (
    <Box style={{ width: `calc(100% + ${width / 2}px`, height: 822 }}>
      <iframe
        src={`${pdfMenu}`} width="100%" height="100%"
        style={{ backgroundColor: '#FFFFFF' }} frameBorder={0}>
      </iframe>
    </Box>
  )
};

const MenuEmty = ({contactPhone, contactEmail}: IMenuEmty) => {
  return (
    <Box
      sx={{
        padding: { xs: '19px 16px', md: '19px 38px' },
        minHeight: '300px',
      }}
    >
      <EmptyData sx={{ mb: '29px' }}>
        Looks like there’s nothing that suits your requirement. Try
        contacting the restaurant to find out more.
      </EmptyData>
      <Box sx={{ display: 'flex', gap: '75px' }}>
        {contactPhone && (
          <Box mb={2}>
            <Box
              mb={2}
              fontSize={14}
              display="flex"
              alignItems="center"
            >
              <PhoneIcon />
              <Typography
                fontWeight={700}
                fontSize={14}
                textTransform="uppercase"
                ml={1}
              >
                Phone
              </Typography>
            </Box>
            <Typography fontSize={16} color="#8B8B8B">
              {contactPhone}
            </Typography>
          </Box>
        )}
        {contactEmail && (
          <Box
            mb={2}
            sx={{
              borderLeft: '1px solid #333333',
              paddingLeft: '75px',
            }}
          >
            <Box
              mb={2}
              fontSize={14}
              display="flex"
              alignItems="center"
            >
              <EmailIcon />
              <Typography
                fontWeight={700}
                fontSize={14}
                textTransform="uppercase"
                ml={1}
              >
                Email
              </Typography>
            </Box>
            <Typography fontSize={16} color="#8B8B8B">
              {contactEmail}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const MenuFilter = ({
  menus,
  isFetchingMenu,
  hideButtons,
}: MenuFilterProps) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [listDietary, setListDietary] = useState<any>([]);
  const [menuList, setMenuList] = useState<{ menus: RestaurantMenuType[] }>({
    menus: [],
  });
  const restaurantDetail = useAppSelector(
    appState => appState.restaurant.restaurantDetail,
  );
  const [isLoading, setLoading] = useState<boolean>(isFetchingMenu);
  const [filterDietaries, setFilterDietaries] = useState<Array<any>>([]);

  const menuFilterRef = useRef(null);
  const menuRef = useRef(null);

  const dispatch = useDispatch();
  const setOpenModal = (type: any | string) => {
    dispatch(toggleOpenModal(type));
  };
  const { openModal } = useSelector((state: RootState) => state.common || {});

  const { contactPhone, contactEmail } = restaurantDetail;

  const handleChange = (event: SyntheticEvent, newValue: any) => {
    setValue(newValue);
    setFilterDietaries([]);
    getListDietaryByMenu(null, newValue);
  };

  const handleSelectDietary = (dietary: any) => {
    if (filterDietaries.includes(dietary.id)) {
      setFilterDietaries(filterDietaries.filter(item => item !== dietary.id));
    } else {
      setFilterDietaries(filterDietaries.concat(dietary.id));
    }
  };

  const getListDietaryByMenu = (menus: any, index: number) => {
    const restaurantMenu = menus ? menus : menuList;
    const menuSections = flattenDeep(
      get(restaurantMenu, `menus.${index}.menuSections`, []).map(
        (menu: any) => menu.menuItems,
      ),
    ).map((item: any) => item.menuItemDietaries);

    const allDietaries = flattenDeep(menuSections)
      .map((item: any) => item.dietary)
      .filter(dietary => !!dietary);

    const dietaries = uniqBy(allDietaries, 'id').filter(dietary => !!dietary);

    dietaries.forEach(
      dietary =>
        (dietary.count = allDietaries.filter(
          item => item.id === dietary.id,
        ).length),
    );

    setListDietary(dietaries);
    setLoading(false);
  };

  useEffect(() => {
    setMenuList({
      menus: menus.sort((menuA: any, menuB: any) => menuA.order - menuB.order),
    });
    menus.length && getListDietaryByMenu({ menus: menus }, 0);
  }, [menus]);

  useEffect(() => {
    setLoading(isFetchingMenu);
  }, [isFetchingMenu])

  useEffect(() => {
    router?.query?.dietaries &&
      setFilterDietaries([Number(router.query.dietaries)]);
  }, []);

  const updateMenu = (index: number, isFetching?: boolean) => {
    async function getMenuSection(slug: string, menuid: number) {
      !isFetching && setLoading(true);
      const res = await getMenuById(slug, menuid);
      const newMenu = menuList.menus;
      newMenu[index].menuSections = get(res, 'menuSections', []);
      setMenuList({ menus: newMenu });
      !isFetching && getListDietaryByMenu({ menus: newMenu }, index);
      setLoading(false);
    }

    const selectedMenu = menuList.menus[index];
    // if ((selectedMenu && !selectedMenu.menuSections) || isFetching) {
    getMenuSection(selectedMenu.restaurantId, selectedMenu.id);
    // }
  };

  const isBooking = Object.values(
    restaurantDetail?.bookingWidgets || {},
  ).length;

  return (
    <>
      <Wrapper container id="menu">
        <Box ref={menuRef} sx={{ width: '100%' }}>
          <Grid
            sx={theme => ({
              [theme.breakpoints.up('md')]: {
                padding: '21px 0',
              },
              display: {
                xs: 'none',
                md: 'flex',
              },
              borderBottom: '1px solid #E5E5E5',
            })}
          >
            <Container sx={{ padding: { xs: 0, md: '0px 24px' } }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid container width="auto" gap={3}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '32px',
                      lineHeight: '44px',
                      color: 'var(--neutral-black-1)',
                    }}
                  >
                    Menu
                  </Typography>
                </Grid>

                {!hideButtons && (
                  <Box sx={{ display: 'flex', gap: '20px' }}>
                    {!isEmpty(restaurantDetail?.bookingWidgets) && (
                      <StyleCommonButton
                        disabled={!isBooking}
                        height={42}
                        background="var(--orange-zest-2)"
                        onClick={() => {
                          dispatch(
                            setListBookingWidgets(
                              restaurantDetail?.bookingWidgets,
                            ),
                          );
                          dispatch(toggleOpenModal(MODAL_TYPE.MAKE_BOOKING));
                        }}
                      >
                        <Typography
                          color={
                            isBooking ? 'var(--neutral-7)' : 'var(--neutral-4)'
                          }
                          fontSize={16}
                          className="title-font"
                        >
                          Make a booking
                        </Typography>
                      </StyleCommonButton>
                    )}
                    {!isEmpty(restaurantDetail?.deliveryProviders) && (
                      <StyleCommonButton
                        height={42}
                        background="var(--orange-zest-2)"
                        onClick={() =>
                          bookingOrderFunc(restaurantDetail, dispatch)
                        }
                      >
                        <Typography
                          color="var(--neutral-7)"
                          fontSize={16}
                          className="title-font"
                        >
                          Order online
                        </Typography>
                      </StyleCommonButton>
                    )}
                  </Box>
                )}
              </Grid>
            </Container>
          </Grid>
          {menuList.menus && menuList.menus.length > 1 && (
            <Box
              sx={{
                borderBottom: '1px solid #E5E5E5',
              }}
            >
              <Container sx={{ padding: { xs: 0, md: '0px 24px' } }}>
                <CustomTabsMenu
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: '#00A175',
                    },
                  }}
                  value={value}
                  onChange={handleChange}
                >
                  {menuList.menus &&
                    menuList.menus.length > 1 &&
                    menuList.menus.map((menu, index) => (
                      <StyleTag
                        key={menu.id + '.tab'}
                        label={menu.name}
                        {...a11yProps(index)}
                        onClick={() => updateMenu(index)}
                      />
                    ))}
                </CustomTabsMenu>
              </Container>
            </Box>
          )}
        </Box>
        <StyleContainer>
          <Box
            ref={menuFilterRef}
            sx={{ display: { md: 'flex' }, width: '100%' }}
          >
            <Filter>
              <Box sx={{ width: { xs: '100%', md: '175px' } }}>
                <ListDiatarySelect
                  container
                  direction={{
                    md: 'column',
                    xs: 'row',
                  }}
                  flexWrap="nowrap"
                >
                  {isLoading ? (
                    new Array(8).fill('').map((item: string, index: number) => (
                      <Grid
                        container
                        key={`skeleton-${index}`}
                        justifyContent="center"
                      >
                        <SkeletonDietary variant="rectangular" />
                        <Skeleton
                          variant="rectangular"
                          width={40}
                          height={10}
                          sx={{ mt: 0.5, display: { md: 'none' } }}
                        />
                      </Grid>
                    ))
                  ) : (
                    <>
                      {listDietary.length ? (
                        listDietary.map((dietary: any) => (
                          <Box
                            key={dietary.name}
                            onClick={() => handleSelectDietary(dietary)}
                          >
                            <FilterItem
                              actived={filterDietaries.includes(dietary.id)}
                              dietary={dietary}
                            />
                          </Box>
                        ))
                      ) : (
                        <EmptyData>
                          We’ll have more dietary information on this menu soon.
                          Watch this space!
                        </EmptyData>
                      )}
                    </>
                  )}
                </ListDiatarySelect>
              </Box>
            </Filter>
            <Content>
              {isLoading ? (
                <Typography
                  sx={{
                    color: '#AAAAAA',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    fontSize: '20px',
                    lineHeight: '30px',
                    padding: {
                      xs: '20px 16px 40px 16px',
                      md: '19px 38px',
                    },
                  }}
                >
                  loading...
                </Typography>
              ) : (get(menuList, `menus.${value}.menuSections.length`, 0) || get(menuList, `menus.${value}.pdfMenu`, false)) ? (
                get(menuList, `menus.${value}.pdfMenu`, null) ? 
                  <RenderPdfMenu pdfMenu={get(menuList, `menus.${value}.pdfMenu`, '')} width={
                    get(menuRef, 'current.offsetWidth', 0) -
                    get(menuFilterRef, 'current.offsetWidth', 0)
                  }/> 
                  : (
                  menuList.menus.map((menu, index) => (
                    <TabPanel
                      width={
                        get(menuRef, 'current.offsetWidth', 0) -
                        get(menuFilterRef, 'current.offsetWidth', 0)
                      }
                      value={value}
                      index={index}
                      key={value + '.' + menu.id}
                    >
                      <Menu
                        menu={menu}
                        dietaries={listDietary}
                        filterDietaries={filterDietaries || []}
                        updateMenu={() => updateMenu(index, true)}
                      />
                    </TabPanel>
                  ))
                )
              ) : (
                <MenuEmty contactEmail={contactEmail} contactPhone={contactPhone} />
              )}
            </Content>
          </Box>
        </StyleContainer>
      </Wrapper>
      {menus && !isFetchingMenu && (
        <ReportListDialog
          isOpen={openModal === MODAL_TYPE.REPORT_ISSUE}
          setOpenModal={setOpenModal}
          handleClose={() => {
            setOpenModal('');
          }}
          menu={menus}
          id={restaurantDetail.id}
        />
      )}
      <ThanksModal isOpen={openModal === MODAL_TYPE.THANKS} />
    </>
  );
};

export default MenuFilter;
