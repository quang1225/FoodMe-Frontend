import React from 'react';
import { Box } from '@mui/material';
import {
  AppLogoShort,
  InstagramSocialIcon,
  FacebookSocialIcon,
  LinkedInSocialIcon,
} from 'utils/icons';
import {
  FooterContainer,
  FooterContent,
  FooterSocials,
  Item,
  ListContent,
  ContentItem,
  CopyRight,
} from './styles';
import { Container } from '@mui/system';
import Link from 'next/link';

const SocialContainer = ({}) => {
  return (
    <FooterSocials>
      <Item>
        <Link
          href="https://www.instagram.com/food.me.official/"
          prefetch={false}
        >
          <a target="_blank">
            <InstagramSocialIcon />
          </a>
        </Link>
      </Item>
      <Item>
        <Link
          href="https://www.facebook.com/FoodMe-104261778759188"
          prefetch={false}
        >
          <a target="_blank">
            <FacebookSocialIcon />
          </a>
        </Link>
      </Item>
      <Item>
        <Link href="https://www.linkedin.com/company/foodme" prefetch={false}>
          <a target="_blank">
            <LinkedInSocialIcon />
          </a>
        </Link>
      </Item>
    </FooterSocials>
  );
};

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--leafy-green-1)',
      }}
    >
      <Container>
        <FooterContainer>
          <FooterContent sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <AppLogoShort style={{ width: '63px', height: '34px' }} />
              <Box sx={{ display: { sm: 'block', md: 'none' } }}>
                <SocialContainer />
              </Box>
            </Box>
            <ListContent>
              <Box sx={{ display: 'flex' }}>
                <ContentItem>
                  <Link href="/privacy-policy">
                    <a>Privacy</a>
                  </Link>
                </ContentItem>
                <ContentItem>
                  <Link href="/terms-of-use">
                    <a>Terms of Use</a>
                  </Link>
                </ContentItem>
              </Box>
              <CopyRight>
                Copyright © 2022 FoodMe Pty Ltd. All rights reserved.
              </CopyRight>
            </ListContent>
          </FooterContent>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <SocialContainer />
          </Box>
        </FooterContainer>
      </Container>
    </Box>
  );
};
