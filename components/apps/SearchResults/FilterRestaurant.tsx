import React, { useState, FC, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  FormGroup,
  TextField,
  InputAdornment,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';
import { SearchIcon, ShowMoreIcon } from 'utils/icons';
import DropDown, { RenderMenuItem } from './DropDown';
import { useAppSelector } from '@stateManager/stores/appStore';
import { IDietary } from '@services/dietary/dietaryApi.types';
import { getListCuisine } from '@services/cuisine/cuisineApi';
import { Cuisine } from '@services/cuisine/cuisineApi.types';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { iType } from '@services/restaurants/restaurantApi.types';
import CommonCheckBox from '@components/shared/CommonCheckBox';

const LIST_COST = ['$', '$$', '$$$', '$$$$'];

export interface Props {
  listCuisineDefault: Array<Cuisine>;
  listType: Array<iType>;
}

const DesktopOnly = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const MobileOnly = styled(Box)(({ theme }) => ({
  display: 'block',
  position: 'absolute',
  right: '0px',
  padding: '5px',
  backgroundColor: '#FDFAFB',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const StyledMenuItem = styled(MenuItem)(() => ({
  padding: '7px 35px',
  minHeight: '25px',
}));

const FilterContainer = styled(Box)(() => ({
  borderBottom: '1px solid #E5E5E5',
}));

const ListFilterContainer = styled(Box)(({ theme }) => ({
  margin: '0 -15px',
  display: 'flex',
  gap: 20,
  overflow: 'auto',
  alignItems: 'center',
  [theme.breakpoints.up('xs')]: {
    padding: '0px 15px',
  },
}));

const LabelCheckBox = styled(Box)(() => ({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#111111',
  '& b': {
    color: 'var(--leafy-green-2)',
  },
}));

const GroupMenu = styled(FormGroup)(() => ({
  padding: '12px 15px',
}));

const InputSearch = styled(TextField)(() => ({
  padding: '5px 0 10px 0',
  '& input': {
    padding: '12px 14px 12px 5px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#828282',
    },
    '&:hover fieldset': {
      borderColor: '#828282',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#828282',
    },
  },
}));

const DividerSpace = styled(Divider)(() => ({
  margin: '10px -15px',
  position: 'relative',
  zIndex: 3
}));

const ScrollBar = styled(Box)<{ maxHeight?: number }>(({ theme, maxHeight = 320 }) => ({
  overflow: 'auto',
  maxHeight: maxHeight,
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#fff',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#C4C4C4',
    borderRadius: '100px',
  },
  '& label': {
    '&:last-child': {
      position: 'relative',
      zIndex: 3
    },
  },
  [theme.breakpoints.up('sm')]: {
    maxHeight: 320,
  },
}));

const BlurBox = styled(Box)(() => ({
  background:
    'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
  position: 'absolute',
  bottom: '15px',
  height: '64px',
  width: '100%',
  left: 0,
  pointerEvents: 'none',
  zIndex: 2
}));

const ListFilter: FC<Props> = ({ listCuisineDefault, listType }) => {
  const router = useRouter();

  const [filterMobile, setFilterMobile] = useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFilterMobile('');
  };

  const dietaryState = useAppSelector(appState => appState.dietary);

  const [dietarySelected, setDietarySelected] = useState<Array<IDietary>>([]);
  const [dietaryKeyword, setDietaryKeyword] = useState<string>('');

  const [cuisineSelected, setCuisineSelected] = useState<Array<Cuisine>>([]);
  const [cuisineKeyword, setCuisineKeyword] = useState<string>('');

  const listInnerRef = useRef(null);
  const [offsetCuisine, setOffsetCuisine] = useState<number>(0);

  const [typeSelected, setTypeSelected] = useState<Array<number>>([]);

  const [costSelected, setCostSelected] = useState<Array<string>>([]);

  const [listDietary, setListDietary] = useState<Array<IDietary>>(
    get(dietaryState, 'list', []),
  );
  const [listCuisine, setlistCuisine] = useState<Array<Cuisine>>([]);

  const handleGetCuisines = async (keyword?: string, offset?: number) => {
    const response = await getListCuisine({
      keyword,
      limit: 10,
      offset: offset || 0,
    });
    setOffsetCuisine(offsetCuisine + 10);
    offset
      ? setlistCuisine([...listCuisine, ...response])
      : setlistCuisine(response);
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current as any;
      if (scrollTop + clientHeight >= (scrollHeight - 50)) {
        handleGetCuisines(cuisineKeyword, offsetCuisine);
      }
    }
  };

  const handleSelectDietary = (event: IDietary) => {
    const clDietarySelected = cloneDeep(dietarySelected);
    const index = clDietarySelected.findIndex(
      dietary => dietary?.id === event.id,
    );
    if (index < 0) {
      setDietarySelected([event].concat(clDietarySelected));
    } else {
      clDietarySelected.splice(index, 1);
      setDietarySelected(clDietarySelected);
    }
  };

  const applyDietary = () => {
    router.query.dietaries = dietarySelected.length
      ? JSON.stringify(dietarySelected.map(item => item.id))
      : [];
    router.push(router);
  };

  const handleSelectCuisine = (event: Cuisine) => {
    const clCuisineSeleceted = cloneDeep(cuisineSelected);
    const index = clCuisineSeleceted.findIndex(
      cuisine => cuisine.id === event.id,
    );
    if (index < 0) {
      setCuisineSelected([event].concat(clCuisineSeleceted));
    } else {
      clCuisineSeleceted.splice(index, 1);
      setCuisineSelected(clCuisineSeleceted);
    }
    onScroll();
  };

  const applyCuisine = () => {
    router.query.cuisines = cuisineSelected.length
      ? JSON.stringify(cuisineSelected.map(item => item.id))
      : [];
    router.push(router);
  };

  const handleSelectType = (event: number) => {
    const clTypeSelected = cloneDeep(typeSelected);
    const index = clTypeSelected.findIndex(type => type === event);
    if (index < 0) {
      setTypeSelected(clTypeSelected.concat(event));
    } else {
      clTypeSelected.splice(index, 1);
      setTypeSelected(clTypeSelected);
    }
  };

  const applyType = () => {
    router.query.types = typeSelected.length
      ? JSON.stringify(typeSelected)
      : [];
    handleClose();
    router.push(router);
  };

  const handleSelectCost = (event: string) => {
    const clCostSelected = cloneDeep(costSelected);
    const index = clCostSelected.findIndex(cost => cost === event);
    if (index < 0) {
      setCostSelected(clCostSelected.concat(event));
    } else {
      clCostSelected.splice(index, 1);
      setCostSelected(clCostSelected);
    }
  };

  const applyCost = () => {
    router.query.costs = costSelected.length
      ? JSON.stringify(costSelected.map(cost => cost.length))
      : [];
    handleClose();
    router.push(router);
  };

  const handleSearchCuisine = (event: any) => {
    debounceFn(event.target.value);
    setCuisineKeyword(event.target.value);
    setOffsetCuisine(0);
  };

  const handleDebounceFn = (inputValue: string) => {
    handleGetCuisines(inputValue);
  };

  const debounceFn = useRef(
    debounce(nextValue => handleDebounceFn(nextValue), 500),
  ).current;

  const handleGetValueFromQuery = () => {
    const dietariesId = JSON.parse(get(router, 'query.dietaries', '[]'));
    const cuisinesId = JSON.parse(get(router, 'query.cuisines', '[]'));

    setDietarySelected(
      listDietary.filter(item => dietariesId.includes(item.id)),
    );
    !cuisinesId.length && setCuisineSelected([]);
    setCostSelected(
      JSON.parse(get(router, 'query.costs', '[]')).map(
        (item: number) => LIST_COST[item - 1],
      ),
    );
    setTypeSelected(JSON.parse(get(router, 'query.types', '[]')));
    setDietaryKeyword('');
    setCuisineKeyword('');
  };

  useEffect(() => {
    handleGetCuisines();
  }, []);

  useEffect(() => {
    setListDietary(get(dietaryState, 'list', []));
  }, [dietaryState]);

  useEffect(() => {
    listCuisineDefault.length && setCuisineSelected(listCuisineDefault);
  }, [listCuisineDefault]);

  return (
    <Container>
      <ListFilterContainer>
        <DropDown
          apply={applyCuisine}
          close={handleGetValueFromQuery}
          name="Cuisine"
          isBlur
        >
          <GroupMenu>
            <>
              <InputSearch
                placeholder="Cuisine"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: 'var(--fairy-floss-pink-2)',
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                value={cuisineKeyword}
                onChange={handleSearchCuisine}
              />
              <ScrollBar maxHeight={cuisineSelected.length === listCuisine.length ? 320 : 150}>
                {cuisineSelected.map((cuisine: Cuisine) => (
                  <CommonCheckBox
                    key={cuisine.id}
                    checked={cuisineSelected.some(
                      item => item.id === cuisine.id,
                    )}
                    onChange={() => handleSelectCuisine(cuisine)}
                    text={
                      <LabelCheckBox>
                        <b>{cuisine.name}</b>
                      </LabelCheckBox>
                    }
                  />
                ))}
              </ScrollBar>
              {cuisineSelected.length ? (
                <Box position="relative">
                  <BlurBox />
                  <DividerSpace />
                </Box>
              ) : null}
              <ScrollBar maxHeight={!cuisineSelected.length ? 320 : 190} onScroll={onScroll} ref={listInnerRef}>
                {listCuisine &&
                  listCuisine?.map?.((cuisine: Cuisine) =>
                    !cuisineSelected.some(item => item.id === cuisine.id) ? (
                      <CommonCheckBox
                        key={cuisine.id}
                        checked={cuisineSelected.some(
                          item => item.id === cuisine.id,
                        )}
                        onChange={() => handleSelectCuisine(cuisine)}
                        text={<LabelCheckBox>{cuisine.name}</LabelCheckBox>}
                      />
                    ) : null,
                  )}
              </ScrollBar>
            </>
          </GroupMenu>
        </DropDown>
        <DropDown
          apply={applyDietary}
          close={handleGetValueFromQuery}
          name="Dietary requirements"
          isBlur
        >
          <GroupMenu>
            <>
              <InputSearch
                placeholder="Dietary requirement"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: 'var(--fairy-floss-pink-2)',
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                value={dietaryKeyword}
                onChange={e => setDietaryKeyword(e.target.value)}
              />
              <ScrollBar maxHeight={dietarySelected.length === listDietary.length ? 320 : 150}>
                {dietarySelected.map((dietary: IDietary) => (
                  <CommonCheckBox
                    key={dietary.id}
                    checked={dietarySelected.some(item => item.id === dietary.id)}
                    onChange={() => handleSelectDietary(dietary)}
                    text={
                      <LabelCheckBox>
                        <b>{dietary.name}</b>
                      </LabelCheckBox>
                    }
                  />
                ))}
              </ScrollBar>
              {(dietarySelected.length && dietarySelected.length !== listDietary.length) ? (
                <Box position="relative">
                  <BlurBox />
                  <DividerSpace />
                </Box>
              ) : null}
              <ScrollBar maxHeight={!dietarySelected.length ? 320 : 190}>
                {listDietary &&
                  listDietary.map((dietary: IDietary) =>
                    !dietarySelected.some(item => item.id === dietary.id) &&
                    dietary.name
                      .toLocaleLowerCase()
                      .includes(dietaryKeyword.toLocaleLowerCase()) ? (
                      <CommonCheckBox
                        key={dietary.id}
                        checked={dietarySelected.some(
                          item => item.id === dietary.id,
                        )}
                        onChange={() => handleSelectDietary(dietary)}
                        text={<LabelCheckBox>{dietary.name}</LabelCheckBox>}
                      />
                    ) : null,
                  )}
              </ScrollBar>
            </>
          </GroupMenu>
        </DropDown>
        <DesktopOnly>
          <DropDown
            apply={applyType}
            close={handleGetValueFromQuery}
            name="Type"
          >
            <GroupMenu>
              <>
                <ScrollBar>
                  {listType.map((type: iType) => (
                    <CommonCheckBox
                      key={type.id}
                      checked={typeSelected.some(item => item === type.id)}
                      onChange={() => handleSelectType(type.id)}
                      text={
                        <LabelCheckBox>
                          {typeSelected.some(item => item === type.id) ? (
                            <b>{type.name}</b>
                          ) : (
                            type.name
                          )}
                        </LabelCheckBox>
                      }
                    />
                  ))}
                </ScrollBar>
              </>
            </GroupMenu>
          </DropDown>
        </DesktopOnly>
        <DesktopOnly>
          <DropDown
            apply={applyCost}
            close={handleGetValueFromQuery}
            name="Cost"
          >
            <GroupMenu>
              {LIST_COST.map((cost: string, index: number) => (
                <CommonCheckBox
                  key={index}
                  checked={costSelected.some(item => item === cost)}
                  onChange={() => handleSelectCost(cost)}
                  text={
                    <LabelCheckBox>
                      {costSelected.some(item => item === cost) ? (
                        <b>{cost}</b>
                      ) : (
                        cost
                      )}
                    </LabelCheckBox>
                  }
                />
              ))}
            </GroupMenu>
          </DropDown>
        </DesktopOnly>
        <MobileOnly>
          <ShowMoreIcon onClick={handleClick} />
          <Menu
            id="show-more-filter"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {!filterMobile ? (
              <>
                <StyledMenuItem
                  onClick={() => setFilterMobile('Type')}
                  className="title-font"
                >
                  Type
                </StyledMenuItem>
                <StyledMenuItem
                  onClick={() => setFilterMobile('Cost')}
                  className="title-font"
                >
                  Cost
                </StyledMenuItem>
              </>
            ) : (
              <RenderMenuItem
                name={filterMobile}
                apply={filterMobile === 'Type' ? applyType : applyCost}
              >
                <GroupMenu>
                  {filterMobile === 'Type'
                    ? listType.map((type: iType) => (
                        <CommonCheckBox
                          key={type.id}
                          checked={typeSelected.some(item => item === type.id)}
                          onChange={() => handleSelectType(type.id)}
                          text={
                            <LabelCheckBox>
                              {typeSelected.some(item => item === type.id) ? (
                                <b>{type.name}</b>
                              ) : (
                                type.name
                              )}
                            </LabelCheckBox>
                          }
                        />
                      ))
                    : LIST_COST.map((cost: string, index: number) => (
                        <CommonCheckBox
                          key={index}
                          checked={costSelected.some(item => item === cost)}
                          onChange={() => handleSelectCost(cost)}
                          text={
                            <LabelCheckBox>
                              {costSelected.some(item => item === cost) ? (
                                <b>{cost}</b>
                              ) : (
                                cost
                              )}
                            </LabelCheckBox>
                          }
                        />
                      ))}
                </GroupMenu>
              </RenderMenuItem>
            )}
          </Menu>
        </MobileOnly>
      </ListFilterContainer>
    </Container>
  );
};

export const FilterRestaurant: FC<Props> = ({
  listCuisineDefault,
  listType,
}) => {
  return (
    <FilterContainer>
      <ListFilter listType={listType} listCuisineDefault={listCuisineDefault} />
    </FilterContainer>
  );
};

export default FilterRestaurant;
