import { Box, Grid, Typography } from '@mui/material';
import { MenuItemType } from '@services/restaurants/restaurantDetailApi.type';
import {
  likeMenu,
  disLikeMenu,
} from '@services/restaurants/restaurantDetailApi';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import { useEffect, useRef, useState } from 'react';
import { DislikeIcon, LikeIcon } from 'utils/icons';
import IconMoon from '@components/shared/Icons';

import { useDispatch, useSelector } from 'react-redux';
import {
  setScrolling,
  toggleOpenModal,
} from '@stateManager/stores/slices/commonSlice';
import { styled } from '@mui/system';
import { useAppSelector } from '@stateManager/stores/appStore';
import { CustomTag } from './styles';
import {
  ExtraDietaryItem,
  Popover,
  PopoverStyle,
} from '@components/shared/PopoverDietary';

const Icon = styled(Box)<any>((props: any) => ({
  backgroundColor: `${props.actived ? 'var(--leafy-green-1)' : '#fff'}`,
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)',
  color: `${
    props.actived ? 'var(--fairy-floss-pink-4)' : 'var(--leafy-green-2)'
  }`,
  width: 28,
  height: 28,
  borderRadius: '14px',
  textAlign: 'center',
  lineHeight: '32px',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 10,
}));

const LikeCount = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '20px',
  color: '#333333',
  cursor: 'pointer',
}));

const ItemPopover = styled(Typography)(() => ({
  textTransform: 'lowercase',
  fontSize: '12px',
  color: 'var(--neutral-black-1)',
  padding: '5px 14px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const NumberLike = styled(Typography)(() => ({
  padding: '5px 14px',
  color: 'var(--neutral-black-1)',
}));

interface LikeProps {
  item: any;
  dietaries?: any;
  isLike?: boolean;
  handleLikeMenu: (menu: any, isLike: boolean) => void;
  localStatLike: boolean;
  count: number;
  updateMenu: () => void;
}

const colorsLike = ['#FF144D', '#0FA9FF', '#FB8904', '#06C319', '#2F44FD'];

