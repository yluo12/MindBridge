export type ServiceType = {
  id: number;
  name: string;
  method: string;
  age: string;
  gender: string;
  category: string[];
  subcategory: string[];
  address: string;
  city: string;
  "region_county": string;
  fax: string;
  email: string;
  website: string;
  description: string;
  specialities: string[];
  image: string;
};

export type FiltersType = {
  category: string | null;
  subcategory: string | null;
};

export type SelectedFiltersType = {
  category: string[];
  subcategory: string[];
  age: string[];
  method: string[];
  gender: string;
  specialities: string[];
  [key: string]: string[] | string;
};