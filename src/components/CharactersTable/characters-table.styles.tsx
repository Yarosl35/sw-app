import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

export const Container = styled(Paper)`
  padding: 15px;
`;

export const HeartIconButton = styled(IconButton)`
  left: -0.1rem;

  #Glyphs {
    g {
      fill: #ff2a24;
    }
  }
`;
