import { useState } from "preact/hooks";
import { QuickMode } from "./components/QuickMode";
import { AdvancedMode } from "./components/AdvancedMode";

export function App() {
  const [isQuickMode, setIsQuickMode] = useState(
    import.meta.env.VITE_APP_MODE === "quick"
  );

  return (
    <>
      {isQuickMode ? <QuickMode /> : <AdvancedMode />}
      <button
        onClick={() => setIsQuickMode(p => !p)}
        className={`fixed bottom-4 left-6 w-28 p-0 z-20 border-none rounded overflow-hidden shadow-lg flex flex-col justify-center items-center bg-gradient-to-r ${
          isQuickMode
            ? "from-purple-500 to-fuchsia-500"
            : "from-fuchsia-500 to-purple-500"
        } text-white text-lg`}
      >
        <span className="bg-white text-black w-full"> Mode:</span>{" "}
        {isQuickMode ? "Quick" : "Advanced"}
      </button>
      <Info />
    </>
  );
}

const Info = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div
      className="fixed top-2 left-2 bg-slate-100 rounded-full"
      onClick={() => setisOpen(p => !p)}
    >
      {isOpen ? (
        <ul className="flex flex-col gap-2 p-4 bg-slate-100 rounded-2xl">
          <li>kbp to ass file converter</li>
          <li>
            Layout and ffmpeg logic Based on python/qt app:{" "}
            <a
              className="underline text-blue-600"
              href="https://github.com/ItMightBeKaraoke/kbp2video/blob/main/kbp2video"
              target="_blank"
            >
              kbp2video by ItMightBeKaraoke
            </a>
          </li>
          <li>
            Using{" "}
            <a
              className="underline text-blue-600"
              href="https://github.com/Aeden-B/kbp2ass"
              target="_blank"
            >
              kbp2ass by Aeden-B, et al
            </a>
            , preact, tailwind, react-dropzone, and tauri
          </li>
        </ul>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      )}
    </div>
  );
};
