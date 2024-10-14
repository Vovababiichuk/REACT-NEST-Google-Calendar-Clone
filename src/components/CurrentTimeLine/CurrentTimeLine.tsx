import moment from 'moment';
import { useEffect, useState } from 'react';
import './CurrentTimeLine.scss';

type CurrentTimeLineProps = {
  dayDate: Date;
};

const CurrentTimeLine = ({ dayDate }: CurrentTimeLineProps) => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const isCurrentDay = moment(dayDate).isSame(moment(), 'day');
  const isCurrentMonth = moment(dayDate).isSame(moment(), 'month');

  const getTopPosition = () => {
    const now = currentTime.clone();
    return ((now.hours() * 60 + now.minutes()) / (24 * 60)) * 100;
  };

  return isCurrentDay && isCurrentMonth ? (
    <div className="red-line" style={{ top: `${getTopPosition()}%` }} />
  ) : null;
};

export default CurrentTimeLine;