const LikeComponent = ({
  item,
  isLike = false,
  handleLikeMenu,
  localStatLike,
  count,
  updateMenu,
}: LikeProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const dietaries = useAppSelector(appState => appState.dietary.list);
  const isAuthenticated = useAppSelector(
    appState => appState.user.isAuthenticated,
  );

  const { stats } = item;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    updateMenu();
    dispatch(setScrolling(false));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [like, setLike] = useState<any>([]);

  useEffect(() => {
    if (stats) {
      const newLike = Object.keys(stats || {})
        .reverse()
        .map((value, index) => {
          return {
            name:
              dietaries.filter(
                (dietary: any) => dietary.id.toString() === value,
              )[0]?.name || 'non diet-specific people',
            like: stats[value][
              index
                ? isLike
                  ? 'totalLikes'
                  : 'totalDislikes'
                : isLike
                ? 'totalNonDietaryLikes'
                : 'totalNonDietaryDisLikes'
            ],
          };
        });
      setLike(newLike.filter(item => !!item.like));
    }
  }, [item]);

  const openSignUpModal = () => {
    dispatch(
      toggleOpenModal({
        title: 'Want to know more about this item?',
        description:
          'To ensure the quality of each restaurant’s data, you will need to create an account to submit your rating.',
      }),
    );
  };

  return (
    <>
      {isLike ? (
        <LikeIcon
          onClick={handleLikeMenu}
          style={{
            width: 16,
            height: 16,
            cursor: 'pointer',
            color: `${localStatLike ? 'var(--fairy-floss-pink-2)' : '#8B8B8B'}`,
          }}
        />
      ) : (
        <DislikeIcon
          onClick={handleLikeMenu}
          style={{
            width: 16,
            height: 16,
            cursor: 'pointer',
            color: `${localStatLike ? 'var(--fairy-floss-pink-2)' : '#8B8B8B'}`,
          }}
        />
      )}
      <Box
        position="relative"
        onMouseLeave={handleClose}
        onMouseEnter={handleClick}
      >
        <LikeCount
          onClick={(e: any) =>
            !isAuthenticated ? openSignUpModal() : handleClick(e)
          }
        >
          {isAuthenticated || isLike ? count : '(?)'}
        </LikeCount>
        {(isAuthenticated || isLike) && (
          <PopoverStyle
            sx={{
              top: '15px',
              opacity: anchorEl ? 1 : 0,
              pointerEvents: anchorEl ? 'unset' : 'none',
              paddingTop: '15px',
            }}
          >
            <Popover>
              <NumberLike fontSize={12} fontWeight={600}>
                {count + ` people ${isLike ? '' : 'dis'}liked this`}
              </NumberLike>
              {like.length ? (
                <Box
                  sx={{
                    padding: '5px 0',
                    borderTop: '1px solid #EBEBEB',
                    marginTop: '5px',
                  }}
                >
                  {like.map((dietary: any, index: number) => (
                    <ItemPopover
                      sx={{
                        gap: 'unset',
                        alignItems: isLike ? 'baseline' : 'center',
                      }}
                      key={`${index}-${item.id}`}
                    >
                      {isLike ? (
                        <LikeIcon
                          style={{
                            width: 16,
                            height: 16,
                            marginRight: 6,
                            position: 'relative',
                            top: 2,
                            color: colorsLike[index],
                          }}
                        />
                      ) : (
                        <DislikeIcon
                          style={{
                            width: 16,
                            height: 16,
                            marginRight: 6,
                            position: 'relative',
                            top: 2,
                            color: colorsLike[index],
                          }}
                        />
                      )}
                      <Typography
                        fontSize={12}
                        fontWeight={600}
                      >{`${dietary.like} ${dietary.name} `}</Typography>
                      &nbsp;
                      {isLike ? '' : 'dis'}like this
                    </ItemPopover>
                  ))}
                </Box>
              ) : null}
            </Popover>
          </PopoverStyle>
        )}
      </Box>
    </>
  );
};

interface MenuItemProps {
  item: MenuItemType;
  dietaries?: any;
  updateMenu: () => void;
  children: any;
  filterDietaries: Array<number>;
}

