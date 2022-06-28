import React from 'react';

import { Box, Skeleton, Divider } from '@mui/material';
import { styled } from '@mui/system';

const SkeletonCardContainer = styled(Box)(() => ({
  background: '#FFFFFF',
  boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.14)',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'grid',
  flexDirection: 'column',
  position: 'relative',
  marginBottom: '28px',
}));

export const CardGridSkeleton = ({}) => {
  return (
    <SkeletonCardContainer>
      <Skeleton variant="rectangular" height={233} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          padding: '26px',
        }}
      >
        <Box>
          <Skeleton variant="rectangular" width={280} height={35} />
          <Skeleton
            sx={{ mt: '18px', mb: '17px' }}
            variant="rectangular"
            width={280}
            height={15}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Skeleton variant="rectangular" width={114} height={15} />
            <Skeleton
              sx={{ ml: 2 }}
              variant="rectangular"
              width={78}
              height={15}
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          padding: '24px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Skeleton
              sx={{ mb: '10px', borderRadius: '100px' }}
              variant="rectangular"
              height={46}
            />
            <Skeleton
              sx={{ mb: '10px', borderRadius: '100px' }}
              variant="rectangular"
              height={46}
            />
            <Skeleton
              sx={{ mb: '10px', borderRadius: '100px' }}
              variant="rectangular"
              height={46}
            />
          </Box>
          <Skeleton variant="rectangular" width={151} height={20} />
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '14px' }}>
            {new Array(4).fill('').map((item, index) => (
              <Box sx={{ mt: 2 }} key={index}>
                <Skeleton
                  sx={{ mb: '9px', borderRadius: '100px' }}
                  variant="circular"
                  width={50}
                  height={42}
                />
                <Skeleton variant="rectangular" width={50} height={15} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </SkeletonCardContainer>
  );
};

export default CardGridSkeleton;
