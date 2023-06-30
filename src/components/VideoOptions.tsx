import {
  AUDIO_BITRATE_OPTIONS,
  AUDIO_CODEC_OPTIONS,
  IVideoOptions,
  OUTPUT_FILE_TYPE_OPTIONS,
  OUTPUT_RESOLUTION_OPTIONS,
  VIDEO_CODEC_OPTIONS,
} from "../constants";
import { TSectionProps, TSet } from "../types";
import { RowColorInput, RowSelect, RowToggle, Section } from ".";

export function VideoOptions({ data, setter }: TSectionProps<IVideoOptions>) {
  const handleChange: TSet<IVideoOptions> = (name, value) =>
    setter(p => ({ ...p, [name]: value }));
  return (
    <Section title="Video Options">
      <RowColorInput
        title="Background Color"
        name="bgColor"
        currentValue={data.bgColor}
        onChange={handleChange}
      />
      <RowSelect
        title="Output Resolution"
        options={OUTPUT_RESOLUTION_OPTIONS}
        name="outputResolution"
        currentValue={data.outputResolution}
        onChange={handleChange}
      />
      <RowToggle
        title="Override Background"
        name="overrideBackground"
        currentValue={data.overrideBackground}
        onChange={handleChange}
      />
      <RowSelect
        title="Output File Type"
        options={OUTPUT_FILE_TYPE_OPTIONS}
        name="outputFileType"
        currentValue={data.outputFileType}
        onChange={handleChange}
      />
      <RowSelect
        title="Video Codec"
        options={VIDEO_CODEC_OPTIONS}
        name="videoCodec"
        currentValue={data.videoCodec}
        onChange={handleChange}
      />
      <RowSelect
        title="Audio Codec"
        options={AUDIO_CODEC_OPTIONS}
        name="audioCodec"
        currentValue={data.audioCodec}
        onChange={handleChange}
      />
      <RowSelect
        title="Audio Bitrate"
        options={AUDIO_BITRATE_OPTIONS}
        name="audioBitrate"
        currentValue={data.audioBitrate}
        onChange={handleChange}
      />
    </Section>
  );
}
