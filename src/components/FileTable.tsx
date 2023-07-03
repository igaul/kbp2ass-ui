import { COLUMNS } from "../constants";
import { TFileInfo } from "../types";

export const FileTable = ({ files }: { files: TFileInfo[] }) => (
  <div className="h-full flex flex-col">
    <div className="flex flex-row justify-evenly border border-gray-300">
      <div className="w-20 border-x border-gray-300"></div>
      {COLUMNS.map(h => (
        <div key={h} className="w-full text-center border-x border-gray-300">
          {h}
        </div>
      ))}
    </div>
    <div className="flex flex-col h-full border border-gray-300 bg-gray-100 rounded rounded-t-none">
      {files.map(f => (
        <div
          key={f}
          className="w-full text-center flex flex-row justify-evenly border-gray-300 odd:bg-gray-200"
        >
          <div className="w-20 border-x border-gray-300">
            <button>x</button>
          </div>
          {f.map(c => (
            <div>{c}</div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
