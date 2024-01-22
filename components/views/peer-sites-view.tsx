"use client";
import Image from "next/image";
import { Accordion, AccordionItem, Card, CardFooter } from "@nextui-org/react";
import classNames from "classnames";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { FEATURE_FLAGS } from "../../feature-flags";
import { PEER_SITES } from "../../store/peer-sites";

export function PeerSitesView() {
  const sortedPeerSites = useMemo(
    () =>
      PEER_SITES.sort((a, b) => {
        if (a.url && !b.url) {
          return -1;
        }
        if (!a.url && b.url) {
          return 1;
        }
        return a.siteName.localeCompare(b.siteName);
      }),
    []
  );

  if (!FEATURE_FLAGS.SHOW_PEER_LINKS) {
    return null;
  }

  return (
    <Accordion variant="shadow">
      <AccordionItem
        key="peer-links"
        title="Évfolyamtársak linkjei"
        aria-label="Évfolyamtársak linkjei"
      >
        <div className="flex flex-row flex-wrap gap-4 pb-5 items-center justify-center">
          {sortedPeerSites.map((peerSite) => (
            <Card
              isHoverable
              isPressable
              className="h-[300px] w-[300px]"
              key={`${peerSite.peerName}-card`}
              onPress={() => {
                if (peerSite.url) {
                  window.open(peerSite.url, "_blank", "noopener noreferrer");
                  return;
                }
                toast.error("Nincs link megadva");
              }}
            >
              {peerSite.imageSrc ? (
                <Image
                  src={peerSite.imageSrc}
                  alt={`Image of ${peerSite.peerName}`}
                  className={classNames(
                    "z-0 w-full h-full object-cover",
                    peerSite.peerName === "Oláh Gergő-Balázs" && "p-20"
                  )}
                />
              ) : null}
              <CardFooter className="absolute bottom-0 z-10 flex-col !items-start bg-black bg-opacity-40">
                <h4 className="text-white font-bold text-lg">
                  {peerSite.siteName}
                </h4>
                <p className="text-sm font-medium uppercase text-white">
                  {peerSite.peerName}
                </p>
                <p className="text-tiny text-white">
                  {peerSite.category ?? <>&nbsp;</>}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
