import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "./globals.css";
import "../public/css/zilla_slab.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      value={{ light: "light", dark: "dark" }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}
