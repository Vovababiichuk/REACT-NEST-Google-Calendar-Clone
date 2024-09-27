import moment from 'moment';
import { DayProps } from '../../types/types';
import CurrentTimeLine from '../CurrentTimeLine/CurrentTimeLine';
import Hour from '../Hour/Hour';

const Day = ({ dataDay, dayEvents }: DayProps) => {
  const hours = Array.from({ length: 24 }, (_, index) => index);
  const dayDate = moment().date(dataDay).toDate();

  return (
    <div className="calendar__day" data-day={dataDay}>
      <CurrentTimeLine dayDate={dayDate} />
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => {
          const eventDateFrom = moment(event.dateFrom);
          return eventDateFrom.hour() === hour;
        });

        return (
          <Hour key={dataDay + hour} dataHour={hour} hourEvents={hourEvents} dataDay={dataDay} />
        );
      })}
    </div>
  );
};

export default Day;

