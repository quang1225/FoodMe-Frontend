import { Box, Fade, Popper, Typography } from '@mui/material';
import { useAppSelector } from '@stateManager/stores/appStore';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  coordinates: any;
}

const Map = ({ coordinates }: Props) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const restaurantDetail = useAppSelector(
    appState => appState.restaurant.restaurantDetail,
  );
  const { name, bannerImage } = restaurantDetail;
  const { googleMaps } = useAppSelector(appState => appState.common);

  const handleClick = (event: any) => {
    setAnchorEl(event.target);
    setOpen(previousOpen => !previousOpen);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  useEffect(() => {
    if (!googleMaps?.maps?.Map || isEmpty(coordinates)) return;

    const map = new googleMaps.maps.Map(
      document.getElementById('restaurant_map') as HTMLElement,
      {
        zoom: 16,
        center: coordinates,
      },
    );

    const marker = new googleMaps.maps.Marker({
      position: coordinates,
      map,
    });

    marker.addListener('click', (e: any) => {
      handleClick(e.domEvent);
    });

    return () => {
      googleMaps.maps.event.clearInstanceListeners(marker);
    };
  }, [googleMaps, coordinates]);

  return (
    <>
      <div id="restaurant_map" style={{ width: '100%', height: '100%' }} />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={'top'}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}
              width={250}
            >
              <Image
                objectFit="cover"
                alt="banner"
                width="100%"
                height={100}
                src={
                  bannerImage ||
                  'https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg'
                }
              />
              <Typography fontSize={18} fontWeight={500}>
                {name || ''}
              </Typography>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default Map;
