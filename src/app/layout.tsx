import { ReactNode } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Nav /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
