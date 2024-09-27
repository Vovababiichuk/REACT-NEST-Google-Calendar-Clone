import { CalendarPlusIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import moment from 'moment';
import { HeaderProps } from '../../types/types';
import CalendarModeToggle from '../CalendarModeToggle/CalendarModeToggle';
import './header.scss';

const Header = ({
  onPreviousWeek,
  onNextWeek,
  onToday,
  onOpenCreateModal,
  currentWeekStartDate,
}: HeaderProps) => {
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
          <button className="navigation__today-btn button" onClick={onToday}>
            Today
          </button>
          <div className="navigation__nav-icons">
            <button
              className="icon-button navigation__nav-icon"
              title="Previous week"
              onClick={onPreviousWeek}
            >
              <ChevronLeft />
            </button>
            <button
              className="icon-button navigation__nav-icon"
              title="Next week"
              onClick={onNextWeek}
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
