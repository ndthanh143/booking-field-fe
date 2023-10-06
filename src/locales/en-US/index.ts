import { enUS_account } from './account';
import { enUS_booking } from './booking';
import { enUS_common } from './common';
import { enUS_home } from './home';
import { enUS_register_venue } from './register-venue';
import { enUS_search } from './search';
import { enUS_tournament } from './tournament';
import { enUS_venue_detail } from './venue-detail';
import { en_US_venue_management } from './venue-management';

const en_US = {
  ...enUS_common,
  ...enUS_home,
  ...enUS_search,
  ...enUS_venue_detail,
  ...enUS_tournament,
  ...enUS_booking,
  ...enUS_account,
  ...enUS_register_venue,
  ...en_US_venue_management,
};

export default en_US;
