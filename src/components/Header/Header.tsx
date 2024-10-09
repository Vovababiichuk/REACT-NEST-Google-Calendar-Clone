import { CalendarPlusIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import moment from 'moment';
import { useCallback } from 'react';
import { HeaderProps } from '../../types/types';
import CalendarModeToggle from '../CalendarModeToggle/CalendarModeToggle';
import './header.scss';

const Header = ({
  onOpenCreateModal,
  currentWeekStartDate,
  setCurrentWeekStartDate,
}: HeaderProps) => {
  const updateWeekStartDate = useCallback(
    (daysOffset: number) => {
      setCurrentWeekStartDate(prevDate => moment(prevDate).add(daysOffset, 'days').toDate());
    },
    [setCurrentWeekStartDate],
  );

  const firstDayOfWeek = moment(currentWeekStartDate);
  const lastDayOfWeek = moment(currentWeekStartDate).add(6, 'days');

  const displayMonth =
    firstDayOfWeek.format('MMMM') === lastDayOfWeek.format('MMMM')
      ? firstDayOfWeek.format('MMMM')
      : `${firstDayOfWeek.format('MMMM')} - ${lastDayOfWeek.format('MMMM')}`;

  const currentYear = firstDayOfWeek.format('YYYY');

  return (
    <header className="header">
      <div className="header__left">
        <button className="button create-event-btn" onClick={onOpenCreateModal}>
          <span className="create-event-btn__icon">
            <CalendarPlusIcon />
          </span>
          <span className="create-event-btn__text">Create</span>
        </button>
        <div className="navigation">
          <button
            className="navigation__today-btn button"
            onClick={() => setCurrentWeekStartDate(moment().startOf('week').toDate())}
          >
            Today
          </button>
          <div className="navigation__nav-icons">
            <button
              className="icon-button navigation__nav-icon"
              title="Previous week"
              onClick={() => updateWeekStartDate(-7)}
            >
              <ChevronLeft />
            </button>
            <button
              className="icon-button navigation__nav-icon"
              title="Next week"
              onClick={() => updateWeekStartDate(7)}
            >
              <ChevronRight />
            </button>
          </div>
          <span className="navigation__displayed-month">{displayMonth}</span>
          <span className="navigation__displayed-year">{currentYear}</span>
        </div>
      </div>
      <div className="calendar__navigation-mode">
        <CalendarModeToggle />
      </div>
    </header>
  );
};

export default Header;
