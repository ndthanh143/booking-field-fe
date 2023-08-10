import { Pitch } from '../pitch/pitch.dto';
import { Rating } from '../rating/rating.dto';
import { BaseData, BasePaginationResponse, BaseResponse, PaginationQuery } from '@/common/dtos/base.dto';

export type VenuesResponse = BasePaginationResponse<Venue>;
export type VenueResponse = BaseResponse<Venue>;
export type SearchVenueResponse = BasePaginationResponse<SearchVenueData>;

export type Venue = {
  name: string;
  description: string;
  location: Location;
  address: string;
  province: string;
  district: string;
  price: Price;
  pitches: Pitch[];
  imageList: VenueImage[];
  ratings: Rating[];
  openAt: string;
  closeAt: string;
  slug: string;
} & BaseData;

export type Location = {
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
