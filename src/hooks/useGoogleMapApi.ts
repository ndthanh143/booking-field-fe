import { useContext } from 'react';
import { GoogleMapApiContext } from '@/components/GoogleMapAPIProvider';

export const useGoogleMapApi = () => {
  const isLoaded = useContext(GoogleMapApiContext);

  return { isLoaded };
};
