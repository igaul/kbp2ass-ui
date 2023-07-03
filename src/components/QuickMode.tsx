import { useState, useRef } from "preact/hooks";
import { Dropzone } from "./Dropzone";
import { convertKbpFilesToAss } from "../utils";
import { TProcessedFile } from "../types";
import logo from "/icon.svg";
export function QuickMode() {
  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const [processedData, setProcessedData] = useState<TProcessedFile[]>([]);

  const handleFiles = (files: File[]) => {
    if (files)
      convertKbpFilesToAss(files)
        .then(d => {
          if (d) {
            if (d.length === 1) {
              setTimeout(() => {
                downloadRef.current?.click();
              }, 10);
            }
            setProcessedData(d);
          }
        })
        .catch(console.error);
  };
  return (
    <div className="h-screen w-screen bg-slate-400/75 flex flex-col justify-center gap-2 relative">
      <div className="h-full w-full text-blue-700 text-xl font-bold tracking-wide rounded m-auto shadow hover:bg-blue-500/40 hover:text-blue-50 transition-colors">
        <Dropzone onFiles={handleFiles}>
          <span className="text-center">
            Drop kbp files here and get ass
            <br />
            <br /> or click to select files
          </span>
        </Dropzone>
      </div>

      {processedData && (
        <div className="fixed top-2 right-2">
          {processedData.length === 1 ? (
            <div className="bg-green-500 hover:shadow text-green-50 text-xl rounded w-fit m-auto p-4 select-none">
              <a ref={downloadRef} {...processedData[0]}>
                Download&ensp;
                <span className="py-2 rounded px-4 bg-green-600">
                  {processedData[0].download}
                </span>
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
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
          )}
        </div>
      )}
      <img
        className="h-full w-full absolute inset-0 opacity-20 bg-transparent -z-10"
        src={logo}
        alt=""
      />
    </div>
  );
}
