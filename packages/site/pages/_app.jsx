/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import MDXProvider from '../components/providers/MDXProvider'
import { lightTheme, GlobalStyle, darkTheme } from '../components/providers/theme'
import {ThemeContext} from '../components/providers/themeContext'
import Default from '../components/layouts/layout'

export default ({ Component, pageProps }) => {

  const [theme, setTheme] = useState( true)

  return(
    <ThemeContext.Provider value={{theme, setTheme:()=>setTheme(!theme)}}>
      <ThemeProvider theme={theme? lightTheme: darkTheme}>
        <MDXProvider>
            <Component {...pageProps} />
        </MDXProvider>
        <GlobalStyle />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
