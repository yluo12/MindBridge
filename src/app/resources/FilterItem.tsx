import { DOWNARROW_ICON, UPPERARROW_ICON } from '../../../public/Icons/ReactIconsImport';
import { SelectedFiltersType } from '../../types/types';
import { capitalize } from '../../utils/helper';

interface FilterItemProps {
  type: string;
  values: string[];
  updateState: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
  onSelect: (column: keyof SelectedFiltersType, value: string) => void;
  selectedValues: string | string[];
}

export const FilterItem: React.FC<FilterItemProps> = ({ type, values, updateState, state, onSelect, selectedValues }) => {

  const selectValue = (column: string, value: string) => {
    onSelect(column, value);
  };

  const isSelected = (column: string, value: string) => {
    if (column === 'gender') {
      return value === selectedValues;
    } else {
      return selectedValues?.includes(value);
    }
  };

  return (
    <div className='border-b border-b-gray-300 py-4'>
      <div
        className='flex flex-row items-center gap-2 text-gray-600 font-medium cursor-pointer'
        onClick={() => {
          updateState((prev) => !prev);
        }}
      >
        <span>{capitalize(type)}</span>
        <button className=''>
          {state? UPPERARROW_ICON : DOWNARROW_ICON}
        </button>
      </div>
      {state && <div className='flex flex-wrap gap-2 pt-4 text-sm'>
        {values.map((item, index) => (
          <span
            key={index}
            onClick={() => selectValue(type.toLowerCase(), item)}
            className={`border border-gray-300 px-2.5 py-0.5 rounded-full cursor-pointer ${isSelected(type, item) ? 'bg-driftwood text-white' : ''}`}>
            {item}
          </span>
        ))}
      </div>}
    </div>
  );
};