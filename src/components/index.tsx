import type { PropsWithChildren } from "preact/compat";
const Row = ({
  children,
  title,
  labelRight,
  narrow,
}: PropsWithChildren<{
  title: string;
  labelRight?: boolean;
  narrow?: boolean;
}>) => (
  <div
    className={`flex ${
      labelRight ? "flex-row-reverse" : "flex-row"
    } flex-wrap ${narrow ? "" : "justify-between"} gap-2`}
  >
    <label className="text-slate-400">{title}</label>
    {children}
  </div>
);
type TRowBaseProps<N, T> = {
  title: string;
  name: N;
  currentValue?: T;
  onChange: (name: N, value: T) => void;
};
export const RowToggle = <N extends string>({
  title,
  name,
  currentValue,
  onChange,
}: TRowBaseProps<N, boolean>) => (
  <Row title={title} labelRight narrow>
    <input
      type="checkbox"
      checked={currentValue}
      onChange={ev => onChange(name, ev.currentTarget.checked)}
    />
  </Row>
);
export const RowNumberInput = <N extends string>({
  title,
  name,
  currentValue,
  onChange,
}: TRowBaseProps<N, number>) => (
  <Row title={title}>
    <input
      className="w-12 pl-2 text-center border border-gray-200 rounded"
      type="number"
      value={currentValue}
      onChange={ev => onChange(name, ev.currentTarget.valueAsNumber)}
    />
  </Row>
);
export const RowColorInput = <N extends string>({
  title,
  name,
  currentValue,
  onChange,
}: TRowBaseProps<N, string>) => (
  <Row title={title}>
    <input
      type="color"
      value={currentValue}
      onChange={ev => onChange(name, ev.currentTarget.value)}
    />
  </Row>
);

export const RowSelect = <K extends string, N>({
  title,
  options,
  name,
  currentValue,
  onChange,
}: TRowBaseProps<N, K> & { options: K[] }) => (
  <Row title={title}>
    <select
      onChange={ev => onChange(name, ev.currentTarget.value as K)}
      className="border border-gray-200 rounded px-2"
    >
      {options.map(v => (
        <option selected={currentValue === v} value={v} key={v}>
          {v}
        </option>
      ))}
    </select>
  </Row>
);

export const Section = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <div className="flex flex-col gap-3">
    <h3 className="p-1 py-2 text-center text-lg text-slate-400">{title}</h3>
    {children}
  </div>
);
