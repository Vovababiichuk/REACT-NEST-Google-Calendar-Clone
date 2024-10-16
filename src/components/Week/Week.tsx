import moment from 'moment';
import { EventType } from '../../types/types';
import Day from '../Day/Day';
import './week.scss';

type WeekProps = {
  weekDates: Date[];
  calendarEvents: EventType[];
};

const Week = ({ weekDates, calendarEvents }: WeekProps) => (
  <div className="calendar__week">
    {weekDates.map(dayDate => {
      const dayEvents = calendarEvents.filter(event =>
        moment(event.dateFrom).isSame(dayDate, 'day'),
      );

      return <Day key={dayDate.getTime()} dayEvents={dayEvents} dayDate={dayDate} />;
    })}
  </div>
);

export default Week;
