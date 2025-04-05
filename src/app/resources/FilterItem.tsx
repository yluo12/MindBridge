import { DOWNARROW_ICON, UPPERARROW_ICON } from '../../../public/Icons/ReactIconsImport';

interface FilterItemProps {
  filterType: string;
  filterContent: string[];
  updateState: React.Dispatch<React.SetStateAction<boolean>>;
  typeState: boolean;
}

export const FilterItem: React.FC<FilterItemProps> = ({ filterType, filterContent, updateState, typeState }) => {

  return (
    <div className='border-b border-b-gray-300 py-4'>
      <div
        className='flex flex-row items-center gap-2 text-gray-600 font-medium cursor-pointer'
        onClick={() => {
          updateState((prev) => !prev);
        }}
      >
        <span>{filterType}</span>
        <button className=''>
          {typeState? UPPERARROW_ICON : DOWNARROW_ICON}
        </button>
      </div>
      {typeState && <div className='flex flex-wrap gap-2 pt-4 text-sm'>
        {filterContent.map((item, index) => (
          <span
            key={index}
            className='border border-gray-300 px-2.5 py-0.5 rounded-full cursor-pointer'>
            {item}
          </span>
        ))}
      </div>}
    </div>
  );
};