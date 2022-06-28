import CommonButton from '@components/shared/CommonButton';
import Icon from '@components/shared/Icons';
import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';

interface FilterItemProps {
  dietary: any;
  actived: boolean;
}

const SyledCommonButton = styled(CommonButton)`
  min-width: unset;
  padding: 10px 14px;
`;

const FilterItem = ({ dietary, actived }: FilterItemProps) => {
  return (
    <Grid container direction="column" alignItems="center">
      <SyledCommonButton
        key={dietary.id}
        background={actived ? '#076C4F' : '#00A175'}
        sx={{
          width: '100%',
        }}
        height={46}
      >
        <Grid container gap="10px" alignItems="center">
          <Icon size={26} icon={dietary.name} color="var(--neutral-7)" />
          <Typography
            sx={{
              display: {
                md: 'block',
                xs: 'none',
              },
              color: '#fff',
              fontSize: '14px',
              textTransform: 'none',
            }}
            component="span"
            className="title-font"
          >
            <b>{dietary.name}</b> (<b>{dietary.count}</b>)
          </Typography>
        </Grid>
      </SyledCommonButton>
      <Grid
        sx={{
          display: {
            md: 'none',
          },
        }}
      >
        <Typography
          color="var(--leafy-green-2)"
          fontSize="14px"
          lineHeight="20px"
          textTransform="none"
          textAlign="center"
          component="span"
          className="title-font"
        >
          {dietary.alias}
        </Typography>
        <Typography
          color="var(--leafy-green-2)"
          sx={{
            fontSize: '14px',
            lineHeight: '20px',
            marginLeft: '5px',
          }}
          component="span"
          className="title-font"
        >
          ({dietary.count})
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FilterItem;
