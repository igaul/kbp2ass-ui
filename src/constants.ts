import type { TSectionEl } from "./types";

export const OUTPUT_RESOLUTION_OPTIONS = [
  "1500x1080",
  "1920x1080 (1080p)",
  "3000x2160",
  "3840x2160 (4K)",
  "1000x720",
  "1280x720 (720p)",
  "640x480",
];
export const VIDEO_CODEC_OPTIONS = [
  "h264",
  "libvpx-vp9",
  "libx265",
  "libaom-av1",
];
export const AUDIO_CODEC_OPTIONS = ["aac", "mp3", "libopus", "flac"];
export const AUDIO_BITRATE_OPTIONS: IVideoOptions["audioBitrate"][] = [
  "",
  "128k",
];

export const aspectRatioMap = {
  "CDG, borders (25:18)": [300, true],
  "Wide, borders (16:9)": [384, true],
  "Standard, borders (4:3)": [288, true],
  "CDG no border (3:2)": [288, false],
  "Wide no border (16:9)": [341, false],
};

export interface IVideoOptions {
  bgColor: string;
  outputResolution: (typeof OUTPUT_RESOLUTION_OPTIONS)[number];
  overrideBackground: boolean;
  outputFileType: "mp4" | "mkv" | "webm";
  videoCodec: (typeof VIDEO_CODEC_OPTIONS)[number];
  audioCodec: (typeof AUDIO_CODEC_OPTIONS)[number];
  audioBitrate: "" | "128k";
}
export interface ISubtitleOptions {
  aspectRatio: keyof typeof aspectRatioMap;
  fadeInMs: number;
  fadeOutMs: number;
  overrideTimestampOffset: boolean;
  timestampOffsetMs: number;
  drawBgColorTransparent: boolean;
}
export const defaultVideoOptions: IVideoOptions = {
  outputResolution: "1500x1080",
  overrideBackground: false,
  outputFileType: "mp4",
  videoCodec: "h264",
  audioCodec: "aac",
  audioBitrate: "",
  bgColor: "00FFFFFF",
};
export const defaultSubtitleOptions: ISubtitleOptions = {
  aspectRatio: "CDG, borders (25:18)",
  fadeInMs: 0,
  fadeOutMs: 0,
  overrideTimestampOffset: false,
  timestampOffsetMs: 0,
  drawBgColorTransparent: true,
};

export const COLUMNS = ["KBP", "Audio", "Background"];
export const ASPECT_RATIO_OPTIONS = Object.keys(
  aspectRatioMap
) as ISubtitleOptions["aspectRatio"][];
export const containerOptionsMap: Record<
  IVideoOptions["outputFileType"],
  [IVideoOptions["videoCodec"][], IVideoOptions["audioCodec"][]]
> = {
  mp4: [["h264"], ["aac", "mp3", "libopus"]],
  mkv: [
    ["libvpx-vp9", "h264", "libx265", "libaom-av1"],
    ["flac", "libopus", "aac", "mp3"],
  ],
  webm: [["libvpx-vp9", "libaom-av1"], ["libopus"]],
};
export const OUTPUT_FILE_TYPE_OPTIONS = Object.keys(
  containerOptionsMap
) as IVideoOptions["outputFileType"][];

export const subtitleOptionsSection: TSectionEl<ISubtitleOptions>[] = [
  {
    title: "Aspect Ratio",
    name: "aspectRatio",
    kind: "select",
    options: ASPECT_RATIO_OPTIONS,
  },
  {
    title: "Fade In",
    name: "fadeInMs",
    kind: "number",
  },
  {
    title: "Fade Out",
    name: "fadeOutMs",
    kind: "number",
  },
  {
    title: "Override Timestamp Offset",
    name: "overrideTimestampOffset",
    kind: "boolean",
  },
  {
    title: "Timestamp Offset",
    name: "timestampOffsetMs",
    kind: "number",
  },
  {
    title: "Draw Background Color Transparent",
    name: "drawBgColorTransparent",
    kind: "boolean",
  },
];

export const videoOptionsSection: TSectionEl<IVideoOptions>[] = [
  {
    title: "Background Color",
    name: "bgColor",
    kind: "color",
  },
  {
    title: "Output Resolution",
    name: "outputResolution",
    kind: "select",
    options: OUTPUT_RESOLUTION_OPTIONS,
  },
  {
    title: "Override Background",
    name: "overrideBackground",
    kind: "boolean",
  },
  {
    title: "Output File Type",
    name: "outputFileType",
    kind: "select",
    options: OUTPUT_FILE_TYPE_OPTIONS,
  },
  {
    title: "Video Codec",
    name: "videoCodec",
    kind: "select",
    options: VIDEO_CODEC_OPTIONS,
  },
  {
    title: "Audio Codec",
    name: "audioCodec",
    kind: "select",
    options: AUDIO_CODEC_OPTIONS,
  },
  {
    title: "Audio Bitrate",
    name: "audioBitrate",
    kind: "select",
    options: AUDIO_BITRATE_OPTIONS,
  },
];
