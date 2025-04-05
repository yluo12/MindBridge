'use client';
import { useRouter } from "next/navigation";
import { Background } from './Background';
import { HOUSE_ICON, HOSPITAL_ICON, PSYCHIATRY_ICON, THERAPISTS_ICON, MEDICAL_ICON, OUTPATIENT_ICON } from '../../../public/Icons/ReactIconsImport';

export const Categories = () => {
  const router = useRouter();

  const serviceHandler = (service: string): React.MouseEventHandler<HTMLDivElement> => {
    return (e) => {
      e.preventDefault();
      if(service === 'Medi-Cal') {
        router.push(`/resources?category=${encodeURIComponent(service)}`);
      } else {
        router.push(`/resources?subcategory=${encodeURIComponent(service)}`);
      }
    }
  };

  const getIcon = (service: string): React.ReactNode => {
    switch(service) {
      case 'Residential':
        return HOSPITAL_ICON;
      case 'PHP':
        return HOUSE_ICON;
      case 'IOP':
        return OUTPATIENT_ICON;
      case 'Psychiatry':
        return PSYCHIATRY_ICON;
      case 'Therapists':
        return THERAPISTS_ICON;
      case 'Medi-Cal':
        return MEDICAL_ICON;
      default:
        return null;
    }
  };

  const services = ['Residential', 'PHP', 'IOP', 'Psychiatry', 'Therapists', 'Medi-Cal'];


  return (
    <div className="relative w-full h-[60vh] mb-16">
      <Background />
      <div className="flex flex-col justify-center items-center mt-16">
        <h2 className="font-medium text-2xl/7 md:text-2xl lg:text-3xl font-roboto text-deepBlue">Services & Providers</h2>
        <div className="grid grid-rows-2 grid-cols-3 gap-x-36 gap-y-12 h-auto mt-12 text-deepBlue">
          {services.map((service, index) => (
              <div key={index}
                className="flex flex-col items-center justify-center gap-4 border border-gray-300 shadow-lg rounded-lg bg-white hover:bg-gray-100 cursor-pointer w-[180px] h-[180px] z-30"
                onClick={serviceHandler(service)}
              >
                <span className='text-4xl'>{getIcon(service)}</span>
                {service}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};