import { vi_home } from './home';
import { vi_search } from './search';
import { vi_venue_detail } from './venue-detail';

const vi = {
  ...vi_home,
  ...vi_search,
  ...vi_venue_detail,
};

export default vi;
