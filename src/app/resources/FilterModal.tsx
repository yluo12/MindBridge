'use client';

import { useState, useRef, useEffect } from 'react';
import { FilterItem } from './FilterItem';
import { CLOSE_ICON } from '../../../public/Icons/ReactIconsImport';

interface FilterModalProps {
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  const [isAgeOpen, setIsAgeOpen] = useState(true);
  const [isMethodOpen, setIsMethodOpen] = useState(true);
  const [isGenderOpen, setIsGenderOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(true);
  const [isSpecialitiesOpen, setIsSpecialtiesOpen] = useState(true);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-1/3 left-16 top-28 bg-white z-50 relative text-deepBlue border border-gray-300 rounded-lg shadow-lg"
      ref={modalRef}
    >
      <div className='flex flex-row justify-between text-lg text-gray-600 font-bold border-b border-gray-300 bg-gray-100 px-6 py-3'>
        <span>Select a Filter</span>
        <span
          className='text-2xl cursor-pointer hover:text-gray-700'
          onClick={() => onClose()}
        >{CLOSE_ICON}</span>
      </div>
      <div className='px-6 py-1 max-h-[480px] overflow-y-scroll'>
        <FilterItem
          filterType={'Category'}
          filterContent={['Private', 'Medi-Cal']}
          updateState={setIsCategoryOpen}
          typeState={isCategoryOpen}
        />
        <FilterItem
          filterType={'Subcategory'}
          filterContent={['Inpatient', 'Residential', 'PHP', 'IOP', 'Psychiatry', 'Therapist']}
          updateState={setIsSubcategoryOpen}
          typeState={isSubcategoryOpen}
        />

        <FilterItem
          filterType={'Age'}
          filterContent={['Toddler', 'Children', 'Preteen', 'Teen', 'Adults', 'Elders']}
          updateState={setIsAgeOpen}
          typeState={isAgeOpen}
        />
        <FilterItem
          filterType={'Method'}
          filterContent={['Virtual', 'In-person']}
          updateState={setIsMethodOpen}
          typeState={isMethodOpen}
        />
        <FilterItem
          filterType={'Gender'}
          filterContent={['Female', 'Male', 'All Gender']}
          updateState={setIsGenderOpen}
          typeState={isGenderOpen}
        />
        <FilterItem
          filterType={'Specialties'}
          filterContent={['Eating Disorder']}
          updateState={setIsSpecialtiesOpen}
          typeState={isSpecialitiesOpen}
        />
      </div>
      <div className='flex justify-between px-6 pb-4 pt-3'>
        <button className='hover:text-gray-600 cursor-pointer'>Clear all filters</button>
        <button className='text-white bg-deepBlue hover:bg-driftwoodHover cursor-pointer px-4 py-1.5 rounded-lg'>Apply filters</button>
      </div>
    </div>
  );
};