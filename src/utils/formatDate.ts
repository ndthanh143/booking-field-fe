import moment from 'moment';

export const formatDate = (date: Date) => {
  return moment(date).format('L');
};

export const formatDateWithoutYear = (date: Date) => {
  return moment(date).format('DD-MM');
};

export const formatDateWithTime = (date: Date) => {
  return moment(date).format('llll');
};

export const formatDateToTime = (date: Date) => {
  return moment(date).format('HH:mm');
};

export const getRelativeTimeFromNow = (date: Date) => {
  return moment(date).fromNow();
};
