import moment from 'moment';
import { useContext, useState } from 'react';
import { CurrentWeekStartDateContext } from '../contexts/Contexts';
import { EventInterface } from '../types/types';

const useModals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);

  const currentWeekStartDate = useContext(CurrentWeekStartDateContext) || new Date();

  const handleOpenModal = (calendarEvent?: EventInterface, selectedDay?: number, selectedHour?: number) => {
    setIsModalOpen(true);
    setIsInfoModalOpen(false);

    if (calendarEvent) {
      setSelectedEvent(calendarEvent);
    } else if (selectedDay !== undefined && selectedHour !== undefined) {
      const selectedDate = moment(currentWeekStartDate)
        .date(selectedDay)
        .hour(selectedHour)
        .minute(0)
        .second(0)
        .toDate();

      const endTime = moment(selectedDate)
        .hour(selectedHour + 1)
        .minute(0)
        .second(0)
        .toDate();

      setSelectedEvent({
        dateFrom: selectedDate,
        dateTo: endTime,
      } as EventInterface);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const openShowAllDataModal = (calendarEvent: EventInterface) => {
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
    openShowAllDataModal,
  };
};

export default useModals;