import { createGlobalStyle } from 'styled-components';
import ChosunLo from '../../assets/fonts/ChosunLo.woff';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'ChosunLo';
        src: url(${ChosunLo}) format('woff');
        /* src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunLo.woff') format('woff'); */
        font-weight: normal;
        font-style: normal;
    }

    body {
        background-color: ${(props) => props.theme.bg1};
    }

    
`;

export const theme = {
  bg1: '#f8f9fa',
  bg2: '#ffffff',
};
