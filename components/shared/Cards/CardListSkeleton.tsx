import React from 'react';

import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/system';

const SkeletonCardContainer = styled(Box)(() => ({
  background: '#FFFFFF',
  boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.14)',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  position: 'relative',
  marginBottom: '28px',
}));

export const CardListSkeleton = ({}) => {
  return (
    <SkeletonCardContainer>
      <Skeleton variant="rectangular" width={245} height={245} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flex: 1,
          padding: '24px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minWidth: '280px',
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
              <Skeleton variant="rectangular" width={80} height={15} />
              <Skeleton
                sx={{ ml: 2 }}
                variant="rectangular"
                width={60}
                height={15}
              />
            </Box>
          </Box>
          <Skeleton
            variant="rectangular"
            width={163}
            height={42}
            sx={{ borderRadius: '100px' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Skeleton variant="rectangular" width={115} height={20} />
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '14px' }}>
            {new Array(5).fill('').map((item, index) => (
              <Box sx={{ mt: 2, textAlign: 'center' }} key={index}>
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
        <Box>
          <Skeleton
            sx={{ mb: 2, borderRadius: '100px' }}
            variant="rectangular"
            width={170}
            height={42}
          />
          <Skeleton
            sx={{ borderRadius: '100px' }}
            variant="rectangular"
            width={170}
            height={42}
          />
        </Box>
      </Box>
    </SkeletonCardContainer>
  );
};

export default CardListSkeleton;
