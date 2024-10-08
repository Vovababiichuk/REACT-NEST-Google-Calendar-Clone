import moment from 'moment';
import { useState } from 'react';

import './common.scss';
import Calendar from './components/Calendar/Calendar';
import ConfettiComponent from './components/Confetti/Confetti';
import Header from './components/Header/Header';
import ModalEvent from './components/ModalEvent/ModalEvent';
import ModalInfoEvent from './components/ModalInfoEvent/ModalInfoEvent';
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
    isModalOpen,
    isInfoModalOpen,
    selectedEvent,
    handleOpenModal,
    handleCloseModal,
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
      <ModalContext.Provider value={{ handleOpenModal }}>
        <ShowAllDataEventModalContext.Provider value={{ openShowAllDataModal }}>
          <Header
            onOpenCreateModal={() => handleOpenModal(undefined, undefined, undefined)}
            currentWeekStartDate={currentWeekStartDate}
            setCurrentWeekStartDate={setCurrentWeekStartDate}
          />
          {errorMessage && <div className="error-message overlay">{errorMessage}</div>}
          <Calendar weekDates={weekDates} calendarEvents={events} />
          {isModalOpen && (
            <ModalEvent
              onCloseModal={handleCloseModal}
              onCreateEvent={handleCreateEvent}
              onEditEvent={handleUpdateEvent}
              initialEvent={selectedEvent}
            />
          )}
          {isInfoModalOpen && selectedEvent && (
            <ModalInfoEvent
              calendarEvent={selectedEvent}
              onCloseModal={handleCloseModal}
              onDeleteEvent={handleDeleteEvent}
              onEditEvent={handleUpdateEvent}
              onOpenUpdateModal={handleOpenModal}
            />
          )}
          <ConfettiComponent show={showConfetti} onHide={() => setShowConfetti(false)} />
        </ShowAllDataEventModalContext.Provider>
      </ModalContext.Provider>
    </CurrentWeekStartDateContext.Provider>
  );
};

export default App;
