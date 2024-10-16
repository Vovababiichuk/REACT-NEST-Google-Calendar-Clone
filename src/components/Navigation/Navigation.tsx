import clsx from 'clsx';
import { days } from '../../utils/utils';
import './navigation.scss';

type NavigationProps = {
  weekDates: Date[];
};

const Navigation = ({ weekDates }: NavigationProps) => {
  const today = new Date();

  return (
    <div className="calendar__navigation">
      <header className="calendar__header">
        <span className="calendar__header-gmt">GMT +02</span>
        {weekDates.map(dayDate => (
          <div
            className={clsx('calendar__day-label', 'day-label', {
              today:
                dayDate.getDate() === today.getDate() &&
                dayDate.getMonth() === today.getMonth() &&
                dayDate.getFullYear() === today.getFullYear(),
            })}
            key={dayDate.getTime()}
          >
            <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
            <span className="day-label__day-number">{dayDate.getDate()}</span>
          </div>
        ))}
      </header>
    </div>
  );
};

export default Navigation;
