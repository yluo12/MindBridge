import supabase from './supabaseClient';

export const getServices = async (searchTerm: string | '', column: string | '', setList) => {
  try {
    const { data, error } = await supabase
      .from('service')
      .select('*')
      .contains(column, [searchTerm]);

    if (error) {
      console.error('Error fetching services:', error);
    } else {
      console.log('services by category: ', data);
      setList(data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};
