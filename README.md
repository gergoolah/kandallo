# 🔥 Kandalló

[![Kandallo](https://img.shields.io/badge/Kandallo-on%20Vercel-green.svg)](https://shields.io/)

Virtuális jégtörő kártyajáték személyes és távoli találkozókhoz, barátokkal, családdal, kollégákkal, vagy totál idegenekkel.

## ⭐ Funkcionalitások

- 📚 3 beépített kártyacsomag, izgalmas kérdésekkel, hogy könnyebben induljon az ismerkedés
- 🌐 Offline játék lehetősége
- 📱 Progresszív webalkalmazás (PWA) támogatás, hogy bármikor elérhető legyen a telefonodon
- 🛠️ felhasználóbarát, de robosztus felület az adatbázis kezeléséhez (vizuális és haladó mód)
- 🗂️ adatbázis exportálása 📤, importálása 📥 és megosztása 🤝 másokkal
- 👨🏻‍💻 3 egyszerű formátum támogatva: JSON, CSV, TXT
- ✨ a legfrissebb webes technológiákkal épült (NextJS, Vercel, és sok más)

## 🚀 Telepítés

1. Klónozd le a repót

```bash
git clone <repo_url>
```

2. Telepítsd a függőségeket

- A projekt minimum NodeJS 18.17.0 verziót igényel - a Node verziók kezelésére ajánlom a Rust-alapú [Fast Node Manager (fnm)](https://github.com/Schniz/fnm) eszközt

```bash
fnm install 18.17.0 # ha fnm-et használsz és még nincs telepítve a megfelelő verzió
fnm use # a projekt mappájában található .nvmrc fájl alapján a megfelelő verzió használatba vétele
npm install # a függőségek telepítése
```

3. Indítsd el a fejlesztői szervert

```bash
npm run dev
```

- A fejlesztői szerver alapértelmezetten a `http://localhost:3000` címen érhető el 🚀

## 🏗️ Architektúra

<div style="display: flex; flex-direction: column; gap: 10px; align-items: center; width: 100%; justify-items: center; justify-content: center;">

<div style="display: flex; flex-direction: row; gap: 10px; justify-items: center; align-items: stretch; width: 100%">
<a href="https://vercel.com/" style="background: white; padding: 10px; display: flex; align-items: center; width: 100%">
<img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/2560px-Vercel_logo_black.svg.png" />
</a>

<a href="https://nextjs.org/" style="background: white; padding: 10px; display: flex; align-items: center; width: 100%">
<img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/788px-Nextjs-logo.svg.png" />
</a>
</div>

<div style="display: flex; flex-direction: row; gap: 10px; align-items: stretch; justify-items: center;">
<a href="https://jotai.org/" style="background: white; padding: 10px; display: flex; align-items: center;">
<img src="https://github.com/pmndrs/jotai/raw/main/img/jotai-header-light.png#gh-light-mode-only" />
</a>

<a href="https://vitejs.dev/" style="background: white; padding: 10px">
<img src="https://vitejs.dev/logo.svg" />
</a>
</div>

<div style="display: flex; flex-direction: row; gap: 10px; align-items: stretch; justify-items: center;">
<a href="https://tailwindcss.com/" style="background: white; padding: 10px; display: flex; align-items: center;">
<img width="100%" src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" />
</a>

<a href="https://nextui.org/" style="display: flex; align-items: stretch;">
<img width="100%" src="https://nextui.org/_next/image?url=%2Fnextui-banner.png&w=750&q=100" />
</a>
</div>

</div>

<br />

A projekt a [NextJS](https://nextjs.org/) keretrendszerre épül, amely a ReactJS könyvtárra épül. Emellett a JavaScript-re épülő [TypeScript](https://www.typescriptlang.org/) nyelvet használjuk.

Adattárolás szempontjából a projekt a böngészőbe beépített [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) adatbázist használja, amelyet a [LocalForage](https://localforage.github.io/localForage/) könyvtár segítségével érünk el. A LocalForage egy IndexedDB wrapper, amely lehetővé teszi az IndexedDB egyszerűbb használatát. Îgy technikailag az adatbázisunk a böngészőben van (IndexedDB), a kliens oldalán, így a szerver oldalán nincs szükségünk adatbázisra, illetve az "adatbázis-operációk" nagyon gyorsak és hatékonyak, mivel nem szükséges azokhoz hálózati kommunikáció a szerverrel - igazából hálózat sem kell hozzá, ezért offline is működik a projekt (a PWA konfigurációnak köszönhetően).

A PWA konfigurációja a `next.config.js` fájlban található, viszont az lokális fejlesztés során nem működik, mivel a NextJS fejlesztői szervere nem támogatja a HTTPS-t. Ezért a PWA konfigurációja csak a Vercel-en lévő verzióban működik. A PWA igazából csak egy Service Worker-el kommunikál, mely felel az alkalmazás kliens-oldali cache-eléséért, hogy az mentve legyen offline használatra is. Emellett ugyancsak a PWA konfiguráció teszi lehetővé, hogy a projekt telepíthető legyen a telefonra, mintha csak egy konvenienciális / natív alkalmazás lenne (pl. nem jelennek meg a böngésző felhasználói felületének elemei, mint pl. a címsor, és az alkalmazás ikonja megjelenik a telefon telepítet alkalmazásai között is).

A projekt a következő fő mappákból áll:

- `components`: a React komponensek helye

  - `components/commons`: közös / újrafelhasználható komponensek
  - `components/icons`: ikonok
  - `components/views`: nagyobb oldalrészek komponensei (a komplexebb komponensek kissebb komponensekre vannak bontva, és ezek a megfelelő almappákban találhatók)

- `pages`: a NextJS oldalak helye

  - technikailag az egész projekt egyetlen oldal (Single-Page Application / SPA), és a különböző oldalakat a NextJS router-e helyett alkalmazásszintű állapotok (application state) alapján váltjuk

- `public`: a statikus fájlok helye (pl. képek, PWA konfiguráció, betűtípusok, stb.)

- `store`: az atomikus, alkalmazásszintű állapotok helye (Jotai alapú, perzisztálás pedig a LocalForage-el történik az IndexedDB-be), illetve a alapvető adatbázis adatai (`store/default-data/index.ts`) és a kollegák projekteinek az adatai (`store/peer-sites/index.tsx`) is itt találhatók

- `utils`: segédfüggvények, konstansok, stb.
  - `utils/hooks/`: React hook-ok
  - `utils/array.ts`: tömbökkel kapcsolatos segédfüggvények (pl. keverés / shuffle, rendezés, stb.)
  - `utils/atom-with-localforage.ts`: Jotai és LocalForage közötti szinkronizálást megvalósító segédfüggvény
  - `utils/clipboard.ts`: vágólapra másolást megvalósító segédfüggvény
  - `utils/colors.ts`: színekkel kapcsolatos segédfüggvény, mely egy véletlenszerű pasztelszínt generál
  - `utils/csv-util.ts`: CSV-formátummal kapcsolatos segédfüggvény, mely megpróbálja felismerni a CSV-ben használt elválasztó karaktert (delimitert)
  - `utils/database-io.ts`: adatbázis importálását és exportálását megvalósító segédfüggvények, osztályban rendezve
  - `utils/db-import.ts`: adatbázis importálását / adatázisok összefésülését megvalósító segédfüggvények
  - `utils/save-file.ts`: segédfüggvény, mely lehetővé teszi egy, vagy több fájl letöltését a böngészőből
  - `utils/share.ts`: megosztást megvalósító segédfüggvények (a böngészőbe beépített Web Share API-t használja)
  - `utils/string-util.ts`: karakterláncokkal kapcsolatos konstansok és segédfüggvények (pl. üres karakterlánc átalakítása `undefined`-ra, stb.)

A projekt a következő fő technológiákat és könyvtárakat használja:

- [NextJS](https://nextjs.org/) - React-alapú meta-keretrendszer (igazából csak Statikus Site Generátor / SSG formájában használjuk)
- [Vite](https://vitejs.dev/) - gyors, modern, eszközökkel támogatott fejlesztői szerver és csomagoló
- [NextPWA](https://github.com/shadowwalker/next-pwa) - PWA támogatás a NextJS-hez
- [Jotai](https://jotai.org/) - atomikus, alkalmazásszintű állapotkezelő
- [LocalForage](https://localforage.github.io/localForage/) - IndexedDB wrapper, perzisztens adattárolás (a localStorage nem működik a PWA esetén)
- [TailwindCSS](https://tailwindcss.com/) - CSS keretrendszer, atomikus CSS osztályokkal
- [NextUI](https://nextui.org/) - React komponensek gyűjteménye, TailwindCSS alapú dizájnnal
- [TypeScript](https://www.typescriptlang.org/) - JavaScript kiterjesztés, statikus típusellenőrzéssel
- [Zod](https://zod.dev/) - TypeScript alapú sémavalidációs könyvtár
- [React Hot Toast](https://react-hot-toast.com/) - értesítések megjelenítése

Adattárolási módszerek:

- az adatbázis tuljdonképpen csak kártyakategóriák listája

```ts
type Database = ICategory[];
```

- minden kategóriának van egy neve, illetve egy listája kártyákkal.

```ts
interface ICategory {
  name: string;
  questions: string[];
}
```

- egy kártya igazából csak egy karakterlánc / string, így a kategóriákban ezt egy egyszerű tömbként tároljuk (`string[]`)

- a kártyacsomagok / kategóriák, illetve a kártyák a globális alkalmazásszintű állapotban vannak tárolva (Jotai), és ezek szinkronizálva és perzisztálva vannak az IndexedDB-vel (LocalForage). A Jotai és a LocalForage közötti szinkronizálás egy saját, egyszerű megoldás, amely a `utils/atom-with-localforage.ts` fájlban található:

```ts
import { atom } from "jotai";
import localforage from "localforage";

export function atomWithLocalforage<T>(key: string, initialValue: T) {
  const baseAtom = atom(initialValue);

  baseAtom.onMount = (setValue) => {
    async function getItem() {
      const item = await localforage.getItem<string>(key);
      if (item === null) {
        setValue(initialValue);
        return;
      }
      try {
        const parsed = JSON.parse(item);
        setValue(parsed);
      } catch (e) {
        setValue(initialValue);
        console.error(e);
      }
    }
    getItem();
  };

  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T | ((x: T) => T)) => {
      const nextValue =
        typeof update === "function"
          ? (update as (x: T) => T)(get(baseAtom))
          : update;
      set(baseAtom, nextValue);
      localforage.setItem(key, JSON.stringify(nextValue));
    }
  );

  return derivedAtom;
}
```

- a beépített kártyacsomagok és kártyák a `store/default-data/index.ts` fájlban vannak összesítve, amúgy pedig hardcode-olva vannak a `store/default-data/korvonal.ts`, `store/default-data/korvonal2.ts` és `store/default-data/parbeszed.ts` fájlokban.

- a kártyacsomagok és kártyák importálása és exportálása a `utils/export-import.ts` fájlban található

- a kollégák projekteinek az adatai a `store/peer-sites/index.tsx` fájlban találhatók, hardcode-olva. Ugyanebben a mappában vannak a projektekhez tartozó képek is - ezeket a Vite automatikusan becsomagolja, így mi sima importokkal tudjuk őket használni TypeScript-ben, az `<img>` HTML elem `src` attribútumába ágyazva. A projektek listázásának kódja a `components/views/peer-sites-view.tsx` fájlban található, ahol a projektek ABC-sorrendben vannak rendezve. Ezen rész egy Feature Flag mögé van építve, így azt egyszerűen ki lehet kapcsolni a `feature-flags.ts` fájlban, ha nem szeretnénk már megjeleníteni.

- Az alkalmazásnak két alapvető módja van: konfigurációs mód és játék mód. Ezen állapot egy sima Jotai atomban van tárolva, perzisztencia nélkül. A konfigurációs módban lehetőség van az adatbázis kezelésére, illetve egy új játék opcióinak a beállítására. A játék mód pedig a játékot valósítja meg, ahol a kártyák megjelennek, és a játékosok válaszolnak rájuk. Játék módból csak a játék befejezésével lehet visszalépni a konfigurációs módba.

- Minden játék elején a kiválasztot kategóriák kártyái véletlen sorrenbe lesznek rendezve, ha pedig a játék-pakli végére érünk, akkor újra keverjük a kártyákat, és újra kezdhetjük a pakli elejéről.
