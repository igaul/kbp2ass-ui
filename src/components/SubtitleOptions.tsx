import { RowNumberInput, RowSelect, RowToggle, Section } from ".";
import { ASPECT_RATIO_OPTIONS, ISubtitleOptions } from "../constants";
import { TSectionProps, TSet } from "../types";

export function SubtitleOptions({
  data,
  setter,
}: TSectionProps<ISubtitleOptions>) {
  const handleChange: TSet<ISubtitleOptions> = (name, value) =>
    setter(p => ({ ...p, [name]: value }));
  return (
    <Section title="Subtitle Options">
      <RowSelect
        title="Aspect Ratio"
        options={ASPECT_RATIO_OPTIONS}
        currentValue={data.aspectRatio}
        name="aspectRatio"
        onChange={handleChange}
      />
      <RowNumberInput
        title="Fade In"
        name="fadeInMs"
        currentValue={data.fadeInMs}
        onChange={handleChange}
      />
      <RowNumberInput
        title="Fade Out"
        name="fadeOutMs"
        currentValue={data.fadeOutMs}
        onChange={handleChange}
      />
      <RowToggle
        title="Override Timestamp Offset"
        name="overrideTimestampOffset"
        currentValue={data.overrideTimestampOffset}
        onChange={handleChange}
      />
      <RowNumberInput
        title="Timestamp Offset"
        name="timestampOffsetMs"
        currentValue={data.timestampOffsetMs}
        onChange={handleChange}
      />
      <RowToggle
        title="Draw Background Color Transparent"
        name="drawBgColorTransparent"
        currentValue={data.drawBgColorTransparent}
        onChange={handleChange}
      />
    </Section>
  );
}
