import { Booking } from '@/services/booking/booking.dto';
export type FreeTimeBooking = {
  id: number;
  startTime: number;
  endTime: number;
};

export const dateToTimeFloat = (date: Date) => {
  const hour = date.getHours();

  const min = date.getMinutes();

  return hour + min / 60;
};

export const findFreeTime = (bookings: Booking[]) => {
  if (bookings.length === 0) {
    return [
      {
        id: -1,
        startTime: 0,
        endTime: 24,
      },
    ];
  }

  const freeTimeBookings: FreeTimeBooking[] = bookings.reduce(
    (acc: FreeTimeBooking[], booking: Booking, index: number, bookings: Booking[]) => {
      const { startTime, endTime } = booking;

      const start = dateToTimeFloat(new Date(startTime));

      if (index === 0) {
        if (start > 0) {
          acc.push({
            id: -1,
            startTime: 0,
            endTime: start,
          });
        }
      } else {
        const previousBooking = bookings[index - 1];
        const previousEndTime = dateToTimeFloat(new Date(previousBooking.endTime));

        if (start > previousEndTime) {
          acc.push({
            id: -1,
            startTime: previousEndTime,
            endTime: start,
          });
        }
      }

      acc.push({
        id: booking.id,
        startTime: dateToTimeFloat(new Date(booking.startTime)),
        endTime: dateToTimeFloat(new Date(endTime)),
      });

      return acc;
    },
    [],
  );

  const lastInterval = bookings[bookings.length - 1];
  const lastEndTime = dateToTimeFloat(new Date(lastInterval.endTime));

  if (lastEndTime < 24) {
    freeTimeBookings.push({
      id: -1,
      startTime: lastEndTime,
      endTime: 24,
    });
  }

  return freeTimeBookings;
};
