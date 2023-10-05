export const convertDistance = (distance: number) => {
  if (distance > 1) {
    return `${distance.toFixed(1)}km`;
  } else {
    return `${(distance * 1000).toFixed(0)}m`;
  }
};
