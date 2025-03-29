'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <div className='w-full fixed top-0 left-0 z-50 flex flex-row justify-between mx-16 mt-16'>
      <h1
        className={`text-3xl font-extrabold ${pathname === '/' ? 'text-ivoryBreeze' : 'text-deepBlue'}`}>
        MINDBRIDGE
      </h1>
      {pathname !== '/auth' &&
        <div className='flex flex-row gap-8 text-deepBlue text-base'>
          <Link href='/' className="hover:text-gray-600 hover:font-medium">Home</Link>
          <Link href='/resources' className="hover:text-gray-600 hover:font-medium">Resources</Link>
          <Link href='/about' className="hover:text-gray-600 hover:font-medium">About</Link>
          <Link href='/contact' className="hover:text-gray-600 hover:font-medium">Contact Us</Link>
          <Link href='/auth' className="hover:text-gray-600 hover:font-medium mr-32">Sign in / Log in</Link>
        </div>
      }
    </div>
  );
};

