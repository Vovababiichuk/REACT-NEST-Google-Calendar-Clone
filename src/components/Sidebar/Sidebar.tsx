import './sidebar.scss';

const Sidebar = () => {
  const hours = Array(24)
    .fill(0)
    .map((_, index) => index);

  return (
    <div className="calendar__time-scale">
      {hours.map(hour => {
        const isAM = hour < 12;
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        const period = isAM ? 'AM' : 'PM';

        return (
          <div className="time-slot" key={hour}>
            <span className="time-slot__time">{`${displayHour} ${period}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;