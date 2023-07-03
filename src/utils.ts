import { convertToASS } from "kbp2ass/src/ass";
import { TProcessedFile } from "./types";

/** create ass format data url and filename from kbp file */
export const processFile = async (file: File): Promise<TProcessedFile | null> =>
  new Promise(resolve => {
    const filename = file.name.replace(".kbp", "") + ".ass";
    const reader = new FileReader();
    reader.onload = e => {
      const text = e?.target?.result?.toString();
      if (text) {
        const result = convertToASS(text);
        const dataUrl =
          "data:text/plain;charset=utf-8," + window.encodeURIComponent(result);
        return resolve({ href: dataUrl, download: filename });
      } else {
        // TODO: some error?
        return resolve(null);
      }
    };
    reader.readAsText(file);
  });

export async function convertKbpFilesToAss(
  files: FileList | File[] | null
): Promise<TProcessedFile[] | null> {
  if (!files || files.length < 1) return null;
  try {
    const promises = (Array.isArray(files) ? files : [...files]).map(
      processFile
    );
    return (await Promise.all(promises)).filter(Boolean) as TProcessedFile[];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const toFfmpegCmd = ({
  bgType,
  bgSize,
  bg,
  resolution,
}: {
  bgType: "color" | "image" | "video";
  bgSize: number;
  bg: string;
  resolution: string;
}) => {
  const cmds = ["-y"];

  if (bgType === `color`) {
    cmds.concat(
      `-f lavfi -i color=color=${bg}:r=60:s=${resolution}`.split(" ")
    );
  } else if (bgType === `image`) {
    cmds.concat(["-loop", "1", "-framerate", "60", "-i", bg]);
  } else if (bgType === `video`) {
    cmds.concat(["-i", bg]);
  }
  //
  if (bgType in [`image`, `video`]) {
    if (!bgSize) {
      throw new Error("missing background size");
    }
    // const bgRatio = 1.0;
    // const assRatio = 1.0;
  }

  return cmds.join("");
};

function isDark(hex: string, cutoff = 128): boolean {
  // https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
  const rgb = parseInt(hex.startsWith("#") ? hex.substring(1) : hex, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma > cutoff;
}
