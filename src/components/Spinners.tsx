export const BounceSpin = () => (
  <div className="fixed inset-0 h-screen w-screen bg-gray-300/50 z-30 flex justify-center items-center">
    <div className="flex animate-bounce gap-8">
      <div className="animate-spin rounded-full border-r-8 border-blue-700 w-16 h-10 bg-gradient-to-l from-blue-700 to-red-600"></div>
      <div className="animate-bounce rounded-full border-b-8 bg-gradient-to-t from-fuchsia-800 to-orange-600 border-fuchsia-900 w-12 h-12 bg-purple-600"></div>
      <div className="animate-spin rounded-full border-l-8 border-red-700 w-16 h-10 bg-gradient-to-l from-purple-600 to-red-700"></div>
    </div>
  </div>
);
