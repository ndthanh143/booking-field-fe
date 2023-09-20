import { vi_account } from './account';
import { vi_booking } from './booking';
import { vi_home } from './home';
import { vi_search } from './search';
import { vi_tournament } from './tournament';
import { vi_venue_detail } from './venue-detail';

const vi = {
  ...vi_home,
  ...vi_search,
  ...vi_venue_detail,
  ...vi_tournament,
  ...vi_booking,
  ...vi_account,
};

export default vi;
