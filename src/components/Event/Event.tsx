import clsx from 'clsx';
import tinycolor from 'tinycolor-ts';
import { EventProps } from '../../types/types';
import './event.scss';

const darkenColor = (color: string | undefined) => {
  return tinycolor(color).darken(10).toString();
};

const Event = ({ height, marginTop, title, time, color, completed, onClick }: EventProps) => {
  return (
    <div
      className={clsx('event', {
        'event--small': height <= 30,
        'event--hide-time': height <= 50,
        'event--completed': completed,
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
