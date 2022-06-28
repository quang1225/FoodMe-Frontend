import { Typography } from '@mui/material';
import { useAppSelector } from '@stateManager/stores/appStore';
import Link from 'next/link';
import {
  Headline,
  RestaurantContainer,
  List,
  Spacing,
  SkeletonStyle,
} from './styles';
import CommonButton from '@components/shared/CommonButton';
import Icon from '@components/shared/Icons';
import styled from 'styled-components';
import { get, uniq } from 'lodash';
import { IDietary } from '@services/dietary/dietaryApi.types';
export interface Props {
  data: any;
  isLoading?: boolean;
  keyword: string;
}

const ButtonDieatry = styled(CommonButton)`
  min-height: 58px;
  padding: 10px 18px;
  gap: 10px;
`;

export const DietaryRequirements = ({ data, isLoading, keyword }: Props) => {
  const listDietary = data?.dietaries || [];
  const user = useAppSelector(appState => appState.user);

  const createDietaryHref = (dietary: any) => {
    const query = {
      ...user.location,
    } as any;
    if (keyword) query.keyword = keyword;
    query.dietaries = JSON.stringify(
      uniq(
        [dietary.id].concat(
          get(user, 'dietary', []).map((dietary: IDietary) => dietary.id),
        ),
      ),
    );
    return { pathname: 'search-results', query };
  };

  return (
    <RestaurantContainer>
      <Headline className="title-font">Dietary Requirements</Headline>
      <List>
        {isLoading
          ? Array(7)
              .fill('')
              .map((skeleton: string, index: number) => (
                <Spacing key={index}>
                  <SkeletonStyle
                    variant="rectangular"
                    width={150}
                    height={50}
                  />
                </Spacing>
              ))
          : listDietary.map((dietary: any) => (
              <Spacing key={dietary.id}>
                <Link href={createDietaryHref(dietary)} passHref>
                  <a>
                    <ButtonDieatry
                      variant="contained"
                      background="var(--leafy-green-2)"
                    >
                      <Icon
                        size={38}
                        icon={dietary.name}
                        color="var(--neutral-7)"
                      />
                      <Typography
                        fontSize={14}
                        fontWeight={700}
                        color="var(--neutral-7)"
                        className="title-font"
                      >
                        {dietary.name} ({dietary.count})
                      </Typography>
                    </ButtonDieatry>
                  </a>
                </Link>
              </Spacing>
            ))}
      </List>
    </RestaurantContainer>
  );
};

export default DietaryRequirements;
