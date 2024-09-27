import moment from 'moment';
import { useContext, useState } from 'react';
import { CurrentWeekStartDateContext } from '../contexts/Contexts';
import { EventInterface } from '../types/types';

const useModals = () => {
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalShowAllDataOpen, setIsModalShowAllDataOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);

  const currentWeekStartDate = useContext(CurrentWeekStartDateContext) || new Date();

  const handleOpenCreateModal = (selectedDay?: number, selectedHour?: number) => {
    setIsModalCreateOpen(true);
    setIsModalShowAllDataOpen(false);

    if (selectedDay !== undefined && selectedHour !== undefined) {
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
    setIsModalCreateOpen(false);
    setIsModalUpdateOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenUpdateModal = (calendarEvent: EventInterface) => {
    setIsModalShowAllDataOpen(false);
    if (calendarEvent) {
      setSelectedEvent(calendarEvent);
      setIsModalUpdateOpen(true);
    } else {
      console.log('No calendar event provided');
    }
  };

  const handleOpenShowAllDataModal = (calendarEvent: EventInterface) => {
    if (calendarEvent) {
      setSelectedEvent(calendarEvent);
      setIsModalShowAllDataOpen(true);
    } else {
      console.log('No calendar event provided');
    }
  };

  return {
    isModalCreateOpen,
    isModalUpdateOpen,
    isModalShowAllDataOpen,
    selectedEvent,
    handleOpenCreateModal,
    handleCloseModal,
    handleOpenUpdateModal,
    handleOpenShowAllDataModal,
  };
};

export default useModals;
