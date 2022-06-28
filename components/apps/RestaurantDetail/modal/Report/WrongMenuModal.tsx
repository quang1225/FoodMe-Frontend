import CommonButton from '@components/shared/CommonButton';
import {
  Dialog,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { MenuItemType } from '@services/restaurants/restaurantDetailApi.type';
import flattenDeep from 'lodash/flattenDeep';
import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchIcon } from 'utils/icons';
import CommonCheckBox from '@components/shared/CommonCheckBox';

const Button = styled(CommonButton)`
  padding: 12px 35px !important;
  font-size: 16px;
`;

const InputSearch = styled(TextField)`
  margin: 15px 0 15px 0;
  z-index: 2;
  & input {
    padding: 10px 14px 10px 5px;
    font-size: 14px;
  }
`;

const MenuContainer = styled.div`
  display: block;
  padding: 25px 34px;
  &:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }
  &:first-child {
    padding-top: 12px;
  }
`;

const ScrollBar = styled.div`
  overflow: auto;
  margin: 0 -34px;
  max-height: 412px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 100px;
  }
`;

const EllipsisLine = styled(Typography)<{ line: number }>`
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.line};
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  line-height: 22px;
  color: #111111;
`;

const BlurBox = styled.div`
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  position: absolute;
  top: -64px;
  height: 64px;
  width: 100%;
  left: 0;
`;

interface Props {
  isOpen: boolean;
  handleClose: any;
  menu: any;
  handleSubmit: any;
}

export function WrongMenuModal({
  isOpen,
  handleClose,
  menu,
  handleSubmit,
}: Props) {
  const [searchText, setText] = useState('');
  const [selectedError, setError] = useState<any>([]);
  const [itemList, setItemList] = useState<any>([]);
  const [allMenu, setAllMenu] = useState<any>([]);

  const onClose = () => {
    setError([]);
    handleClose();
  };

  useEffect(() => {
    setError([]);
  }, [isOpen]);

  useEffect(() => {
    let items: any[] = [];
    if (!menu && !menu.length) return;
    menu.forEach((m: any) => {
      if (m.menuSections) {
        items = items.concat(m.menuSections);
      }
    });
    setItemList(flattenDeep(items));
    setAllMenu(
      flattenDeep(items.map(item => item.menuItems)).map(item => item.id),
    );
    return () => {
      setError([]);
    };
  }, [menu]);

  const handleSelectMenu = (event: boolean, id: number) => {
    let clListError = cloneDeep(selectedError);
    if (event) {
      clListError = clListError.concat(id);
    } else {
      clListError = clListError.filter((item: any) => item !== id);
    }
    setError(clListError);
  };

  const onSubmit = () => {
    handleSubmit(selectedError);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          maxWidth: '454px',
          padding: '20px 34px 23px 34px',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box>
        <Typography
          className="title-font"
          color="var(--orange-zest-2)"
          fontWeight={700}
          fontSize={30}
        >
          Thanks for pointing this out!
        </Typography>
        <Box
          sx={{
            overflow: 'visible',
          }}
        >
          <Typography
            fontSize={14}
            color="var(--neutral-black-1)"
            mb="20px"
            mt="20px"
          >
            Could you tell us which items specifically aren’t correct? Select
            all that apply
          </Typography>
          <CommonCheckBox
            checked={allMenu.length === selectedError.length}
            onChange={(e: any) => {
              setError(e.target.checked ? allMenu : []);
            }}
            text={
              <Typography
                fontSize={14}
                color={
                  allMenu.length === selectedError.length
                    ? 'var(--leafy-green-2)'
                    : 'var(--neutral-black-1)'
                }
                fontWeight={allMenu.length === selectedError.length ? 700 : 400}
              >
                The whole menu is wrong
              </Typography>
            }
          />
          <InputSearch
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    style={{
                      width: '16px',
                      cursor: 'pointer',
                      color: 'var(--fairy-floss-pink-2)',
                    }}
                  />
                </InputAdornment>
              ),
            }}
            placeholder="Search menu item"
            onChange={e => setText(e.target.value)}
          />
        </Box>
        <Box>
          <ScrollBar>
            {itemList
              .filter((section: any) =>
                section.menuItems.some((item: any) =>
                  item.name.includes(searchText),
                ),
              )
              .map((section: any) => (
                <MenuContainer key={section.id}>
                  <Typography
                    mb="14px"
                    fontSize={20}
                    className="title-font"
                    color="var(--leafy-green-2)"
                  >
                    {section.name}
                  </Typography>
                  <Box display="flex" flexDirection="column" gap="15px">
                    {(section?.menuItems || []).map(
                      (menuItem: MenuItemType) => (
                        <Box
                          key={menuItem.id}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <CommonCheckBox
                            checked={selectedError.includes(menuItem.id)}
                            onChange={(e: any) =>
                              handleSelectMenu(e.target.checked, menuItem.id)
                            }
                            text={
                              <Box>
                                <EllipsisLine
                                  line={1}
                                  fontSize={14}
                                  color={
                                    selectedError.includes(menuItem.id)
                                      ? 'var(--leafy-green-2)'
                                      : 'var(--neutral-black-1)'
                                  }
                                  fontWeight={700}
                                >
                                  {menuItem.name}
                                </EllipsisLine>
                                <EllipsisLine
                                  line={2}
                                  fontSize={14}
                                  color={
                                    selectedError.includes(menuItem.id)
                                      ? 'var(--leafy-green-2)'
                                      : 'var(--neutral-black-1)'
                                  }
                                >
                                  {menuItem.description}
                                </EllipsisLine>
                              </Box>
                            }
                          />
                          {menuItem.menuItemDietaries.length ? (
                            <Box
                              sx={{
                                minWidth:
                                  menuItem.menuItemDietaries.length >= 2
                                    ? '50%'
                                    : 'unset',
                                textAlign: 'right',
                                position: 'relative',
                                top: 5,
                              }}
                            >
                              {menuItem.menuItemDietaries.map(
                                (itemDietary: any) => (
                                  <Box
                                    key={itemDietary.id}
                                    display="inline-block"
                                    ml={1}
                                  >
                                    <CommonButton
                                      style={{
                                        padding: '0 12px',
                                        width: 'max-content',
                                        marginBottom: '5px',
                                      }}
                                      height={30}
                                      background="var(--neutral-7)"
                                      $borderColor="var(--leafy-green-2)"
                                    >
                                      {itemDietary?.dietary?.name}
                                    </CommonButton>
                                  </Box>
                                ),
                              )}
                            </Box>
                          ) : null}
                        </Box>
                      ),
                    )}
                  </Box>
                </MenuContainer>
              ))}
          </ScrollBar>
        </Box>
      </Box>
      <Grid
        mt={3}
        sx={{ position: 'relative' }}
        container
        justifyContent="space-between"
      >
        <BlurBox />
        <Button
          onClick={onClose}
          $textColor="var(--neutral-7)"
          background="var( --orange-zest-2)"
          height={46}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          $textColor="var(--neutral-7)"
          background="var(--leafy-green-2)"
          height={46}
          disabled={!selectedError.length}
        >
          Submit
        </Button>
      </Grid>
    </Dialog>
  );
}
