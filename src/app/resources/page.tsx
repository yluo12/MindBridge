'use client';

import { useRef, useEffect, useState } from 'react';
import { SORT_ICON, MAP_ICON } from '../../../public/Icons/ReactIconsImport';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ServiceList } from './ServiceList';

// interface ResourcesProps {
//   // closeModal: () => void;
//   // signOut: () => void;
// }

export default function Resources() {
  const [sortHover, setSortHover] = useState(false);
  const [mapHover, setMapHover] = useState(false);

  return (
    <div className='mt-36'>
      <Nav />
      <div className='flex flex-row gap-6 justify-center items-center text-2xl text-deepBlue'>
        <span
          className='relative cursor-pointer hover:text-sandyBeige'
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
          className="w-3/4 text-lg px-4 py-2 rounded-lg text-deepBlue shadow border border-gray-300"
        />
        <span
          className='relative cursor-pointer hover:text-sandyBeige'
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
      <ServiceList />
    </div>
  );
};