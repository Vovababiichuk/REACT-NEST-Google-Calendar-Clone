import moment from 'moment';
import { EventType } from '../types/types';

export const getWeekStartDate = (date: Date): Date => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference = -dayOfWeek;
  const sunday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate());
};

export const generateWeekRange = (startDate: Date): Date[] => {
  const result: Date[] = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const getDateTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const formatMins = (mins: number) => {
  return mins < 10 ? `0${mins}` : mins;
};

export const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = hours % 12 || 12;
  const formattedMinutes = minutes ? `:${formatMins(minutes)}` : '';
  return `${formattedHour}${formattedMinutes}${period}`;
};

export const formatTimeRange = (dateFrom: Date, dateTo: Date): string => {
  const eventStart = formatTime(dateFrom);
  const hoursTo = dateTo.getHours();
  const periodTo = hoursTo >= 12 ? 'PM' : 'AM';
  const formattedHourTo = hoursTo % 12 || 12;
  const formattedMinutesTo = dateTo.getMinutes() ? `:${formatMins(dateTo.getMinutes())}` : '';

  return `${
    eventStart.split(/(?<=\d)(?=AM|PM)/)[0]
  }-${formattedHourTo}${formattedMinutesTo}${periodTo}`;
};

export const formatFirstTime = (date: moment.Moment) =>
  date.minutes() === 0 ? date.format('h') : date.format('h:mm');

export const formatSecondTime = (date: moment.Moment) =>
  date.minutes() === 0 ? date.format('hA') : date.format('h:mmA');

export const getFormattedTimeRange = (dateFrom: Date, dateTo: Date): string => {
  const eventDateFrom = moment(dateFrom).local();
  const eventDateTo = moment(dateTo).local();

  const isEndMidnight = eventDateTo.hours() === 0 && eventDateTo.minutes() === 0;

  return isEndMidnight
    ? `${formatSecondTime(eventDateFrom)}-${moment(dateTo).format('hA')}`
    : `${formatFirstTime(eventDateFrom)}-${formatSecondTime(eventDateTo)}`;
};

export const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const validateEvent = (
  newEvent: EventType,
  events: EventType[],
  editingEventId?: string,
): string | null => {
  const { title, dateFrom, dateTo } = newEvent;

  if (!title) return 'Please enter a title.';

  if (dateFrom && dateTo && moment(dateFrom).isValid() && moment(dateTo).isValid()) {
    if (moment(dateFrom) >= moment(dateTo)) return 'End time must be later than start time.';
    if (moment(dateTo).diff(moment(dateFrom), 'minutes') < 15) {
      return 'Event duration must be at least 15 minutes.';
    }

    const isOverlapping = events.some(event => {
      if (editingEventId && event._id === editingEventId) return false;

      const eventStart = moment(event.dateFrom);
      const eventEnd = moment(event.dateTo);
      return moment(dateFrom) < eventEnd && moment(dateTo) > eventStart;
    });

    if (isOverlapping) return 'This event overlaps with an existing event.';
  } else {
    return 'Please select a date and time.';
  }

  return null;
};
