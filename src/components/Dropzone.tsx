import { useCallback } from "preact/hooks";
import { useDropzone } from "react-dropzone";
const accept = {
  "text/plain": [".kbp"],
};
export function Dropzone({ onFiles }: { onFiles: (files: File[]) => void }) {
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
    <div {...getRootProps()}>
      <input {...(getInputProps() as any)} />
      <p className="p-8 min-w-[350px] h-52 flex flex-col justify-center items-center">
        {isDragActive ? (
          <span>Drop Here</span>
        ) : (
          <span>
            Drop kbp files here
            <br /> or click to select files
          </span>
        )}
      </p>
    </div>
  );
}
