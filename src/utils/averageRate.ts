import { Rating } from '@/services/rating/rating.dto';

export const averageRate = (data: Rating[]) => {
  return data.length > 0 ? data.reduce((acc, cur) => acc + Number(cur.rate), 0) / data.length : 0;
};
