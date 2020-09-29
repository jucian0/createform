/* eslint-disable import/prefer-default-export */
import { createGlobalStyle } from 'styled-components'
import { ScrollBar } from '../scrollbar'

export const lightTheme = {
  colors: {
    primary: '#2ec4b6',
    secondary: '#3a506b',
    dark: '#0b132b',
    border: '#edf2f4',
    red: '#e71d36',
    background: '#FFFFFF',
    textColor: '#3a506b',
    bkgPre: '#edf2f4',
    colorPre: '#edf2f4',
    bkgScrollbar: '#3a506b',
  },
}

export const darkTheme = {
  colors: {
    primary: '#2ec4b6',
    secondary: '#3a506b',
    dark: '#0b132b',
    border: '#1b262c',
    red: '#e71d36',
    background: '#0b132b',
    textColor: '#edf2f4',
    bkgPre: '#3a506b',
    colorPre: '#edf2f4',
    bkgScrollbar: '#3a506b',
  },
}

export const GlobalStyle = createGlobalStyle`
   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap');
   @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');
   *{
      margin:0;
      font-size:16px;
      font-family: 'Roboto', sans-serif;
      box-sizing: border-box;
      ${ScrollBar};
      outline:none;
   }
   html, body {
      width: 100%;
      height: 100%;
      background-color:${({ theme }) => theme.colors.background};
   }

   pre, code{
      font-family: 'Fira Code', monospace;
      font-weight: 300;
   }


   table, ul, li{
      color: ${({ theme }) => theme.colors.textColor};
   }

   .__json-pretty__{
      line-height:1.3;
      color:#bd93f9;
      background:${({ theme }) => theme.colors.dark};
      overflow:auto;
      margin:10px;
      padding:10px;
      border-radius:5px;
      border:1px solid ${({ theme }) => theme.colors.border};
   }
   .__json-pretty__ .__json-key__{
      color:#f8f8f2
   }
   .__json-pretty__ .__json-value__{
      color:#bd93f9
   }
   .__json-pretty__ .__json-string__{
      color:#f1fa8c
   }
   .__json-pretty__ .__json-boolean__{
      color:#8be9fd
   }
   .__json-pretty-error__{
      line-height:1.3;
      color:#66d9ef;
      background:#272822;
      overflow:auto
   }
`
