import { useState } from "preact/hooks";
import logo from "/icon.svg";
import {
  defaultSubtitleOptions,
  defaultVideoOptions,
  subtitleOptionsSection,
  videoOptionsSection,
} from "../constants";
import { Dropzone } from "./Dropzone";
import { PanelSection } from "./PanelSection";
import type { TFileInfo, TProcessedFile } from "../types";
import { convertKbpFilesToAss } from "../utils";
import { FileTable } from "./FileTable";
import { BounceSpin } from "./Spinners";

export function AdvancedMode() {
  const [isLoading, setIsLoading] = useState(false);
  const [processedData, setProcessedData] = useState<TProcessedFile[]>();
  const [files, _setFiles] = useState<TFileInfo[]>([]);
  const [videoOptions, setVideoOptions] = useState(defaultVideoOptions);
  const [subtitleOptions, setSubtitleOptions] = useState(
    defaultSubtitleOptions
  );

  const handleFiles = async (files: FileList | File[] | null) => {
    setIsLoading(true);
    const data = await convertKbpFilesToAss(files);
    if (data) setProcessedData(data);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-row bg-gray-50 shadow-md h-full min-h-screen max-w-screen-2xl m-auto relative">
      <input
        type="file"
        id="singleFileInput"
        className="absolute -top-96 hidden"
        onChange={ev => handleFiles(ev.currentTarget.files)}
      />
      <div className="flex flex-col gap-2 w-[75%] min-w-[400px] relative sm:gap-4">
        <FileTable files={files} />
        <img
          className="h-full w-full absolute inset-0 opacity-20 bg-transparent z-10"
          src={logo}
          alt=""
        />
        <div className="h-full w-full absolute inset-0 bg-transparent z-20">
          {processedData && processedData.length > 0 ? (
            <div className="flex flex-col gap-2 pt-8">
              <button
                onClick={() => setProcessedData([])}
                className="py-1 px-4 bg-blue-700 w-fit m-auto text-white shadow-md"
              >
                Clear
              </button>
              {processedData.map(d => (
                <div className="bg-green-500 hover:shadow text-green-50 text-xl rounded w-fit m-auto p-4 select-none">
                  <a {...d}>
                    Download&ensp;
                    <span className="py-2 rounded px-4 bg-green-600">
                      {d.download}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <Dropzone
              onFiles={handleFiles}
              isDroppingText="Drop To Add Files"
            />
          )}
        </div>

        <div className="absolute bottom-6 right-12 w-14 h-14">
          <label htmlFor="singleFileInput">
            <div className="flex flex-col h-full justify-center items-center bg-green-500 rounded-full font-bold text-xl shadow text-center text-green-50 hover:bg-green-500/90 hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </label>
        </div>
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
            disabled
            className="shadow-lg bg-green-700 text-white mt-2 disabled:bg-green-900/50"
          >
            Convert
          </button>
        </div>
      </div>
      {isLoading && <BounceSpin />}
    </div>
  );
}
