import { DayTimeSlot } from './interfaces';

const TIMESLOTS = [
  { from: '8:00', to: '10:00' },
  { from: '10:00', to: '12:00' },
  { from: '12:00', to: '14:00' },
  { from: '14:00', to: '16:00' },
  { from: '16:00', to: '18:00' },
  { from: '18:00', to: '20:00' },
];

const DAY = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
};

const convertToTimeslots = (days: number[]) => {
  return days.flatMap((day) =>
    TIMESLOTS.map((timeslot) => ({
      ...timeslot,
      day: `${day > 6 ? 'Next ' : ''}${DAY[day % 7]}`,
    })),
  );
};

interface StreamProduct {
  stream_product_ids: number[];
  container_product_ids: number[];
  postal_code_rule: (number) => boolean;
  available_timeslots: DayTimeSlot[];
}

interface LogisticProvider {
  name: string;
  stream_products: StreamProduct[];
}

const logistics_providers: LogisticProvider[] = [
  {
    name: 'Retransport',
    stream_products: [
      {
        stream_product_ids: [2, 3],
        container_product_ids: [4, 5, 6, 7],
        postal_code_rule: (code: number) => code >= 1500 && code <= 2000,
        available_timeslots: convertToTimeslots([0, 1, 3, 4, 7, 8, 10, 11]),
      },
      {
        stream_product_ids: [1, 4, 5, 6],
        container_product_ids: [1, 4, 5, 6, 7],
        postal_code_rule: (code: number) => code >= 1000 && code <= 1499,
        available_timeslots: convertToTimeslots([0, 1, 2, 3, 7, 8, 9, 10]),
      },
    ],
  },
  {
    name: 'GreenCollect',
    stream_products: [
      {
        stream_product_ids: [6, 7, 9, 10],
        container_product_ids: [1, 2, 3],
        postal_code_rule: (code: number) => code >= 1000 && code <= 1099,
        available_timeslots: convertToTimeslots([0, 2, 4, 7, 9]),
      },
    ],
  },
];

export default logistics_providers;
