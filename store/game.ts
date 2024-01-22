import { atom } from 'jotai';

export const gameStateAtom = atom<'config' | 'game'>('config');
export const selectedCategoriesAtom = atom([] as string[]);