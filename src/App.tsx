import moment from 'moment';
import { useState } from 'react';

import './common.scss';
import Calendar from './components/Calendar/Calendar';
import ConfettiComponent from './components/Confetti/Confetti';
import Header from './components/Header/Header';
import ModalCreateEvent from './components/ModalCreateEvent/ModalCreateEvent';
import ModalShowAllDataEvent from './components/ModalShowAllDataEvent/ModalShowAllDataEvent';
import ModalUpdateEvent from './components/ModalUpdateEvent/ModalUpdateEvent';
import {
  CurrentWeekStartDateContext,
  ModalContext,
  ShowAllDataEventModalContext,
} from './contexts/Contexts';
import useEvents from './hooks/useEvents';
import useModals from './hooks/useModals';
import { generateWeekRange, getWeekStartDate } from './utils/dateUtils';

const App = () => {
  const {
    isCreateModalOpen,
    isUpdateModalOpen,
    isInfoModalOpen,
    selectedEvent,
    handleOpenCreateModal,
    handleCloseModal,
    handleOpenUpdateModal,
    openShowAllDataModal,
  } = useModals();

  const initialDate = getWeekStartDate(moment().toDate());
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(initialDate);

  const [showConfetti, setShowConfetti] = useState(false);

  const { events, errorMessage, handleCreateEvent, handleUpdateEvent, handleDeleteEvent } =
    useEvents(handleCloseModal, setShowConfetti);

  const weekDates = generateWeekRange(currentWeekStartDate);

  return (
    <CurrentWeekStartDateContext.Provider value={currentWeekStartDate}>
      <ModalContext.Provider value={{ handleOpenCreateModal }}>
        <ShowAllDataEventModalContext.Provider value={{ openShowAllDataModal }}>
          <Header
            onOpenCreateModal={handleOpenCreateModal}
            currentWeekStartDate={currentWeekStartDate}
            setCurrentWeekStartDate={setCurrentWeekStartDate}
          />
          {errorMessage && <div className="error-message overlay">{errorMessage}</div>}
          <Calendar weekDates={weekDates} calendarEvents={events} />
          {isCreateModalOpen && (
            <ModalCreateEvent
              onCloseModal={handleCloseModal}
              onCreateEvent={handleCreateEvent}
              initialEvent={selectedEvent}
            />
          )}
          {isUpdateModalOpen && selectedEvent && (
            <ModalUpdateEvent
              calendarEvent={selectedEvent}
              onCloseModal={handleCloseModal}
              onEditEvent={handleUpdateEvent}
            />
          )}
          {isInfoModalOpen && selectedEvent && (
            <ModalShowAllDataEvent
              calendarEvent={selectedEvent}
              onCloseModal={handleCloseModal}
              onDeleteEvent={handleDeleteEvent}
              onEditEvent={handleUpdateEvent}
              onOpenUpdateModal={handleOpenUpdateModal}
            />
          )}
          <ConfettiComponent show={showConfetti} onHide={() => setShowConfetti(false)} />
        </ShowAllDataEventModalContext.Provider>
      </ModalContext.Provider>
    </CurrentWeekStartDateContext.Provider>
  );
};

export default App;
