export type TSectionEl<T> =
  | {
      title: string;
      name: keyof T;
      kind: "number" | "boolean" | "color";
    }
  | { title: string; name: keyof T; options: T[keyof T][]; kind: "select" };
