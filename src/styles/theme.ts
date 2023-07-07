import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body { 
        background-color: ${(props) => props.theme.bg1};
    }
`;

export const theme = {
  bg1: '#f8f9fa',
  bg2: '#ffffff',
};
