import Image from "next/image";
import HERO_IMAGE from "../../../public/Images/hero.jpeg";
import { Nav } from '@/components/Nav';

export const Hero = () => {
  return (
    <div className="relative w-full h-screen p-6">
      <Nav />
      <div className="absolute inset-0">
      <Image
        src={HERO_IMAGE}
        alt="Supporting hands in sunset"
        layout="fill"
        className="object-cover object-center"
        priority
      />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center mx-16">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-outfit tracking-wider bg-gradient-to-r from-ivoryBreeze via-sandyBeige to-deepBlue bg-clip-text text-transparent">
          Find the Mental Health Support You Need
        </h1>
        <h3 className="w-3/5 font-medium text-2xl/7 md:text-2xl lg:text-3xl font-outfit text-deepBlue mt-10">
          Search for resources, connect with professionals, and get the support that matters.
        </h3>
        <input
          type="text"
          placeholder="Search for therapy, crisis support, community groups..."
          className="mt-16 w-3/4 text-lg px-4 py-4 rounded-lg bg-softPink text-deepBlue opacity-65 shadow-lg focus:bg-ivoryBreeze"
        />
      </div>
    </div>
  );
};