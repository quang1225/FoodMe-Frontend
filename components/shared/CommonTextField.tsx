import { TextField } from '@mui/material';
import styled from 'styled-components';

export default styled(TextField)`
  input {
    background: var(--neutral-7);
  }

  label {
    color: var(--neutral-1);
  }

  fieldset {
    border-color: var(--neutral-3);
  }

  p {
    margin-left: 0;
  }
`;
