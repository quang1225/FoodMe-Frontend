import styled from 'styled-components';
import { Container } from '@mui/system';

export const ContainerPage = styled(Container)`
  padding-top: 40px;
  margin-bottom: 45px;
`;

export const TitlePage = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
  line-height: 50px;
  color: var(--leafy-green-2);
  margin-bottom: 41px;
`;

export const TitleBlock = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: var(--neutral-black-1);
  margin-bottom: 15px;
`;

export const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: var(--neutral-black-1);
  margin-bottom: 16px;

  ul {
    list-style: none;
  }

  ul {
    li {
      &::before {
        content: '•';
        color: var(--neutral-black-1);
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
      }
    }
  }

  ul,
  ol {
    padding-left: 30px;

    li {
      margin-bottom: 13px;
    }
  }

  a {
    color: #0fa9ff;
  }
`;

export const Block = styled.div`
  margin-bottom: 55px;
`;
