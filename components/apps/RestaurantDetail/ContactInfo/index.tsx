import { Box, Container, Typography } from '@mui/material';
import { useAppSelector } from '@stateManager/stores/appStore';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { Fragment } from 'react';
import {
  GlobeIcon,
  FacebookInlinedIcon,
  InstaIcon,
  PhoneIcon,
} from 'utils/icons';
import { DividerStyle, Wrapper } from './styles';

const ContactInfo = () => {
  const restaurantDetail = useAppSelector(
    appState => appState.restaurant.restaurantDetail,
  );
  const { contactPhone, website, contactSocialMediaLinks } =
    restaurantDetail;

  return (
    <Wrapper>
      <Box id="contacts">
        <Container>
          <Typography
            className="title-font"
            fontSize={{
              md: 38,
              xs: 30,
            }}
            fontWeight={700}
            mb={3}
          >
            Contact
          </Typography>

          <div className="contact-infos">
            {contactPhone && (
              <>
                <Box className="contactWrapper">
                  <Box mb={1} fontSize={14} display="flex" alignItems="center">
                    <PhoneIcon />
                    <Typography fontSize={18} ml={1} className="title-font">
                      Phone
                    </Typography>
                  </Box>
                  <Typography className="link-contact" fontSize={16}>
                    {contactPhone}
                  </Typography>
                </Box>
              </>
            )}
            {website && (
              <>
                <DividerStyle orientation="vertical" flexItem />
                <Box className="contactWrapper">
                  <Box mb={1} fontSize={14} display="flex" alignItems="center">
                    <GlobeIcon />
                    <Typography fontSize={18} ml={1} className="title-font">
                      Website
                    </Typography>
                  </Box>
                  <Typography className="link-contact" fontSize={16}>
                    {website}
                  </Typography>
                </Box>
              </>
            )}
            {!isEmpty(contactSocialMediaLinks) &&
              Object.keys(contactSocialMediaLinks).map(
                (item: string, index: number) => {
                  if (!contactSocialMediaLinks[item]) return <></>;
                  const icon =
                    item.toLocaleLowerCase() === 'facebook' ? (
                      <FacebookInlinedIcon />
                    ) : (
                      <InstaIcon />
                    );
                  return (
                    <Fragment key={index}>
                      <DividerStyle orientation="vertical" flexItem />
                      <Box className={`contactWrapper`}>
                        <Box
                          mb={1}
                          fontSize={14}
                          display="flex"
                          alignItems="center"
                        >
                          {icon}
                          <Typography
                            fontSize={18}
                            ml={1}
                            className="title-font"
                          >
                            {item || ''}
                          </Typography>
                        </Box>
                        <Link
                          href={contactSocialMediaLinks[item]}
                          prefetch={false}
                          passHref
                        >
                          <Typography
                            fontSize={16}
                            className="link link-contact"
                          >
                            {contactSocialMediaLinks[item]?.replace(
                              'https://www.',
                              '',
                            ) || ''}
                          </Typography>
                        </Link>
                      </Box>
                    </Fragment>
                  );
                },
              )}
          </div>
        </Container>
      </Box>
    </Wrapper>
  );
};

export default ContactInfo;
