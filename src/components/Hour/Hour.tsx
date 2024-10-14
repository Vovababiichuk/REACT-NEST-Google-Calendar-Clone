import React, { useContext } from 'react';
import { ModalContext, ShowAllDataEventModalContext } from '../../contexts/Contexts';
import { EventType } from '../../types/types';
import Event from '../Event/Event';
import './hour.scss';

type HourProps = {
  dataHour: number;
  dataDay: number;
  hourEvents: EventType[];
};

const Hour = ({ dataDay, dataHour, hourEvents }: HourProps) => {
  const { handleOpenModal } = useContext(ModalContext);
  const { openModalInfoEvent } = useContext(ShowAllDataEventModalContext);

  const handleClick = () => {
    if (hourEvents.length === 0) {
      handleOpenModal(null, dataDay, dataHour);
    }
  };

  const handleEventClick = (eventData: EventType, e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    openModalInfoEvent({
      ...eventData,
      dateFrom: new Date(eventData.dateFrom),
      dateTo: new Date(eventData.dateTo),
      position: { x: clientX, y: clientY },
    });
  };

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1} onClick={handleClick}>
      {hourEvents.map(event => (
        <Event key={event._id} event={event} onClick={e => handleEventClick(event, e)} />
      ))}
    </div>
  );
};

export default Hour;
