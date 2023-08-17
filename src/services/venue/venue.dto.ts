import { Pitch } from '../pitch/pitch.dto';
import { Rating } from '../rating/rating.dto';
import { BaseData, BasePaginationResponse, BaseResponse } from '@/common/dtos/base.dto';

export type VenuesResponse = BasePaginationResponse<Venue>;
export type VenueResponse = BaseResponse<Venue>;
export type SearchVenueResponse = BasePaginationResponse<SearchVenueData>;

export type UpdateVenuePayload = {
  id: number;
  data: UpdateVenueData;
};

export type UpdateVenueData = {
  name?: string;
  description?: string;
  address?: string;
  province?: string;
  district?: string;
  openAt?: string;
  closeAt?: string;
  imageList?: VenueImage[];
  location?: LocationMap;
};

export type Venue = {
  name: string;
  description: string;
  location: LocationMap;
  address: string;
  province: string;
  district: string;
  pitches: Pitch[];
  imageList: VenueImage[];
  ratings: Rating[];
  openAt: string;
  closeAt: string;
  slug: string;
} & BaseData;

export type LocationMap = {
  lat: number;
  lng: number;
};

export type Price = {
  type: string;
  pricePerHour: number;
};

export type SearchVenueData = Venue & {
  price: number;
  category_id: number;
};

export type VenueImage = {
  imagePath: string;
};

export type VenueQuery = {
  keyword: string;
};
