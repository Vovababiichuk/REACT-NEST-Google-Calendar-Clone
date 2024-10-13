import moment from 'moment';
import React, { useContext } from 'react';
import { ModalContext, ShowAllDataEventModalContext } from '../../contexts/Contexts';
import { EventInterface, HourProps } from '../../types/types';
import { getFormattedTimeRange } from '../../utils/utils';
import Event from '../Event/Event';
import './hour.scss';

const Hour = ({ dataDay, dataHour, hourEvents }: HourProps) => {
  const { handleOpenModal } = useContext(ModalContext);
  const { openShowAllDataModal } = useContext(ShowAllDataEventModalContext);

  const handleClick = () => {
    if (hourEvents.length === 0) {
      handleOpenModal(undefined, dataDay, dataHour);
    }
  };

  const handleEventClick = (eventData: EventInterface, e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    openShowAllDataModal({
      ...eventData,
      dateFrom: new Date(eventData.dateFrom),
      dateTo: new Date(eventData.dateTo),
      position: { x: clientX, y: clientY },
    });
  };

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={handleClick}>
      {hourEvents.map(event => {
        const formattedTimeRange = getFormattedTimeRange(event.dateFrom, event.dateTo);

        return (
          <Event
            key={event._id}
            _id={event._id}
            height={moment(event.dateTo).diff(moment(event.dateFrom), 'minutes')}
            marginTop={moment(event.dateFrom).minutes()}
            time={formattedTimeRange}
            title={event.title}
            color={event.color}
            completed={event.done}
            onClick={e => handleEventClick(event, e)}
          />
        );
      })}
    </div>
  );
};

export default Hour;
