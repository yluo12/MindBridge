export function profilePicGenerator(name: string) {
  const firstLetter = name[0];
  return (
    <div className="h-[65px] w-[65px] rounded-full bg-indigo-500 text-white font-medium text-4xl flex justify-center items-center">
      <p className="">{firstLetter}</p>
    </div>);
};

export const capitalize = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};