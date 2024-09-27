import { useEffect, useState } from 'react';
import moment from 'moment';
import './CurrentTimeLine.scss';

interface CurrentTimeLineProps {
  dayDate: Date;
}

const CurrentTimeLine = ({ dayDate }: CurrentTimeLineProps) => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const isCurrentDay = moment(dayDate).isSame(moment(), 'day');

  const getTopPosition = () => {
    const now = currentTime.clone();
    return ((now.hours() * 60 + now.minutes()) / (24 * 60)) * 100;
  };

  return isCurrentDay ? (
    <>
      <div className="red-line" style={{ top: `${getTopPosition()}%` }} />
      <div className="red-ball" style={{ top: `${getTopPosition()}%` }} />
    </>
  ) : null;
};

export default CurrentTimeLine;