export type TSectionEl<T> =
  | {
      title: string;
      name: keyof T;
      kind: "number" | "boolean" | "color";
    }
  | { title: string; name: keyof T; options: T[keyof T][]; kind: "select" };
export type TProcessedFile = {
  dataHref: string;
  filename: string;
  assFileStr: string;
};
export type TFileInfo = {
  filename: string;
  isSelected?: boolean;
  // keep it ???
  // kbpText: string;
  assFileStr: string;
  // ? path or as blob ( if dropped in ) ?
  audioFile?: string;
  background?: { color: string } | { image: string } | { video: string };
};
