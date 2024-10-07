import moment from 'moment';
import { useContext, useState } from 'react';
import { CurrentWeekStartDateContext } from '../contexts/Contexts';
import { EventInterface } from '../types/types';

const useModals = () => {
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
  const [isInfoModalOpen, setisInfoModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);

  const currentWeekStartDate = useContext(CurrentWeekStartDateContext) || new Date();

  const handleOpenCreateModal = (selectedDay?: number, selectedHour?: number) => {
    setisCreateModalOpen(true);
    setisInfoModalOpen(false);

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
    setisCreateModalOpen(false);
    setisUpdateModalOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenUpdateModal = (calendarEvent: EventInterface) => {
    setisInfoModalOpen(false);
    if (calendarEvent) {
      setSelectedEvent(calendarEvent);
      setisUpdateModalOpen(true);
    } else {
      console.log('No calendar event provided');
    }
  };

  const openShowAllDataModal = (calendarEvent: EventInterface) => {
    if (calendarEvent) {
      setSelectedEvent(calendarEvent);
      setisInfoModalOpen(true);
    } else {
      console.log('No calendar event provided');
    }
  };

  return {
    isCreateModalOpen,
    isUpdateModalOpen,
    isInfoModalOpen,
    selectedEvent,
    handleOpenCreateModal,
    handleCloseModal,
    handleOpenUpdateModal,
    openShowAllDataModal,
  };
};

export default useModals;
