import moment from 'moment';
import { useCallback, useState } from 'react';
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

function App() {
  const {
    isModalCreateOpen,
    isModalUpdateOpen,
    isModalShowAllDataOpen,
    selectedEvent,
    handleOpenCreateModal,
    handleCloseModal,
    handleOpenUpdateModal,
    handleOpenShowAllDataModal,
  } = useModals();

  const initialDate = getWeekStartDate(moment().toDate());
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(initialDate);
  const [showConfetti, setShowConfetti] = useState(false);

  const { events, errorMessage, handleCreateEvent, handleUpdateEvent, handleDeleteEvent } =
    useEvents(handleCloseModal, setShowConfetti); // Pass setShowConfetti here

  const weekDates = generateWeekRange(currentWeekStartDate);

  const updateWeekStartDate = useCallback((daysOffset: number) => {
    setCurrentWeekStartDate(prevDate => moment(prevDate).add(daysOffset, 'days').toDate());
  }, []);

  return (
    <CurrentWeekStartDateContext.Provider value={currentWeekStartDate}>
      <ModalContext.Provider value={{ handleOpenCreateModal }}>
        <ShowAllDataEventModalContext.Provider value={{ handleOpenShowAllDataModal }}>
          <Header
            onPreviousWeek={() => updateWeekStartDate(-7)}
            onNextWeek={() => updateWeekStartDate(7)}
            onToday={() => setCurrentWeekStartDate(getWeekStartDate(moment().toDate()))}
            onOpenCreateModal={handleOpenCreateModal}
            currentWeekStartDate={currentWeekStartDate}
          />
          {errorMessage && <div className="error-message overlay">{errorMessage}</div>}
          {/* <SwitchTransition> */}
          {/* <CSSTransition key={currentWeekStartDate.getTime()} timeout={80} classNames="fade"> */}
          <Calendar weekDates={weekDates} calendarEvents={events} />
          {/* </CSSTransition> */}
          {/* </SwitchTransition> */}
          {isModalCreateOpen && (
            <ModalCreateEvent
              onCloseModal={handleCloseModal}
              onCreateEvent={handleCreateEvent}
              initialEvent={selectedEvent}
            />
          )}
          {isModalUpdateOpen && selectedEvent && (
            <ModalUpdateEvent
              calendarEvent={selectedEvent}
              onCloseModal={handleCloseModal}
              onEditEvent={handleUpdateEvent}
            />
          )}
          {isModalShowAllDataOpen && selectedEvent && (
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
}

export default App;
