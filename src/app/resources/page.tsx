'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SORT_ICON, MAP_ICON, CLOSE_ICON } from '../../../public/Icons/ReactIconsImport';
import { Nav } from '@/components/Nav';
import { ServiceList } from './ServiceList';
import { FilterModal } from './FilterModal';
import { Background } from '@/components/Background';
import { getServices } from '../../utils/supabaseService';
import { ServiceType, FiltersType, SelectedFiltersType, UpdateRouteFunction } from '../../types/types';

interface FilterBubbleProps {
  type: string;
  values: string[] | string | null;
  updateRoute: (column: string) => void;
};

const getFilterBubble = (type: string, values: string | string[], updateRoute: UpdateRouteFunction) => {
  if (!values || !values.length) {
    return null;
  }
  return <FilterBubble type={type} values={values} updateRoute={updateRoute}/>
};

export default function Resources() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.getAll('category');
  const subcategory = searchParams.getAll('subcategory');
  const method = searchParams.getAll('method');
  const age = searchParams.getAll('age');
  const gender = searchParams.getAll('gender');
  const specialities = searchParams.getAll('specialities');

  const [filterModal, setFilterModal] = useState(false); // control the visibility of the filter modal
  const [sortHover, setSortHover] = useState(false); // control the visibility of the sort popup
  const [mapHover, setMapHover] = useState(false); // control the visibility of the sort popup
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loadingServices, setLoadingServices] = useState(false); // control the visibility of the loading message
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({
    category: [],
    subcategory:[],
    age: [],
    method: [],
    gender: '',
    specialities: []
  });
  const [appliedFilters, setAppliedFilters] = useState<SelectedFiltersType>({
    category: [],
    subcategory:[],
    age: [],
    method: [],
    gender: '',
    specialities: []
  });

  // select or deselect the values clicked in filterModal
  const selectFilter = (column: keyof SelectedFiltersType, value: string) => {
    setSelectedFilters((prev) => {
      const currentValue = prev[column];
      // For 'gender' (a string)
      if (column === 'gender' && typeof currentValue === 'string') {
        return {
          ...prev,
          gender: currentValue === value ? '' : value,
        };
      }
      // For array-type filters
      if (Array.isArray(currentValue)) {
        const isSelected = currentValue.includes(value);
        const updatedArray = isSelected
          ? currentValue.filter((v) => v !== value) // remove
          : [...currentValue, value]; // add
        return {
          ...prev,
          [column]: updatedArray,
        };
      }
      return prev;
    });
  };

  const routePage = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // If the filter is an array, append each value
        value.forEach((item) => {
          if (item && !currentParams.getAll(key).includes(item)) {
            currentParams.append(key, item);  // Add only if it's not already in the query
          }
        });
      } else if (value) {
        // If it's a string, just append the value
        if (!currentParams.has(key)) {
          currentParams.set(key, value);  // Use set to ensure only one value
        }
      }
    });
    setAppliedFilters(selectedFilters);
    router.push(`/resources?${currentParams.toString()}`);
  };

  const updateRouteFromBubble = (column: string) =>{
    const currentParams = new URLSearchParams(searchParams.toString());
    const columnLowerCase = column.toLowerCase();
    setSelectedFilters((prev) => {
      if (columnLowerCase === 'gender') {
        return {
          ...prev,
          [columnLowerCase]: ''
        };
      } else {
        return {
          ...prev,
          [columnLowerCase]: []
        };
      }
      });
    // Remove the 'subcategory' parameter
    currentParams.delete(columnLowerCase);

    // Update the URL without reloading the page
    router.push(`/resources?${currentParams.toString()}`);
  };

  const resetFilters = () => {
    setSelectedFilters({
      category: [],
      subcategory:[],
      age: [],
      method: [],
      gender: '',
      specialities: []
    });
    router.push(`/resources`);
  };

  const closeFilterModal = () => {
    setFilterModal(false);
  }

  useEffect(() => {
    setAppliedFilters((prev) => ({
      ...prev,
      category: category ? category : [],
      subcategory: subcategory ? subcategory : [],
    }));
    setSelectedFilters((prev) => ({
      ...prev,
      category: category ? category : [],
      subcategory: subcategory ? subcategory : [],
    }));
    const filters: FiltersType = {
      'category': category,
      'subcategory': subcategory,
    };
    const fetchData = async () => {
      setLoadingServices(true);
      await getServices(filters, setServices);
      setLoadingServices(false);
    };
    fetchData();
  }, []);

  return (
    <div className='mt-36 relative'>
      <Background />
      <Nav />
      <div className='mx-36 z-10'>
        <div className='flex flex-row gap-8 justify-between items-center text-deepBlue mb-4'>
          <div className='relative'>
            <button
              className='cursor-pointer text-3xl hover:text-sandyBeige'
              onMouseEnter={()=>setSortHover(true)}
              onMouseLeave={()=>setSortHover(false)}
              onClick={() => setFilterModal(true)}
              disabled={filterModal}
            >
              {SORT_ICON}
            </button>
            {sortHover &&
              <div className='absolute top-8 -right-7 w-[86px] h-[30px] bg-gray-400 shadow rounded text-white text-center flex items-center justify-center'>
                <p className='text-xs'>Sort services</p>
              </div>
            }
            {filterModal && (
              <div className="fixed inset-0 flex items-center h-screen z-50">
                <FilterModal
                  onClose={closeFilterModal}
                  selectFilter={selectFilter}
                  selectedFilters={selectedFilters}
                  onReset={resetFilters}
                  routePage={routePage}
                />
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow text-lg px-4 py-2 rounded-lg text-deepBlue shadow border border-gray-300"
          />
          <span
            className='relative cursor-pointer text-3xl hover:text-sandyBeige'
            onMouseEnter={()=>setMapHover(true)}
            onMouseLeave={()=>setMapHover(false)}
            onClick={() => {}}
          >
            {MAP_ICON}
            {mapHover &&
              <div className='absolute top-8 -right-15 w-[130px] h-[30px] bg-gray-400 shadow rounded text-white text-center flex items-center justify-center'>
                <p className='text-xs'>Show services in Map</p>
              </div>
            }
          </span>
        </div>

        <div className='mb-8 flex flex-row gap-4'>
          {getFilterBubble('Method', method, updateRouteFromBubble)}
          {getFilterBubble('Category', category, updateRouteFromBubble)}
          {getFilterBubble('Subcategory', subcategory, updateRouteFromBubble)}
          {getFilterBubble('Age', age, updateRouteFromBubble)}
          {getFilterBubble('Gender', gender, updateRouteFromBubble)}
          {getFilterBubble('Specialities', specialities, updateRouteFromBubble)}
        </div>
        {services.length ?
          <ServiceList
            services={services}
          />
        :
        (loadingServices ?
          <div className='text-deepBlue'>Loading Services</div>
        :
          <div className='text-deepBlue'>
            No services matched the searched criterias.
          </div>
        )}
      </div>
    </div>
  );
};

const FilterBubble: React.FC<FilterBubbleProps> = ({ type, values, updateRoute }) => {

  return (
    <div
      className='flex flex-row items-center gap-2 z-20 px-1.5 py-1 text-gray-400 text-sm bg-white border border-gray-200 w-fit rounded-lg relative shadow'
    >
      {`${type}: ${values}`}
      <span
        className='cursor-pointer hover:text-gray-500 text-lg'
        onClick={() => {updateRoute(type)}}
      >
        {CLOSE_ICON}
      </span>
    </div>
  );
};