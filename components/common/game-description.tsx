"use client";
import { Card } from "@nextui-org/react";
import classNames from "classnames";

export const GameDescription = () => (
  <Card className="p-5 flex flex-col gap-3 group/card">
    <h3 className="text-2xl font-semibold">
      Üdvözöllek a{" "}
      <span
        className={classNames(
          "dark:text-[#ef8446] text-black font-extrabold",
          "group-hover/card:dark:drop-shadow-[0_0_5px_#dc8a06b1]"
        )}
      >
        Kandalló
      </span>{" "}
      virtuális jégtörő kártyajátékban!
    </h3>
    <p>
      Itt kérdésekkel tűzdelt kártyajátékokat találsz különböző kategóriákban.
      <br />
      Használd a beépített kategóriákat, vagy készíts és ossz meg saját
      kategóriákat egyedi kérdésekkel.
      <br />
      Gyújtsd be a kandallót, hozz egy csésze teát vagy kávét, hívd össze az
      ismert és még ismeretlen barátaidat, üljetek le kényelmesen, és merüljetek
      el a játék izgalmas világában!
      <br />
      Jó szórakozást és ismekedést!
    </p>
  </Card>
);
