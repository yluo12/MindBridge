import Link from 'next/link';

export const Footer = () => {
  return (
    <footer>
      <div>
        <Link href='/about' className="">About</Link>
        <Link href='/contact' className="">Contact Us</Link>
      </div>
      <p>Copyright © 2025 MINDBRIDGE, Inc.</p>
    </footer>
  );
};