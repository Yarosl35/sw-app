import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const HeaderBox = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h1 {
    font-family: "Inter Thin";
    margin-bottom: 0;
  }
`;

export const ClearButton = styled(Button)`
  color: #ff2a24c7;
  border: 1px solid #ff2a24c7;
`;
