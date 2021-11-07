import { DayTimeSlot, TimeSlot } from './interfaces';

const TIMESLOTS: TimeSlot[] = [
  { startHour: 8, finishHour: 10 },
  { startHour: 10, finishHour: 12 },
  { startHour: 12, finishHour: 14 },
  { startHour: 14, finishHour: 16 },
  { startHour: 16, finishHour: 18 },
  { startHour: 18, finishHour: 20 },
  { startHour: 20, finishHour: 22 },
  { startHour: 22, finishHour: 24 },
];

const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const leapMonthLengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let now, forwardInFuture, dayOfYear;

const setupCalendar = () => {
  now = new Date(Date.now());

  const isLeapYear = (year: number) =>
    year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);

  const currentYearMonthLengths = isLeapYear(now.getFullYear())
    ? leapMonthLengths
    : monthLengths;

  const nextYear = new Date(now.getFullYear() + 1, 0);
  const nextYearMonthLengths = isLeapYear(nextYear.getFullYear())
    ? leapMonthLengths
    : monthLengths;

  const yearMonthLengths: { [year: number]: number[] } = {
    [now.getFullYear()]: currentYearMonthLengths,
    [nextYear.getFullYear()]: nextYearMonthLengths,
  };
  // we track the next year since the timetable might run over to  next year

  dayOfYear = (date: Date) => {
    // Day of year, January 1st is 0
    const theMonthLengths = yearMonthLengths[date.getFullYear()];
    const daysGone = theMonthLengths
      .slice(0, date.getMonth())
      .reduce((a, b) => a + b);
    return daysGone + date.getDate() - 1;
  };

  // const SEENONS2JSWeekDay = (day: number) => (day + 6) % 7;
  // instead of this, I just added 1 to all the available day numbers

  forwardInFuture = (inFuture: number) =>
    new Date(now.getTime() + 60 * 60 * 24 * 1000 * inFuture);
};

export const getAvailableTimeslots = (days: number[]): DayTimeSlot[] => {
  if (!now) {
    setupCalendar();
  }
  const availableDays = [];
  for (let i = 0; i < 30; i++) {
    // produce available slots in the next 30 days (including today)
    const day = forwardInFuture(i);
    // we use two week periods to accommodate things like every second friday
    const dayOfWeek = day.getDay();
    if (days.includes(dayOfWeek)) {
      availableDays.push(day);
    }

    const weekOfYear = Math.floor(dayOfYear(day) / 7);
    const isSecondWeek = weekOfYear % 2 == 1;
    if (isSecondWeek && days.includes(dayOfWeek + 7)) {
      availableDays.push(day);
    }
  }

  return availableDays.map((day) => ({
    [day.toDateString()]:
      day.getTime() - now.getTime() > 0
        ? TIMESLOTS
        : TIMESLOTS.filter((t) => t.startHour > day.getHours()), // skip slots earlier today
  }));
};
