export const getWeekStartDate = (date: Date): Date => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
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

//! Documentation

/*!SECTION
1. Функція getWeekStartDate

Ця функція отримує дату та повертає дату понеділка того ж тижня.

Копіює вхідну дату, щоб не змінювати її.
Визначає день тижня (0 для неділі, 1 для понеділка тощо).
Обчислює різницю між поточним днем і понеділком, щоб отримати дату понеділка. Якщо вхідна дата — неділя (день 0), різниця буде -6; в іншому випадку, вона обчислюється як 1 - dayOfWeek.
Повертає нову дату, представляючи понеділок того тижня.

2. Функція generateWeekRange

Ця функція створює масив з 7 дат, починаючи з дати, переданої у startDate.

Цикл виконується 7 разів, по одному для кожного дня тижня.
На кожній ітерації створюється новий об'єкт Date, який копіює startDate.
Додає кількість днів (i) до дати та додає отриману дату до масиву результатів.
Після завершення циклу повертає масив з 7 дат.

3. Функція getDateTime

Ця функція формує дату на основі наданого часу.

Розбиває строку time на години і хвилини.
Створює нову дату з вхідної дати та встановлює години, а потім хвилини.
Повертає дату з оновленими годинам та хвилинами.

4. Форматування часу

Функції formatTime, formatMins, та formatTimeRange використовуються для відображення часу у зрозумілому форматі.

formatTime форматує дату в строку, показуючи години і хвилини разом із AM/PM.
formatTimeRange форматує діапазон часу між двома датами, також показуючи AM/PM.
*/
