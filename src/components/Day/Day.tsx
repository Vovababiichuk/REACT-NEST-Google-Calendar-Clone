import moment from 'moment';

import { DayProps } from '../../types/types';
import CurrentTimeLine from '../CurrentTimeLine/CurrentTimeLine';
import Hour from '../Hour/Hour';

const Day = ({ dayDate, dayEvents }: DayProps) => {
  const hours = Array.from({ length: 24 }, (_, index) => index);

  return (
    <div className="calendar__day" data-day={dayDate}>
      <CurrentTimeLine dayDate={dayDate} />
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => {
          const eventDateFrom = moment(event.dateFrom);
          return eventDateFrom.hour() === hour;
        });

        return (
          <Hour
            key={`${dayDate.getDate()}-${hour}`}
            dataHour={hour}
            hourEvents={hourEvents}
            dataDay={dayDate.getDate()}
          />
        );
      })}
    </div>
  );
};

export default Day;
