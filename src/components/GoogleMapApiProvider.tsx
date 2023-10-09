import { useLoadScript } from '@react-google-maps/api';
import { PropsWithChildren, createContext, useContext } from 'react';

type GoogleMapApiContextProps = {
  isLoaded: boolean;
};

export const GoogleMapApiContext = createContext<GoogleMapApiContextProps>({
  isLoaded: false,
});

export const GoogleMapApiProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    id: 'google-maps',
  });
  return <GoogleMapApiContext.Provider value={{ isLoaded }}>{children}</GoogleMapApiContext.Provider>;
};

export const useGoogleMapApi = () => useContext(GoogleMapApiContext);