const MenuItem = ({
  item,
  updateMenu,
  children,
  filterDietaries,
}: MenuItemProps) => {
  const [localStatLike, setLocalStatLike] = useState<any>(null);
  const [serverStatLike, setServerStatLike] = useState<any>(null);
  const [isUpdateMenu, setIsUpdateMenu] = useState<boolean>(false);
  const [counts, setCounts] = useState<Array<number>>([
    get(item.stats, `all.totalLikes`, 0),
    get(item.stats, `all.totalDislikes`, 0),
  ]);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const timeoutIdRef = useRef<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAuthenticated = useAppSelector(
    appState => appState.user.isAuthenticated,
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    dispatch(setScrolling(false));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const requestUpdateStats = async (menu: any, status: any) => {
    const isChangeStatus =
      isBoolean(serverStatLike) &&
      isBoolean(status) &&
      serverStatLike !== status;

    if ((!isBoolean(status) && isBoolean(serverStatLike)) || isChangeStatus) {
      await disLikeMenu(menu.id);
    }
    if ((!isBoolean(serverStatLike) && isBoolean(status)) || isChangeStatus)
      await likeMenu(menu.id, { isLiked: status });
    setServerStatLike(status);
    setIsUpdateMenu(true);
  };

  const handleLikeMenu = async (menu: any, isLike: boolean) => {
    const decreaseCount = isBoolean(localStatLike) ? 1 : 0;
    clearTimeout(timeoutIdRef.current);

    if (isAuthenticated) {
      if (localStatLike === isLike) {
        setLocalStatLike(null);
        isLike
          ? setCounts([counts[0] - 1, counts[1]])
          : setCounts([counts[0], counts[1] - 1]);
      } else {
        isLike
          ? setCounts([counts[0] + 1, counts[1] - decreaseCount])
          : setCounts([counts[0] - decreaseCount, counts[1] + 1]);
        setLocalStatLike(isLike);
      }

      timeoutIdRef.current = setTimeout(() => {
        requestUpdateStats(menu, localStatLike === isLike ? null : isLike);
      }, 500);
    } else {
      dispatch(
        toggleOpenModal({
          title: 'Want to rate the menu?',
          description:
            'To ensure the quality of each restaurant’s data, you will need to create an account to submit your rating.',
        }),
      );
    }
  };

  const updateStatLike = () => {
    if (isUpdateMenu) updateMenu();
    setIsUpdateMenu(false);
  };

  useEffect(() => {
    if (isAuthenticated && user?.detail?.id) {
      const userId = user?.detail?.id;
      const liked = get(item, 'menuItemLikes', []).find(
        (menuItemLike: any) => menuItemLike.userId === userId,
      )?.isLiked;
      setLocalStatLike(liked);
      setServerStatLike(liked);
    }
  }, [isAuthenticated, user.detail]);

  return (
    <Grid key={item.name} item container direction="column">
      <Box
        sx={{ display: 'flex', gap: '40px', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '24px',
              textTransform: 'uppercase',
            }}
            gutterBottom
          >
            {item.name} {item.price ? ` | ${item.price}` : ''}
          </Typography>
          <Typography
            sx={{
              color: 'var(--neutral-1)',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
            }}
            gutterBottom
          >
            {item.description}
          </Typography>
        </Box>
        {children}
      </Box>
      <Grid container gap={2} alignItems="center">
        <LikeComponent
          item={item}
          handleLikeMenu={() => handleLikeMenu(item, true)}
          isLike
          localStatLike={localStatLike === true}
          count={counts[0]}
          updateMenu={updateStatLike}
        />
        <LikeComponent
          item={item}
          handleLikeMenu={() => handleLikeMenu(item, false)}
          localStatLike={localStatLike === false}
          count={counts[1]}
          updateMenu={updateStatLike}
        />
        {item.menuItemDietaries &&
          item.menuItemDietaries.slice(0, 3).map((tag: any) => (
            <CustomTag
              $actived={(filterDietaries || []).includes(tag?.dietaryId)}
              key={tag?.id}
            >
              {tag?.dietary?.name}
            </CustomTag>
          ))}
        {item.menuItemDietaries && item.menuItemDietaries.length > 3 && (
          <Box
            position="relative"
            onMouseLeave={handleClose}
            onMouseEnter={handleClick}
          >
            <Icon
              actived={item.menuItemDietaries
                .slice(3, item.menuItemDietaries.length)
                .some((tag: any) => filterDietaries.includes(tag?.dietary?.id))}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '12px',
                  lineHeight: '28px',
                  textAlign: 'center',
                }}
              >
                +{item.menuItemDietaries.length - 3}
              </Typography>
            </Icon>
            <PopoverStyle
              sx={{
                top: '25px',
                opacity: anchorEl ? 1 : 0,
                pointerEvents: anchorEl ? 'unset' : 'none',
                right: 0,
                paddingTop: '10px',
              }}
            >
              <Popover>
                {item.menuItemDietaries
                  .slice(3, item.menuItemDietaries.length)
                  .map((tag: any) => (
                    <ExtraDietaryItem
                      key={tag?.dietary?.id}
                      actived={filterDietaries.includes(tag?.dietary?.id)}
                      sx={{ cursor: 'unset' }}
                    >
                      <IconMoon
                        size={24}
                        icon={tag?.dietary?.name}
                        color={
                          !filterDietaries.includes(tag?.dietary?.id)
                            ? 'var(--leafy-green-2)'
                            : 'var(--neutral-7)'
                        }
                      />
                      <b>
                        {tag?.dietary.alias} - {tag?.dietary.name}
                      </b>
                    </ExtraDietaryItem>
                  ))}
              </Popover>
            </PopoverStyle>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default MenuItem;
