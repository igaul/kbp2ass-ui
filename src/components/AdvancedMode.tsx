import { useState } from "preact/hooks";
import {
  defaultSubtitleOptions,
  defaultVideoOptions,
  subtitleOptionsSection,
  videoOptionsSection,
} from "../constants";

import { PanelSection } from "./PanelSection";
import type { TFileInfo } from "../types";
import { FileTable } from "./FileTable";

export function AdvancedMode() {
  const [isLoading, _setIsLoading] = useState(true);
  const [files, setFiles] = useState<TFileInfo[]>([]);
  const [videoOptions, setVideoOptions] = useState(defaultVideoOptions);
  const [subtitleOptions, setSubtitleOptions] = useState(
    defaultSubtitleOptions
  );

  return (
    <div className="flex flex-row bg-gray-50 shadow-md h-full min-h-screen max-w-screen-2xl m-auto relative">
      <div className="flex flex-col gap-2 w-[75%] min-w-[400px] relative sm:gap-4">
        <FileTable files={files} setter={setFiles} />
      </div>
      <div className="flex flex-col p-1 sm:p-3 w-[25%] min-w-[300px] max-w-sm">
        <div className="flex flex-col gap-8 py-3 h-full max-h-[calc(100vh-62px)] overflow-y-auto">
          <PanelSection
            title="Subtitle Options"
            list={subtitleOptionsSection}
            data={subtitleOptions}
            setter={setSubtitleOptions}
          />
          <PanelSection
            title="Video Options"
            list={videoOptionsSection}
            data={videoOptions}
            setter={setVideoOptions}
          />
        </div>

        <div>
          <button
            disabled={!files.length}
            className="shadow-lg bg-green-700 text-white mt-2 disabled:bg-green-900/50"
          >
            Convert
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="fixed inset-0 h-screen w-screen bg-gray-300/50 z-20 flex flex-col justify-center items-center">
          <p className="p-8 text-2xl font-semibold">This is not ready yet</p>
          <div className="flex animate-bounce gap-8">
            <div className="animate-spin rounded-full border-r-8 border-blue-700 w-16 h-10 bg-gradient-to-l from-blue-700 to-red-600"></div>
            <div className="animate-bounce rounded-full border-b-8 bg-gradient-to-t from-fuchsia-800 to-orange-600 border-fuchsia-900 w-12 h-12 bg-purple-600"></div>
            <div className="animate-spin rounded-full border-l-8 border-red-700 w-16 h-10 bg-gradient-to-l from-purple-600 to-red-700"></div>
          </div>
        </div>
      )}
    </div>
  );
}
