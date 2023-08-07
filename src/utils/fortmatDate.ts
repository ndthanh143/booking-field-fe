import moment from 'moment';

export const formatDate = (value: Date, type: string) => {
  return moment(value).format(type);
};
