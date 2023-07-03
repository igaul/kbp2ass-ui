import { PropsWithChildren } from "preact/compat";
import { useCallback } from "preact/hooks";
import { useDropzone } from "react-dropzone";
const accept = {
  "text/plain": [".kbp"],
};
const containerProps = { className: "h-full" };
type TProps = PropsWithChildren<{
  onFiles: (files: File[]) => void;
  isDroppingText?: string;
}>;
export function Dropzone({
  onFiles,
  isDroppingText = "Drop Here",
  children,
}: TProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFiles(acceptedFiles);
  }, []);
  // ? options type wants optional params ?
  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div {...getRootProps(containerProps)}>
      <input {...(getInputProps() as any)} />
      <p className="p-10 min-w-[350px] h-full flex flex-col justify-center items-center">
        {isDragActive ? (
          <span className="p-3 text-xl font-semibold">{isDroppingText}</span>
        ) : (
          children
        )}
      </p>
    </div>
  );
}
