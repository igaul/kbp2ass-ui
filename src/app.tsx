import { useState, useRef } from "preact/hooks";
// import { convertToASS } from 'kbp2ass/src/ass';
import { convertToASS } from "../../kbp2ass-ts/src/ass";
import logo from "/icon.svg";
import { PropsWithChildren } from "preact/compat";
import {
  ASPECT_RATIO_OPTIONS,
  AUDIO_BITRATE_OPTIONS,
  AUDIO_CODEC_OPTIONS,
  COLUMNS,
  ISubtitleOptions,
  IVideoOptions,
  OUTPUT_FILE_TYPE_OPTIONS,
  OUTPUT_RESOLUTION_OPTIONS,
  VIDEO_CODEC_OPTIONS,
  defaultSubtitleOptions,
  defaultVideoOptions,
} from "./constants";

type TSet<T> = (name: keyof T, value: T[keyof T]) => void;
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

  const handleVideoOptionsChange: TSet<IVideoOptions> = (name, value) =>
    setVideoOptions(p => ({ ...p, [name]: value }));
  const handleSubtitleOptionsChange: TSet<ISubtitleOptions> = (name, value) =>
    setSubtitleOptions(p => ({ ...p, [name]: value }));
  const handleFilesSelect = (ev: Event) => {
    try {
      const file: File | undefined = (ev.currentTarget as HTMLInputElement)
        .files?.[0];
      if (file) {
        const name = file.name.replace(".kbp", "") + ".ass";
        const reader = new FileReader();
        reader.onload = e => {
          const text = e?.target?.result?.toString();
          if (text) {
            // ? put in worker ?
            const result = convertToASS(text);
            const linkData =
              "data:text/plain;charset=utf-8," +
              window.encodeURIComponent(result);
            setProcessedData({ href: linkData, download: name });
            console.log("result", result.slice(0, 100), result.slice(-100));
            setTimeout(() => {
              downloadRef.current?.click();
            }, 10);
          } else {
            setProcessedData(undefined);
          }
        };
        reader.readAsText(file);
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
            <Section title="Subtitle Options">
              <RowSelect
                title="Aspect Ratio"
                options={ASPECT_RATIO_OPTIONS}
                currentValue={subtitleOptions.aspectRatio}
                name="aspectRatio"
                onChange={handleSubtitleOptionsChange}
              />
              <RowNumberInput
                title="Fade In"
                name="fadeInMs"
                currentValue={subtitleOptions.fadeInMs}
                onChange={handleSubtitleOptionsChange}
              />
              <RowNumberInput
                title="Fade Out"
                name="fadeOutMs"
                currentValue={subtitleOptions.fadeOutMs}
                onChange={handleSubtitleOptionsChange}
              />
              <RowToggle
                title="Override Timestamp Offset"
                name="overrideTimestampOffset"
                currentValue={subtitleOptions.overrideTimestampOffset}
                onChange={handleSubtitleOptionsChange}
              />
              <RowNumberInput
                title="Timestamp Offset"
                name="timestampOffsetMs"
                currentValue={subtitleOptions.timestampOffsetMs}
                onChange={handleSubtitleOptionsChange}
              />
              <RowToggle
                title="Draw Background Color Transparent"
                name="drawBgColorTransparent"
                currentValue={subtitleOptions.drawBgColorTransparent}
                onChange={handleSubtitleOptionsChange}
              />
            </Section>
            <Section title="Video Options">
              <Row title="Background Color">
                <input type="color" />
              </Row>
              <RowSelect
                title="Output Resolution"
                options={OUTPUT_RESOLUTION_OPTIONS}
                name="outputResolution"
                currentValue={videoOptions.outputResolution}
                onChange={handleVideoOptionsChange}
              />
              <RowToggle
                title="Override Background"
                name="overrideBackground"
                currentValue={videoOptions.overrideBackground}
                onChange={handleVideoOptionsChange}
              />
              <RowSelect
                title="Output File Type"
                options={OUTPUT_FILE_TYPE_OPTIONS}
                name="outputFileType"
                currentValue={videoOptions.outputFileType}
                onChange={handleVideoOptionsChange}
              />
              <RowSelect
                title="Video Codec"
                options={VIDEO_CODEC_OPTIONS}
                name="videoCodec"
                currentValue={videoOptions.videoCodec}
                onChange={handleVideoOptionsChange}
              />
              <RowSelect
                title="Audio Codec"
                options={AUDIO_CODEC_OPTIONS}
                name="audioCodec"
                currentValue={videoOptions.audioCodec}
                onChange={handleVideoOptionsChange}
              />
              <RowSelect
                title="Audio Bitrate"
                options={AUDIO_BITRATE_OPTIONS}
                name="audioBitrate"
                currentValue={videoOptions.audioBitrate}
                onChange={handleVideoOptionsChange}
              />
            </Section>
          </div>

          <div>
            <button className="shadow-lg bg-green-700 text-white mt-2">
              Convert
            </button>
          </div>
        </div>
      </div>
      <div className="h-screen w-screen z-10 bg-slate-400/50 fixed inset-0 flex flex-col justify-center gap-4">
        <div>
          <div className="bg-slate-700 text-slate-100 rounded w-fit m-auto py-2 px-4 shadow">
            <label htmlFor="singleFileInput">
              <div className="flex flex-col h-full justify-center">
                Convert File
              </div>
            </label>
          </div>
        </div>

        <div>
          {processedData && (
            <div className="bg-slate-700 text-slate-100 rounded w-fit m-auto py-2 px-4 select-none ring-4 ring-green-500">
              <a ref={downloadRef} {...processedData}>
                Download&ensp;
                <span className="py-1 rounded px-2 bg-slate-600">
                  {processedData.download}
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

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
const RowToggle = <N extends string>({
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
const RowNumberInput = <N extends string>({
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

const RowSelect = <K extends string, N>({
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

const Section = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <div className="flex flex-col gap-3">
    <h3 className="p-1 py-2 text-center text-lg text-slate-400">{title}</h3>
    {children}
  </div>
);
