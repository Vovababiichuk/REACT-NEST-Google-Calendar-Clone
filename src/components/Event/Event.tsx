import clsx from 'clsx';
import moment from 'moment';
import tinycolor from 'tinycolor-ts';
import { EventProps } from '../../types/types';
import { getFormattedTimeRange } from '../../utils/utils';
import './event.scss';

const darkenColor = (color: string | undefined) => {
  return tinycolor(color).darken(10).toString();
};

const Event = ({ event, onClick }: EventProps) => {
  const { title, dateFrom, dateTo, color, done } = event;
  const height = moment(dateTo).diff(moment(dateFrom), 'minutes');
  const marginTop = moment(dateFrom).minutes();
  const time = getFormattedTimeRange(dateFrom, dateTo);

  return (
    <div
      className={clsx('event', {
        'event--small': height <= 30,
        'event--hide-time': height <= 50,
        'event--completed': done,
      })}
      style={{
        height,
        marginTop,
        backgroundColor: color,
        border: `2px solid ${darkenColor(color)}`,
      }}
      onClick={onClick}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;
