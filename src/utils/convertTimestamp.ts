export default function convertToAMPM(timestamp: string) {
  const [hours, minutes, _] = timestamp.split(':').map(Number);
  let period = 'AM';

  let hoursFormat = 0;

  if (hours >= 12) {
    period = 'PM';
    if (hours > 12) {
      hoursFormat = hours - 12;
    }
  }

  return `${hoursFormat.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${period}`;
}
