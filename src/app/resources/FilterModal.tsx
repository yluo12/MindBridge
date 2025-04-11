'use client';

import { useState, useRef, useEffect } from 'react';
import { FilterItem } from './FilterItem';
import { CLOSE_ICON } from '../../../public/Icons/ReactIconsImport';
import { SelectedFiltersType } from '../../types/types';

interface FilterModalProps {
  onClose: () => void;
  selectFilter: (column: keyof SelectedFiltersType, value: string) => void;
  selectedFilters: SelectedFiltersType;
  onReset: () => void;
  routePage: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ onClose, selectFilter, selectedFilters, onReset, routePage }) => {
  const [isAgeOpen, setIsAgeOpen] = useState(true);
  const [isMethodOpen, setIsMethodOpen] = useState(true);
  const [isGenderOpen, setIsGenderOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(true);
  const [isSpecialitiesOpen, setIsSpecialtiesOpen] = useState(true);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const filters = [
    {
      type: 'category',
      values: ['Private', 'Medi-Cal'],
      state: isCategoryOpen,
      updateState: setIsCategoryOpen,
    },
    {
      type: 'subcategory',
      values: ['Inpatient', 'Residential', 'PHP', 'IOP', 'Psychiatry', 'Therapist'],
      state: isSubcategoryOpen,
      updateState: setIsSubcategoryOpen,
    },
    {
      type: 'age',
      values: ['Toddler', 'Children', 'Preteen', 'Teen', 'Adults', 'Elders'],
      state: isAgeOpen,
      updateState: setIsAgeOpen,
    },
    {
      type: 'method',
      values: ['Virtual', 'In-person'],
      state: isMethodOpen,
      updateState: setIsMethodOpen,
    },
    {
      type: 'gender',
      values: ['Female', 'Male', 'All Gender'],
      state: isGenderOpen,
      updateState: setIsGenderOpen,
    },
    {
      type: 'specialties',
      values: ['Eating Disorder'],
      state: isSpecialitiesOpen,
      updateState: setIsSpecialtiesOpen,
    },
  ];

  const getFilterItem = () => {
    return (
      filters.map((filter, index) => (
        <FilterItem
          key={index}
          type={filter.type}
          values={filter.values}
          updateState={filter.updateState}
          state={filter.state}
          onSelect={selectFilter}
          selectedValues={selectedFilters[filter.type]}
        />
      ))
    );
  };

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
      className="w-1/3 left-16 top-4 bg-white z-50 relative text-deepBlue border border-gray-300 rounded-lg shadow-lg"
      ref={modalRef}
    >
      <div className='flex flex-row justify-between text-lg text-gray-600 font-bold border-b border-gray-300 bg-gray-100 px-6 py-3'>
        <span>Select a Filter</span>
        <span
          className='text-2xl cursor-pointer hover:text-gray-700'
          onClick={() => onClose()}
        >{CLOSE_ICON}</span>
      </div>
      <div className='px-6 py-1 max-h-[50%] overflow-y-auto'>
        {getFilterItem()}
        {/* <FilterItem
          filterType={'Category'}
          filterContent={['Private', 'Medi-Cal']}
          updateState={setIsCategoryOpen}
          typeState={isCategoryOpen}
          onSelect={selectFilter}
          selectedValues={selectedFilters.category}
        />
        <FilterItem
          filterType={'Subcategory'}
          filterContent={['Inpatient', 'Residential', 'PHP', 'IOP', 'Psychiatry', 'Therapist']}
          updateState={setIsSubcategoryOpen}
          typeState={isSubcategoryOpen}
          onSelect={selectFilter}
          selectedValues={selectedFilters.subcategory}
        />

        <FilterItem
          filterType={'Age'}
          filterContent={['Toddler', 'Children', 'Preteen', 'Teen', 'Adults', 'Elders']}
          updateState={setIsAgeOpen}
          typeState={isAgeOpen}
          onSelect={selectFilter}
          selectedValues={selectedFilters.age}
        />
        <FilterItem
          filterType={'Method'}
          filterContent={['Virtual', 'In-person']}
          updateState={setIsMethodOpen}
          typeState={isMethodOpen}
          onSelect={selectFilter}
          selectedValues={selectedFilters.method}
        />
        <FilterItem
          filterType={'Gender'}
          filterContent={['Female', 'Male', 'All Gender']}
          updateState={setIsGenderOpen}
          typeState={isGenderOpen}
          onSelect={selectFilter}
          selectedValues={selectedFilters.gender}
        />
        <FilterItem
          filterType={'Specialties'}
          filterContent={['Eating Disorder']}
          updateState={setIsSpecialtiesOpen}
          typeState={isSpecialitiesOpen}
          onSelect={selectFilter}
          selectedValues={selectedFilters.specialties}
        /> */}
      </div>
      <div className='flex justify-between px-6 pb-4 pt-3'>
        <button
          className='hover:text-gray-600 cursor-pointer'
          onClick={() => {
            onReset();
            onClose();
          }}
          >Clear all filters</button>
        <button
          className='text-white bg-deepBlue hover:bg-driftwoodHover cursor-pointer px-4 py-1.5 rounded-lg'
          onClick={() => {
            routePage();
            onClose();
          }}
        >Apply filters</button>
      </div>
    </div>
  );
};