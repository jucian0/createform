import { createTheme } from "@nextui-org/react"

export const darkTheme = createTheme({
    type: 'dark',
    theme: {
      colors: {
        link: '#58C5B7',
        codeLight:"rgb(27, 38, 44)",
        code: '#58C5B7',
        primary: '#58C5B7'


      },
      space: {},
      fonts: {}
    }
  })

  export const lightTheme = createTheme({
    type: 'light',
    theme: {
      colors: {
        link: '#58C5B7',
        codeLight:"rgb(237, 242, 244)",
        code: '#58C5B7',
        primary: '#58C5B7'


      },
      space: {},
      fonts: {}
    }
  })