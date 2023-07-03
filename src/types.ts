export type TSectionEl<T> =
  | {
      title: string;
      name: keyof T;
      kind: "number" | "boolean" | "color";
    }
  | { title: string; name: keyof T; options: T[keyof T][]; kind: "select" };
export type TProcessedFile = { href: string; download: string };
export type TFileInfo = [string, string, string];
