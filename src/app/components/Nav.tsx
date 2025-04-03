'use client';

import Link from 'next/link';
import { useState, useEffect, } from 'react';
import { usePathname } from 'next/navigation';
import supabase from '../../utils/supabaseClient';
import { User } from "@supabase/supabase-js";
import { USER_ICON } from '../../../public/Icons/ReactIconsImport';
import { AccountModal } from '@/components/AccountModal';
import { signOut, } from '../../utils/auth';

export const Nav = () => {
  const pathname = usePathname();

  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [showAccModal, setShowAccModal] = useState<boolean>(false);

  const signOutAccount = ()=> {
    signOut();
    setShowAccModal(false);
    setUserInfo(null);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserInfo(user);
      }
    };

    checkUser();
  }, [pathname]);


  return (
    <div className='w-full fixed top-0 left-0 z-50 flex flex-row justify-between mx-16 mt-16'>
      <h1
        className={`text-3xl font-extrabold ${pathname === '/' ? 'text-ivoryBreeze' : 'text-deepBlue'}`}>
        MINDBRIDGE
      </h1>
      {pathname !== '/auth' &&
        <div className='flex flex-row gap-8 items-center text-deepBlue text-base'>
          <Link href='/' className="hover:text-gray-600">Home</Link>
          <Link href='/resources' className="hover:text-gray-600">Resources</Link>
          <Link href='/about' className="hover:text-gray-600">About</Link>
          <Link href='/contact' className="hover:text-gray-600">Contact Us</Link>
          {userInfo ?
            <Link href='#' className="text-3xl mr-32 hover:text-gray-600" onClick={() => setShowAccModal(true)}>{USER_ICON}</Link>
            :
            <Link href='/auth' className="hover:text-gray-600 mr-32">Sign in / Log in</Link>
          }
          {showAccModal && (
            <div className="fixed right-15 top-27 z-50">
              <AccountModal
                closeModal={() => setShowAccModal(false)}
                signOut={signOutAccount}
              />
            </div>
            )}
        </div>
      }
    </div>
  );
};

