import { StateUpdater } from "preact/hooks";
import { COLUMNS } from "../constants";
import { TFileInfo } from "../types";
import { convertKbpFilesToAssInfo, stopPropagation } from "../utils";
import { Dropzone } from "./Dropzone";
import { BearBg } from "./Bear";

export const FileTable = ({
  files,
  setter,
}: {
  files: TFileInfo[];
  setter: StateUpdater<TFileInfo[]>;
}) => {
  const handleFiles = async (files: FileList | File[] | null) => {
    const data = await convertKbpFilesToAssInfo(files);
    if (data) {
      // todo dedupe
      setter(data);
    }
  };
  return (
    <>
      <div className="h-full flex flex-col relative bg-slate-200">
        <div className="flex flex-row justify-evenly border border-gray-300">
          <div className="w-20 border-x border-gray-300"></div>
          {COLUMNS.map(h => (
            <div
              key={h}
              className="w-full text-center border-x border-gray-300"
            >
              {h}
            </div>
          ))}
        </div>
        <div
          className="flex flex-col h-fit border border-gray-300 bg-gray-100 rounded rounded-t-none"
          onClick={stopPropagation}
        >
          {files.map(f => (
            <div
              key={f.filename}
              className="w-full text-center flex flex-row border-gray-300 evem:bg-gray-200 z-20"
            >
              <div
                className="w-20 border-x border-gray-300"
                onClick={() => {
                  setter(
                    files.map(file =>
                      file.filename === f.filename
                        ? { ...file, isSelected: !file.isSelected }
                        : file
                    )
                  );
                }}
              >
                {f.isSelected ? "✅" : "□"}
              </div>
              {/* cols: kbp(kbp/ass file to process/join) | audio(audio file to join) | background(video|image|color pallete to join - default transparent) */}
              {/*  background is two pickers: file(vid/image) | color */}
              <div className="w-full border-r">{f.filename}</div>
              <div className="w-full border-r">
                {f.audioFile ? (
                  f.audioFile
                ) : (
                  <label htmlFor={`af-${f.filename}`}>
                    <div className="bg-blue-100 w-full">Select</div>

                    <input
                      /* ? accept audio or check after selecting ? */ type="file"
                      name={`af-${f.filename}`}
                      id={`af-${f.filename}`}
                      className="hidden"
                      onChange={ev => {
                        console.log("AUDIO", ev.currentTarget.files);
                      }}
                    />
                  </label>
                )}
              </div>
              <div className="w-full max-w-full overflow-x-auto">
                {f.background ? f.background : <div>img|vid|color|none</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="h-full w-full bg-transparent z-10">
          <Dropzone onFiles={handleFiles} isDroppingText="Drop To Add Files" />
        </div>
      </div>
      <BearBg />
      <div className="absolute bottom-6 right-12 w-14 h-14">
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
      </div>
    </>
  );
};
