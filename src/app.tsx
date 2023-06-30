import { useState, useRef } from "preact/hooks";
import { convertToASS } from "kbp2ass/src/ass";
import logo from "/icon.svg";
import {
  COLUMNS,
  defaultSubtitleOptions,
  defaultVideoOptions,
} from "./constants";
import { Dropzone } from "./components/Dropzone";
import { SubtitleOptions } from "./components/SubtitleOptions";
import { VideoOptions } from "./components/VideoOptions";

export function App() {
  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const [processedData, setProcessedData] = useState<
    { href: string; download: string } | undefined
  >();
  const [files, _setFiles] = useState<[string, string, string][]>([]);
  const [videoOptions, setVideoOptions] = useState(defaultVideoOptions);
  const [subtitleOptions, setSubtitleOptions] = useState(
    defaultSubtitleOptions
  );

  const processFile = (file: File) => {
    const name = file.name.replace(".kbp", "") + ".ass";
    const reader = new FileReader();
    reader.onload = e => {
      const text = e?.target?.result?.toString();
      if (text) {
        // ? put in worker ?
        const result = convertToASS(text);
        const linkData =
          "data:text/plain;charset=utf-8," + window.encodeURIComponent(result);
        setProcessedData({ href: linkData, download: name });
        setTimeout(() => {
          downloadRef.current?.click();
        }, 10);
      } else {
        setProcessedData(undefined);
      }
    };
    reader.readAsText(file);
  };
  const handleFilesSelect = (ev: Event) => {
    try {
      const file: File | undefined = (ev.currentTarget as HTMLInputElement)
        .files?.[0];
      if (file) {
        processFile(file);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFiles = (files: File[]) => {
    try {
      const file: File | undefined = files[0];
      if (file) {
        processFile(file);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-row bg-gray-50 shadow-md h-full min-h-screen max-w-screen-2xl m-auto">
        <input
          type="file"
          id="singleFileInput"
          className="absolute -top-96"
          onChange={handleFilesSelect}
        />
        <div className="flex flex-col gap-2 w-[75%] relative sm:gap-4">
          <div className="flex flex-col h-full p-1">
            <div className="flex flex-row justify-evenly border border-gray-300">
              {COLUMNS.map(h => (
                <div
                  key={h}
                  className="w-full text-center border-x border-gray-300"
                >
                  {h}
                </div>
              ))}
            </div>
            <div className="flex flex-col h-full border border-gray-300 bg-gray-100 rounded rounded-t-none relative">
              {files.map(f => (
                <div
                  key={f}
                  className="w-full text-center flex flex-row justify-evenly border-gray-300 odd:bg-gray-200"
                >
                  {f.map(c => (
                    <div>{c}</div>
                  ))}
                </div>
              ))}
              <img
                className="h-full w-full absolute inset-0 opacity-20 bg-transparent"
                src={logo}
                alt=""
              />
            </div>
          </div>

          <div className="flex gap-2 p-1 sm:p-3">
            <div className="flex flex-col w-full">
              <div className="text-gray-600 p-1 px-2 text-center">
                Drag/Drop files/folders above or use buttons below
              </div>
              <div className="flex flex-row gap-2">
                <label htmlFor="singleFileInput" className="btn">
                  <div className="flex flex-col h-full justify-center">
                    Add Files
                  </div>
                </label>

                <button>Remove Selected</button>
                <button>Add Empty Row</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-1 sm:p-3 w-[25%] max-w-sm">
          <div className="flex flex-col gap-4 py-3 h-full max-h-[calc(100vh-62px)] overflow-y-auto">
            <SubtitleOptions
              data={subtitleOptions}
              setter={setSubtitleOptions}
            />
            <VideoOptions data={videoOptions} setter={setVideoOptions} />
          </div>

          <div>
            <button className="shadow-lg bg-green-700 text-white mt-2">
              Convert
            </button>
          </div>
        </div>
      </div>
      <div className="h-screen w-screen z-10 bg-slate-400/75 fixed inset-0 flex flex-col justify-center gap-2">
        <div className="ring-4 ring-blue-700 text-blue-700 text-xl font-bold tracking-wide rounded m-auto shadow hover:bg-blue-600 hover:text-blue-50 hover:shadow-lg hover:ring-8 hover:ring-blue-600">
          <Dropzone onFiles={handleFiles} />
        </div>

        {processedData && (
          <div className="bg-green-500 hover:shadow text-green-50 text-xl rounded w-fit m-auto p-4 select-none">
            <a ref={downloadRef} {...processedData}>
              Download&ensp;
              <span className="py-2 rounded px-4 bg-green-600">
                {processedData.download}
              </span>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
