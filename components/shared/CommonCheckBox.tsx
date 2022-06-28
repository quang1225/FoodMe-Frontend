import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';
import { UncheckedCheckbox, CheckedCheckbox } from 'utils/icons';

interface Props {
  text?: any;
  onClick?: any;
  checked?: boolean;
  className?: string;
  onChange?: any;
  disabled?: boolean;
}

const CustomCheckbox = styled(Checkbox)`
  padding: 11px !important;

  .MuiIconButton-label {
    width: 24px;
  }
`;

const CommonCheckbox = (props: Props) => {
  const { className, onChange, text, disabled, checked } = props;

  return (
    <FormControlLabel
      className={className}
      control={
        <CustomCheckbox
          checked={checked}
          icon={<UncheckedCheckbox />}
          checkedIcon={<CheckedCheckbox />}
          disableRipple
          onChange={onChange}
          disabled={disabled}
        />
      }
      label={text}
    />
  );
};

export default CommonCheckbox;
