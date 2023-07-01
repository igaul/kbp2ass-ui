import type { StateUpdater } from "preact/compat";
import type { TSectionEl } from "../types";

export function PanelSection<T>({
  title,
  setter,
  data,
  list,
}: {
  data: T;
  setter: StateUpdater<T>;
  title: string;
  list: TSectionEl<T>[];
}) {
  const handleChange = (name: keyof T, value: T[keyof T]) =>
    setter(p => ({ ...p, [name]: value }));
  return (
    <div className="flex flex-col gap-3">
      <h3 className="p-1 py-2 text-center text-lg text-slate-400">{title}</h3>
      {list.map(el => (
        <div
          key={el.name}
          className={`flex ${
            el.kind === `boolean`
              ? "flex-row-reverse"
              : "flex-row justify-between"
          } flex-wrap gap-2`}
        >
          <label className="text-slate-400" htmlFor={el.name as string}>
            {el.title}
          </label>
          {el.kind === "number" ? (
            <input
              className="w-12 pl-2 text-center border border-gray-200 rounded"
              type="number"
              value={data[el.name] as number}
              onChange={ev =>
                handleChange(
                  el.name,
                  ev.currentTarget.valueAsNumber as T[keyof T]
                )
              }
            />
          ) : el.kind === "boolean" ? (
            <input
              type="checkbox"
              checked={data[el.name] as boolean}
              onChange={ev =>
                handleChange(el.name, ev.currentTarget.checked as T[keyof T])
              }
            />
          ) : el.kind === "color" ? (
            <input
              type="color"
              value={data[el.name] as string}
              onChange={ev =>
                handleChange(el.name, ev.currentTarget.value as T[keyof T])
              }
            />
          ) : el.kind === "select" ? (
            <select
              onChange={ev =>
                handleChange(el.name, ev.currentTarget.value as T[keyof T])
              }
              className="border border-gray-200 rounded px-2"
            >
              {el.options.map(v => (
                <option
                  selected={data[el.name] === v}
                  value={v as string}
                  key={v}
                >
                  {v as string}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      ))}
    </div>
  );
}
