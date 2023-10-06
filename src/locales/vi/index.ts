import { vi_account } from './account';
import { vi_booking } from './booking';
import { vi_common } from './common';
import { vi_home } from './home';
import { vi_register_venue } from './register-venue';
import { vi_search } from './search';
import { vi_tournament } from './tournament';
import { vi_venue_detail } from './venue-detail';
import { vi_venue_management } from './venue-management';

const vi = {
  ...vi_common,
  ...vi_home,
  ...vi_search,
  ...vi_venue_detail,
  ...vi_tournament,
  ...vi_booking,
  ...vi_account,
  ...vi_register_venue,
  ...vi_venue_management,
};

export default vi;
