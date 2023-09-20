import { enUS_account } from './account';
import { enUS_booking } from './booking';
import { enUS_home } from './home';
import { enUS_search } from './search';
import { enUS_tournament } from './tournament';
import { enUS_venue_detail } from './venue-detail';

const en_US = {
  ...enUS_home,
  ...enUS_search,
  ...enUS_venue_detail,
  ...enUS_tournament,
  ...enUS_booking,
  ...enUS_account,
};

export default en_US;
