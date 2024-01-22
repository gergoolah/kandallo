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
