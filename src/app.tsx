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
    </>
  );
}
