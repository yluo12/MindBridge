'use client';

import { useRef, useEffect } from 'react';
import { CLOSE_ICON, } from '../../../public/Icons/ReactIconsImport';
import { profilePicGenerator }  from '../../utils/helper';


interface AccountModalProps {
  closeModal: () => void;
  signOut: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ closeModal, signOut }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="h-[240px] w-[380px] p-6 bg-white rounded-lg shadow-lg relative flex flex-col justify-center items-center gap-8 z-50"
      ref={modalRef}
    >

      <span
        className='absolute top-4 right-4 text-lg cursor-pointer'
        onClick={closeModal}
      >
        {CLOSE_ICON}
      </span>
      <div className='relative h-[65px] w-[65px] rounded-full overflow-hidden'>
        {profilePicGenerator('Yan')}
        <button className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-400 text-white text-xs px-4.5 py-0.5 cursor-pointer'>edit</button>
      </div>
      <div className='flex flex-row gap-6 items-center text-deepBlue'>
        <p>yantingluo98@gmail.com</p>
      </div>

      <div className='flex gap-8 text-white font-medium'>
        <button className='bg-driftwood hover:bg-softPink rounded-lg px-3 py-1.5 shadow cursor-pointer'>Manage Account</button>
        <button
          className='bg-deepBlue hover:bg-gray-400 rounded-lg px-3 py-1.5 shadow cursor-pointer'
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>

    </div>
  );
}