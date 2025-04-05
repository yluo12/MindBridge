import supabase from './supabaseClient';
import { ServiceType, FiltersType } from '../types/types';

export const getServices = async (filters: FiltersType, setList: React.Dispatch<React.SetStateAction<ServiceType[]>>) => {
  console.log('category from getServices, ', filters.category);
  console.log('subcategory from getServices, ', filters.subcategory);
  try {
    const query = supabase
      .from('service')
      .select('*');

      if (filters.category && filters.subcategory) {
        query.or(`category.is.null, category.cs.{${filters.category}},subcategory.is.null, subcategory.cs.{${filters.subcategory}}`);
      } else if (filters.category && !filters.subcategory) {
        query.or(`category.is.null, category.cs.{${filters.category}},subcategory.is.null`);
      } else if (!filters.category && filters.subcategory) {
        query.or(`category.is.null, subcategory.is.null, subcategory.cs.{${filters.subcategory}}`);
      } else {
        console.log('else block is invoked');
        // query.or(`category.is.null,subcategory.is.null`);
      }

    const {data, error} = await query;
    if (error) {
      console.error('Error fetching services:', error);
    } else {
      console.log('services from getServices: ', data);
      setList(data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};
