import moment from 'moment';
import { EventInterface, HourProps } from '../../types/types';
import Event from '../Event/Event';
import React, { useContext } from 'react';
import { ModalContext, ShowAllDataEventModalContext } from '../../contexts/Contexts';
import './hour.scss';

const Hour = ({ dataDay, dataHour, hourEvents }: HourProps) => {
  const { handleOpenCreateModal } = useContext(ModalContext);
  const { handleOpenShowAllDataModal } = useContext(ShowAllDataEventModalContext);

  const formatFirstTime = (date: moment.Moment) =>
    date.minutes() === 0 ? date.format('h') : date.format('h:mm');

  const formatSecondTime = (date: moment.Moment) =>
    date.minutes() === 0 ? date.format('hA') : date.format('h:mmA');

  const handleClick = () => {
    if (hourEvents.length === 0) {
      handleOpenCreateModal(dataDay, dataHour);
    }
  };

  const handleEventClick = (eventData: EventInterface, e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;

    try {
      handleOpenShowAllDataModal({
        _id: eventData._id,
        title: eventData.title,
        dateFrom: new Date(eventData.dateFrom),
        dateTo: new Date(eventData.dateTo),
        description: eventData.description,
        tag: eventData.tag,
        color: eventData.color,
        done: eventData.done,
        position: { x: clientX, y: clientY },
      });
    } catch (error) {
      console.error('Error handling event click:', error);
    }
  };

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={handleClick}>
      {hourEvents.map(({ _id, dateFrom, dateTo, title, color, description, tag, done }) => {
        const eventDateFrom = moment(dateFrom).local();
        const eventDateTo = moment(dateTo).local();

        const isEndMidnight = eventDateTo.hours() === 0 && eventDateTo.minutes() === 0;

        const formattedTimeRange = isEndMidnight
          ? `${formatSecondTime(eventDateFrom)}-${moment(dateTo).format('hA')}`
          : `${formatFirstTime(eventDateFrom)}-${formatSecondTime(eventDateTo)}`;

        return (
          <Event
            key={_id}
            _id={_id}
            height={eventDateTo.diff(eventDateFrom, 'minutes')}
            marginTop={eventDateFrom.minutes()}
            time={formattedTimeRange}
            title={title}
            color={color}
            completed={done}
            onClick={e =>
              handleEventClick({ _id, dateFrom, dateTo, title, description, tag, color, done }, e)
            }
          />
        );
      })}
    </div>
  );
};

export default Hour;
