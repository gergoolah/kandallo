import MyPic from "../../public/favicon.svg";
import PallHannaPic from "./pall_hanna.jpeg";
import GudorEvaMelindaPic from "./gudor_eva_melinda.jpeg";
import CsehBorokaSaroltaPic from "./cseh_boroka_sarolta.png";
import LorinczBencePic from "./lorincz_bence.png";
import SzilagyiBlankaPic from "./szilagyi_blanka.jpeg";
import MatyusBernadettAndreaPic from "./matyus_bernadett_andrea.jpeg";
import SzaboBenedekPalmaPic from "./szabo_benedek_palma.png";
import BangaKunaBernadettPic from "./banga_kuna_bernadett.jpeg";
import GerasimoviciNandorPic from "./gerasimovici_nandor.jpeg";
import FornaAlizGretaPic from "./forna_aliz_greta.jpeg";
import SimonZsuzsannaPic from "./simon_zsuzsanna.webp";
import KotroKosztandiGellertPic from "./kotro_kosztandi_gellert.jpeg";
import MoriczNoemiEnikoPic from "./moricz_noemi_eniko.png";
import DielEduardPic from "./diel_eduard.jpeg";
import KassaiDenisThomasPic from "./kassai_denis_thomas.jpeg";
import SikoAdriennKlaudiaPic from "./siko_adrienn_klaudia.jpeg";
import VighMarkPic from "./vigh_mark.jpeg";
import GombarEvelynHenriettaPic from "./gombar_evelyn_henrietta.jpeg";
import MedgyesfalviRobertPic from "./medgyesfalvi_robert.jpeg";
import IlyesGyoparPic from "./ilyes_gyopar.jpeg";
import DemeterNoemiBeatrixPic from "./demeter_noemi_beatrix.jpeg";
import MagDanielPic from "./mag_daniel.jpeg";

import { StaticImageData } from "next/image";

export interface IPeerSite {
  peerName: string;
  url?: string;
  siteName: string;
  category?: string;
  imageSrc?: string | StaticImageData;
}

