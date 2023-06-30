import type { StateUpdater } from "preact/hooks";

export type TSet<T> = (name: keyof T, value: T[keyof T]) => void;
export type TSectionProps<T> = { data: T; setter: StateUpdater<T> };
