'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SORT_ICON, MAP_ICON, CLOSE_ICON } from '../../../public/Icons/ReactIconsImport';
import { Nav } from '@/components/Nav';
import { ServiceList } from './ServiceList';
import { FilterModal } from './FilterModal';
import { Background } from '@/components/Background';
import { getServices } from '../../utils/supabaseService';
import { ServiceType, FiltersType, SelectedFiltersType } from '../../types/types';

interface FilterBubbleProps {
  type: string;
  filter: string | null;
}

export default function Resources() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

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

  const selectFilter = (column: keyof SelectedFiltersType, value: string) => {
    const selectedValues = selectedFilters[column];
    if (column === 'Gender') {
      selectedFilters.gender = selectedFilters.gender === value ? '' : value;
    } else {
      if (selectedValues.includes(value)) {
        console.log('pop value');
      } else {
        console.log('add value');
      }
    }
  };

  const closeFilterModal = () => {
    setFilterModal(false);
  }

  useEffect(() => {
    const filters: FiltersType = {
      category: category,
      subcategory: subcategory,
    };
    const fetchData = async () => {
      setLoadingServices(true);
      await getServices(filters, setServices);
      setLoadingServices(false);
    };
    fetchData();
  }, [category, subcategory]);

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
                <FilterModal onClose={closeFilterModal}/>
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

        <div className='mb-8'>
          {category !== null && <FilterBubble type={'Category'} filter={category}/>}
          {subcategory !== null && <FilterBubble type={'Subcategory'} filter={subcategory}/>}
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

const FilterBubble: React.FC<FilterBubbleProps> = ({ type, filter }) => {

  return (
    <div
      className='flex flex-row items-center gap-2 z-20 px-1.5 py-1 text-gray-400 text-sm bg-white border border-gray-200 w-fit rounded-lg relative shadow'
    >
      {`${type}: ${filter}`}
      <span
        className='cursor-pointer hover:text-gray-500 text-lg'
        onClick={() => {}}
      >
        {CLOSE_ICON}
      </span>
    </div>
  );
};