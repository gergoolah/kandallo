"use client";

import { useTheme as useNextTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";

import { Switch } from "@nextui-org/react";
import classNames from "classnames";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { MoonIcon } from "../components/icons/moon";
import { SunIcon } from "../components/icons/sun";
import { DatabaseView } from "../components/views/database-view";
import { Game } from "../components/views/game-view";
import { NewGameFormView } from "../components/views/new-game-form-view";
import { PeerSitesView } from "../components/views/peer-sites-view";
import Logo from "../public/favicon.svg";
import useGameState from "../utils/hooks/use-game-state";

export default function Home() {
  const { gameState } = useGameState();

  return (
    <Suspense fallback={<div>Something went wrong...</div>}>
      <DocumentHead />
      <main
        className={classNames(
          "flex flex-col p-5 w-full",
          gameState === "config" ? "gap-10" : "gap-1"
        )}
      >
        <div className="flex justify-center items-center flex-col md:!flex-row w-full gap-5">
          <div className="flex flex-col gap-5 items-center">
            <Image
              src={Logo}
              width={gameState === "config" ? "150" : "100"}
              height={gameState === "config" ? "150" : "100"}
              alt="Kandallo_logo"
              className="dark:drop-shadow-[0_0_25px_#dc8a06b1]"
            />
          </div>
          <div className="flex flex-col gap-1 items-center md:items-start md:place-self-end place-self-center">
            <h1
              className={classNames(
                "tracking-widest text-6xl font-bold",
                "dark:text-[#ef8446] text-black",
                "dark:drop-shadow-[0_0_25px_#dc8a06b1]"
              )}
            >
              KANDALLÓ
            </h1>
            <div className="flex flex-row justify-between w-full items-center">
              <h3 className="dark:text-[#ffb657] text-[#313131] tracking-wide text-xl">
                Virtuális jégtörő kártyajáték
              </h3>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
        {gameState === "config" ? (
          <div className="flex px-5 flex-col w-full gap-5">
            <DatabaseView />
            <NewGameFormView />
            <PeerSitesView />
          </div>
        ) : (
          <Game />
        )}
      </main>
      <Toaster
        toastOptions={{
          position: "bottom-center",
          className:
            "bg-white dark:bg-[#1a1a1a] text-black dark:text-white  dark:border dark:border-[#696969]",
        }}
      />
    </Suspense>
  );
}

const DocumentHead = () => (
  <Head>
    <title>Kandalló</title>
    <meta name="description" content="Virtuális jégtörő kártyajáték" />
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover"
    />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/android-chrome-192x192.png"
    />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#434343" />
    <meta name="apple-mobile-web-app-title" content="Kandall&oacute;" />
    <meta name="application-name" content="Kandall&oacute;" />
    <meta name="msapplication-TileColor" content="#b91d47" />
    <meta name="theme-color" content="#434343"></meta>
  </Head>
);

function ThemeSwitcher() {
  const { theme, setTheme } = useNextTheme();
  return (
    <Switch
      size="lg"
      color="warning"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      isSelected={theme !== "dark"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
}
