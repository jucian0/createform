import { Html, Head, Main, NextScript } from 'next/document';
import { GlobalStyles } from 'engrafia';
import { CssBaseline } from '@nextui-org/react';

export default function Document() {
  return (
    <Html>
      <Head>
        {CssBaseline.flush()}
        {GlobalStyles()}
        <link href="https://css.gg/link.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
