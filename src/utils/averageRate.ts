import { Rating } from '@/services/rating/rating.dto';

export const averageRate = (data: Rating[]) => {
  return data.length > 0
    ? (data.reduce((acc, cur) => acc + Number((cur.qualityRate + cur.serviceRate) / 2), 0) / data.length).toFixed(1)
    : 0;
};

export const averageServiceRate = (data: Rating[]) => {
  return data.length > 0
    ? (data.reduce((acc, cur) => acc + Number((cur.serviceRate + cur.serviceRate) / 2), 0) / data.length).toFixed(1)
    : 0;
};

export const averageQualityRate = (data: Rating[]) => {
  return data.length > 0
    ? (data.reduce((acc, cur) => acc + Number((cur.qualityRate + cur.qualityRate) / 2), 0) / data.length).toFixed(1)
    : 0;
};
