import { HEADER_HEIGHT, MobileMenu, Wrapper } from './styles';
import { Container, Menu } from '@mui/material';
import Image from 'next/image';
import { scrollToId } from 'utils';
import { useAppSelector } from '@stateManager/stores/appStore';
import RestaurantDetail from './RestaurantDetail';
import { MenuIcon } from 'utils/icons';
import { useRef, useState } from 'react';

const menus = [
  {
    name: 'Menu',
    id: 'menu',
  },
  {
    name: 'Menu',
    id: 'gallery',
  },
  {
    name: 'Gallery',
    id: 'gallery',
  },
  {
    name: 'Opening Hours',
    id: 'location',
  },
  {
    name: 'Contacts',
    id: 'contacts',
  },
];

export default function Template1() {
  const restaurantDetail = useAppSelector(
    appState => appState.restaurant.restaurantDetail,
  );
  const mobileMenuButton = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleShowMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const menuElement = (
    <ul className="menus">
      {menus.map(x => (
        <li
          key={x.id}
          onClick={() => {
            scrollToId(x.id, HEADER_HEIGHT);
            handleCloseMenu();
          }}
        >
          {x.name}
        </li>
      ))}
    </ul>
  );

  return (
    <Wrapper>
      <div className="header">
        <Container>
          <div className="logo_wrap">
            {restaurantDetail.logo ? (
              <Image src={restaurantDetail.logo} width={65} height={65} />
            ) : (
              <div className="logo">LOGO</div>
            )}
          </div>

          <div className="desktop_menu">{menuElement}</div>
          <div
            className="mobile_menu"
            ref={mobileMenuButton}
            onClick={handleShowMenu}
          >
            <MenuIcon />
          </div>
        </Container>
      </div>

      <div className="banner">
        <div className="left_side">
          <div className="detail">
            <div className="title">Welcome to {restaurantDetail.name}</div>
            <div className="decs">{restaurantDetail.description}</div>
          </div>
        </div>
        <div className="right_side">
          {restaurantDetail.bannerImage && (
            <Image
              src={restaurantDetail.bannerImage}
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
      </div>

      <RestaurantDetail />

      <Menu
        id="basic-menu"
        anchorEl={mobileMenuButton.current}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MobileMenu>{menuElement}</MobileMenu>
      </Menu>
    </Wrapper>
  );
}
