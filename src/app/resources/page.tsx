'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SORT_ICON, MAP_ICON } from '../../../public/Icons/ReactIconsImport';
import { Nav } from '@/components/Nav';
import { ServiceList } from './ServiceList';
import { Background } from '@/components/Background';
import { getServices } from '../../utils/supabaseService';
import { ServiceType } from '../../types/types';

export default function Resources() {
  const searchParams = useSearchParams();
  const service = searchParams.get('category');

  const [sortHover, setSortHover] = useState(false);
  const [mapHover, setMapHover] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  console.log('service here: ', service);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingServices(true);
      if (service === null) {
        await getServices('', '', setServices);
      } else if (service === 'Medi-Cal') {
        await getServices('Medical', 'category', setServices);
      } else {
        await getServices(service, 'subcategory', setServices);
      }
      setLoadingServices(false);
    };
    fetchData();
  }, [service]);

  return (
    <div className='mt-36 relative'>
      <Background />
      <Nav />
      <div className='mx-36 z-10'>
        <div className='flex flex-row gap-8 justify-between items-center text-deepBlue mb-12'>
          <span
            className='relative cursor-pointer text-3xl hover:text-sandyBeige'
            onMouseEnter={()=>setSortHover(true)}
            onMouseLeave={()=>setSortHover(false)}
            onClick={() => {}}
          >
            {SORT_ICON}
            {sortHover &&
              <div className='absolute top-8 -right-7 w-[86px] h-[30px] bg-gray-400 shadow rounded text-white text-center flex items-center justify-center'>
                <p className='text-xs'>Sort services</p>
              </div>
            }
          </span>
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