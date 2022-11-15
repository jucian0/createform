import { darkTheme, lightTheme } from "./../styles/theme";
import { Demo } from "./../demo";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Engrafia } from "engrafia";

function App({ Component, pageProps }) {
  return (
    <Engrafia
      mdxComponents={{ Demo }}
      themes={{
        light: lightTheme,
        dark: darkTheme,
      }}
    >
      <Component {...pageProps} />
    </Engrafia>
  );
}

export default App;
