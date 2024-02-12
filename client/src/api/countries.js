const API_URL = import.meta.env.VITE_COUNTRY_API;

export const getAllCountries = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
