export function Background () {

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 blur-[120px] opacity-50"></div>
      <div className="absolute right-8 top-8 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-[120px] opacity-50"></div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 blur-[120px] opacity-50"></div>
     </div>
  );
};