export const acronym = (inputString: string) => {
  const words = inputString.split(' ');
  const acronym = words.map((word) => word.charAt(0).toUpperCase()).join('');
  return acronym;
};
