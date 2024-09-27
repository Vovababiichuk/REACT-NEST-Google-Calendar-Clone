import { CalendarProps } from '../../types/types';
import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import Week from '../Week/Week';
import './calendar.scss';

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
