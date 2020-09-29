/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components'

export const ScrollBar = css`
   ::-webkit-scrollbar {
      width: 0.625rem;
      background-color: transparent;
      border-top: 0.625rem solid transparent;
      border-bottom: 0.625rem solid transparent;
   }

   ::-webkit-scrollbar:hover {
      background-color: rgba(0, 0, 0, 0.05);
   }

   ::-webkit-scrollbar-thumb:vertical {
      background: ${({theme})=> theme.colors.bkgScrollbar};
      border-radius: 6.25rem;
      background-clip: padding-box;
      border: 0.125rem solid transparent;
      min-height: 0.625rem;
   }

   ::-webkit-scrollbar-thumb:vertical:active {
      background: ${({theme})=> theme.colors.bkgScrollbar};
      -webkit-border-radius: 6.25rem;
   }
   ::-webkit-scrollbar-thumb:vertical:hover {
      background: ${({theme})=> theme.colors.bkgScrollbar};
      -webkit-border-radius: 6.25rem;
      width: 0.625rem;
   }

   .horizontal-scroll::-webkit-scrollbar:vertical {
      width: 0.4375rem;
   }

   .horizontal-scroll::-webkit-scrollbar:horizontal {
      height: 0.4375rem;
   }

   .horizontal-scroll::-webkit-scrollbar-thumb {
      background: ${({theme})=> theme.colors.bkgScrollbar};
      border-radius: 0.4375rem;
   }

   .horizontal-scroll::-webkit-scrollbar-track {
      border-radius: 0.75rem;
      padding: 0.0625rem;
   }

   .horizontal-scroll::-webkit-scrollbar-thumb:hover {
      background: ${({theme})=> theme.colors.bkgScrollbar};
   }
`
