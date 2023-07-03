import { useState } from "preact/hooks";
import { Dropzone } from "./Dropzone";
import { convertKbpFilesToAss } from "../utils";
import { TProcessedFile } from "../types";
import { BearBg } from "./Bear";
export function QuickMode() {
  const [processedData, setProcessedData] = useState<TProcessedFile[]>([]);

  const handleFiles = (files: File[]) => {
    if (files)
      convertKbpFilesToAss(files)
        .then(d => {
          if (d) {
            d.forEach(f => {
              const a = document.createElement("a");
              a.href = f.dataHref;
              a.download = f.filename;
              a.click();
            });
            setProcessedData(d);
          }
        })
        .catch(console.error);
  };
  return (
    <div className="h-screen w-screen bg-slate-400/75 flex flex-col justify-center gap-2 relative">
      <div className="h-full w-full text-blue-800 text-xl font-bold tracking-wide rounded m-auto shadow hover:bg-blue-500/40 hover:text-blue-50 transition-colors">
        <Dropzone onFiles={handleFiles}>
          <div className="text-center text-2xl z-20 h-full w-full flex flex-col justify-center gap-4">
            <span>Drop kbp files here and get ass</span>
            <span>or click to select files</span>
          </div>
        </Dropzone>
      </div>

      {processedData.length > 0 && (
        <div className="fixed top-2 right-2">
          <div className="flex flex-col gap-2">
            {processedData.map(({ filename, dataHref }) => (
              <div className="bg-green-500 hover:shadow text-green-50 text-xl rounded w-fit m-auto p-4 select-none">
                <a href={dataHref} download={filename}>
                  Download&ensp;
                  <span className="py-2 rounded px-4 bg-green-600">
                    {filename}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      <BearBg />
    </div>
  );
}
