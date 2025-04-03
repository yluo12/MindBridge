import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full h-[25vh] flex flex-col justify-center items-center gap-8 bg-gray-100 text-deepBlue mt-24">
      <div className='flex flex-row gap-16'>
        <Link href='/about' className="">About</Link>
        <Link href='/resources' className="">Resources</Link>
        <Link href='/contact' className="">Contact Us</Link>
      </div>
      <p className='text-center'>Copyright © 2025 MINDBRIDGE, Inc.</p>
    </footer>
  );
};