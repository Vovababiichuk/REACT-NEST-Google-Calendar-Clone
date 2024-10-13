import moment from 'moment';
import { useContext, useState } from 'react';
import { CurrentWeekStartDateContext } from '../contexts/Contexts';
import { EventType } from '../types/types';

const useModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const currentWeekStartDate = useContext(CurrentWeekStartDateContext) || new Date();

  const handleOpenModal = (
    calendarEvent?: EventType,
    selectedDay?: number,
    selectedHour?: number,
  ) => {
    setIsModalOpen(true);
    setIsInfoModalOpen(false);

    if (calendarEvent) {
      setSelectedEvent(calendarEvent);
    } else if (selectedDay !== undefined && selectedHour !== undefined) {
      const selectedDate = moment(currentWeekStartDate)
        .date(selectedDay)
        .hour(selectedHour)
        .startOf('hour')
        .toDate();

      const endTime = moment(selectedDate).add(1, 'hour').toDate();

      setSelectedEvent({ dateFrom: selectedDate, dateTo: endTime } as EventType);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const openModalInfoEvent = (calendarEvent: EventType) => {
    if (calendarEvent) {
      setSelectedEvent(calendarEvent);
      setIsInfoModalOpen(true);
    } else {
      console.log('No calendar event provided');
    }
  };

  return {
    isModalOpen,
    isInfoModalOpen,
    selectedEvent,
    handleOpenModal,
    handleCloseModal,
    openModalInfoEvent,
  };
};

export default useModals;
