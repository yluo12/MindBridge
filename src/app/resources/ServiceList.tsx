'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { LOCATION_ICON, } from '../../../public/Icons/ReactIconsImport';
import { ServiceType } from '../../types/types';

interface ServiceListProps {
  services: ServiceType[];
}

interface ServiceCardProps {
  service: ServiceType;
}

export const ServiceList: React.FC<ServiceListProps> = ({ services }) => {

  return (
    <div className="w-full flex flex-col gap-8">
      {services.map((service, index)=>
        <ServiceCard
          key={index}
          service={service}
        />
      )}
    </div>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  console.log('service: ', service);
  return (
    <div className="border border-gray-300 bg-white hover:bg-gray-100 cursor-pointer shadow-lg rounded-lg z-50 flex flex-row gap-6 p-3">
      <Image
        src={service.image}
        alt={`${service.name} picture`}
        width={200}
        height={200}
        className="w-1/2 h-auto"
        priority
      />
      <div className='text-deepBlue flex flex-col gap-2 m-4'>
        <p className='text-lg font-medium text-gray-600'>{service.name}</p>
        <div className='flex flex-row gap-2 my-2'>
          {service.subcategory?.map((tag, index) => (
            <span
              key={index}
              className='text-sm py-0.5 px-1.5 bg-rose-200 rounded-lg'
            >
              {tag}
            </span>
          ))}
          <span
            className='text-sm py-0.5 px-1.5 bg-yellow-100 rounded-lg'
          >
            {service.gender}
          </span>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          {LOCATION_ICON}
          <span className='text-sm'>{service['region_county']}</span>
        </div>
        <p className='text-medium line-clamp-3'>{service.description}</p>
      </div>
    </div>
  );
};