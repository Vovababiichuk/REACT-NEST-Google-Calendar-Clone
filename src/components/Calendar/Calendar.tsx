import { EventType } from '../../types/types';
import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import Week from '../Week/Week';
import './calendar.scss';

type CalendarProps = {
  weekDates: Date[];
  calendarEvents: EventType[];
};

const Calendar = ({ weekDates, calendarEvents }: CalendarProps) => {
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} calendarEvents={calendarEvents} />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
