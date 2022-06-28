import { Container, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SwiperDialog, Wrapper, StyledSwiper } from './styles';
import Image from 'next/image';
import { MOBILE_BREAKPOINT } from 'utils/constant';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@stateManager/stores/appStore';
import { getGallery } from '@services/restaurants/restaurantsApi';
import { getFullImageUrl } from 'utils';

const AboutRestaurant = () => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const [imageList, setImageList] = useState<any>([]);
  const [imageIndex, setImageIndex] = useState(-1);
  const restaurantDetail = useAppSelector(
    appState => appState.restaurant.restaurantDetail,
  );

  useEffect(() => {
    async function getImage() {
      const result = await getGallery(restaurantDetail.id);
      if (result) {
        setImageList(result);
      }
    }
    if (restaurantDetail.id) {
      getImage();
    }
  }, [restaurantDetail]);

  return (
    <Wrapper>
      <Box
        id="gallery"
        sx={{
          borderTop: '1px solid #E5E5E5',
          paddingTop: '30px',
          paddingBottom: '30px',
        }}
      >
        <Container>
          <Typography
            fontSize={{
              md: 38,
              xs: 30,
            }}
            sx={{
              fontWeight: 700,
              lineHeight: '44px',
            }}
            className="title-font"
          >
            About {restaurantDetail.name}
          </Typography>
          <Typography
            sx={{
              marginTop: {
                xs: '18px',
                sm: '24px',
              },
              marginBottom: '32px',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '28px',
            }}
          >
            {restaurantDetail.description}
          </Typography>

          {!!imageList && !!imageList.length && (
            <Box sx={{ pb: { xs: '48px', md: '25px' }, overflow: 'hidden' }}>
              <Swiper
                spaceBetween={12}
                slidesPerView={isMobile ? 1 : 5}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={isMobile}
                navigation={!isMobile}
                modules={[Autoplay, Pagination, Navigation]}
                onClick={(swiper: any) => {
                  setImageIndex(swiper.clickedIndex);
                }}
              >
                {imageList.map((image: any, index: number) => (
                  <SwiperSlide
                    key={'image_' + index}
                    onClick={() => setImageIndex(index)}
                  >
                    <Box width={isMobile ? 328 : 250} height={isMobile ? 259 : 197}>
                      {
                        image.image.includes('.pdf') ? (
                          <iframe
                            frameBorder="0"
                            scrolling="no"
                            src={getFullImageUrl(image.image)}
                            style={{ 
                              pointerEvents: `${isMobile ? 'unset' : 'none'}`, 
                              width: '100%', 
                              height: '100%', 
                              border: 'none', 
                            }}
                          >
                          </iframe>
                        ) : (
                          <Image
                            width={isMobile ? 328 : 250}
                            height={isMobile ? 259 : 197}
                            src={getFullImageUrl(image.image)}
                            layout="fill"
                            objectFit="cover"
                          />
                        )
                      }
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}
        </Container>
      </Box>

      {!!imageList && !!imageList.length && !isMobile && (
        <SwiperDialog
          onClose={() => setImageIndex(-1)}
          open={imageIndex >= 0 && !isMobile}
        >
          <StyledSwiper
            slidesPerView={1}
            pagination={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            initialSlide={imageIndex}
          >
            {imageList.map((image: any, index: number) => (
              <SwiperSlide
                key={'image_' + index}
                onClick={() => setImageIndex(index)}
              >
                {
                  image.image.includes('.pdf') ? (
                    <Box width={1200} height={800}>
                      <iframe
                        src={getFullImageUrl(image.image)} width="100%" height="100%"
                        style={{ backgroundColor: '#FFFFFF' }} frameBorder={0}>
                      </iframe>
                    </Box>
                  ) : (
                    <Image
                      width={1200}
                      height={600}
                      src={getFullImageUrl(image.image)}
                      objectFit="cover"
                    />
                  )
                }
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </SwiperDialog>
      )}
    </Wrapper>
  );
};

export default AboutRestaurant;