export const PEER_SITES: IPeerSite[] = [
  {
    peerName: "Mátyus Bernadett-Andrea",
    siteName: "Culinary Cronicles",
    url: "https://matyusbernadett0.wixsite.com/cronicles",
    category: "Gasztronómia",
    imageSrc: MatyusBernadettAndreaPic,
  },
  {
    peerName: "Szabó-Benedek Pálma",
    siteName: "PuppyStyle",
    url: "https://szabobenedekpalma.wixsite.com/mysite",
    category: "Oktatás",
    imageSrc: SzaboBenedekPalmaPic,
  },
  {
    peerName: "Banga-Kuna Bernadett",
    siteName: "StudDelight",
    url: "https://bernadettbk.wixsite.com/studdelight",
    category: "Gasztronómia",
    imageSrc: BangaKunaBernadettPic,
  },
  {
    peerName: "Gerasimovici Nándor",
    siteName: "GameGrove",
    url: "https://geraszimovicsnando.wixsite.com/gamegrove",
    category: "Boardgames",
    imageSrc: GerasimoviciNandorPic,
  },
  {
    peerName: "Forna Aliz Greta",
    siteName: "Game",
    url: "https://fornaaliz.wixsite.com/gamecorner",
    category: "Videojátékok",
    imageSrc: FornaAlizGretaPic,
  },
  {
    peerName: "Simon Zsuzsanna",
    siteName: "On Tape",
    url: "https://simonjuji03.wixsite.com/on-tape",
    category: "Audio-vizuális dokumentációk",
    imageSrc: SimonZsuzsannaPic,
  },
  {
    peerName: "Kotró-Kosztándi Gellért",
    url: "https://kotrokgellert2.wixsite.com/gammaproduction",
    siteName: "GammaProduction",
    category: "Fotó-Film",
    imageSrc: KotroKosztandiGellertPic,
  },
  {
    peerName: "Oláh Gergő-Balázs",
    siteName: "Kandalló",
    url: "https://kandallo.vercel.app/",
    category: "Boardgames",
    imageSrc: MyPic,
  },
  {
    peerName: "Páll Hanna",
    siteName: "Hiking with dogs in Transylvania",
    url: "https://turakutyavalerdely.wixsite.com/hiking-with-dogs-in",
    category: "Outdoor",
    imageSrc: PallHannaPic,
  },
  {
    peerName: "Gudor Éva-Melinda",
    siteName: "Paradoxonok világa",
    url: "https://gudorevi.wixsite.com/paradoxonok",
    category: "Oktatás",
    imageSrc: GudorEvaMelindaPic,
  },
  {
    peerName: "Cseh Boróka-Sarolta",
    siteName: "Fabfiits",
    url: "https://borcsicseh.wixsite.com/fabfiits",
    category: "Divat",
    imageSrc: CsehBorokaSaroltaPic,
  },
  {
    peerName: "Moricz Noémi-Enikő",
    siteName: "SweetWonderland",
    url: "https://noemieniko2005.wixsite.com/sweetwonderland",
    category: "Gasztronómia",
    imageSrc: MoriczNoemiEnikoPic,
  },
  {
    peerName: "Lőrincz Bence",
    siteName: "Lépéselőny",
    url: "https://bencelorincz03.wixsite.com/l-p-sel-ny",
    category: "Önfejlesztés",
    imageSrc: LorinczBencePic,
  },
  {
    peerName: "Diel Eduárd",
    siteName: "ZizArea",
    url: "https://shoshintheatre.wixsite.com/website",
    category: "Színház",
    imageSrc: DielEduardPic,
  },
  {
    peerName: "Kassai Denis-Thomas",
    siteName: "PawCafe",
    url: "https://kassaidennis.wixsite.com/paw-cafe",
    category: "Cafe",
    imageSrc: KassaiDenisThomasPic,
  },
  {
    peerName: "Szilágyi Blanka",
    siteName: "BeautyLand",
    url: "https://szblanka030.wixsite.com/beauty-land",
    category: "Szépségípar",
    imageSrc: SzilagyiBlankaPic,
  },
  {
    peerName: "Siko Adrienn-Klaudia",
    siteName: "Vntage",
    url: "https://sikoadrienn.wixsite.com/vntageart",
    category: "Művészet",
    imageSrc: SikoAdriennKlaudiaPic,
  },
  {
    peerName: "Vigh Márk",
    siteName: "Parkalat",
    url: "https://vighmarkiol.wixsite.com/parkalatalat",
    category: "Művészeti galéria",
    imageSrc: VighMarkPic,
  },
  {
    peerName: "Gombár Evelyn-Henrietta",
    siteName: "Femenino",
    url: "https://femeninoo.wixsite.com/femenino",
    category: "Életmód",
    imageSrc: GombarEvelynHenriettaPic,
  },
  {
    peerName: "Medgyesfalvi Róbert",
    siteName: "MED Media",
    url: "https://medgyesfalvirobert.wixsite.com/medmedia",
    category: "Tartalomgyártás",
    imageSrc: MedgyesfalviRobertPic,
  },
  {
    peerName: "Ilyés Gyopár",
    siteName: "Museoventure",
    url: "https://ilyesgyopar2002.wixsite.com/museoventure",
    category: "Múzeum",
    imageSrc: IlyesGyoparPic,
  },
  {
    peerName: "Demeter Noémi-Beatrix",
    siteName: "Etnokultúra",
    url: "https://demeterbeatrixnomi.wixsite.com/neprajz-antropologia",
    category: "Oktatás",
    imageSrc: DemeterNoemiBeatrixPic,
  },
  {
    peerName: "Mag Dániel",
    siteName: "Motiwaker",
    url: "https://danielmag39.wixsite.com/mysite",
    category: "Motiváció",
    imageSrc: MagDanielPic,
  },
];
