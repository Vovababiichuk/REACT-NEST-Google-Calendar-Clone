import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Confetti from 'react-confetti';
import { useCallback, useEffect, useState } from 'react';
import { ModalContext, ShowAllDataEventModalContext } from './contexts/Contexts';
import moment from 'moment';
import Calendar from './components/Calendar/Calendar';
import Header from './components/Header/Header';
import ModalCreateEvent from './components/ModalCreateEvent/ModalCreateEvent';
import ModalUpdateEvent from './components/ModalUpdateEvent/ModalUpdateEvent';
import ModalShowAllDataEvent from './components/ModalShowAllDataEvent/ModalShowAllDataEvent';
import { generateWeekRange, getWeekStartDate } from './utils/dateUtils';
import { createEvent, deleteEvent, getEvents, updateEvent } from './gateway/events';
import { EventInterface } from './types/types';
import './common.scss';

function App() {
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(
    getWeekStartDate(moment().toDate()),
  );
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalShowAllDataOpen, setIsModalShowAllDataOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const weekDates = generateWeekRange(currentWeekStartDate);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
        setErrorMessage(null);
      } catch (error) {
        console.error('Error fetching events:', error);
        setErrorMessage('Internal server error. Unable to display events');
      }
    };
    fetchEvents();
  }, []);

  const updateWeekStartDate = useCallback((daysOffset: number) => {
    setCurrentWeekStartDate(prevDate => moment(prevDate).add(daysOffset, 'days').toDate());
  }, []);

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
    setShowConfetti(false);
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

  const handleCreateEvent = async (eventData: EventInterface) => {
    try {
      const newEvent = await createEvent(eventData);
      setEvents(prevEvents => [...prevEvents, newEvent]);
      handleCloseModal();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdateEvent = async (eventId: string, updatedData: EventInterface) => {
    try {
      const updatedEvent = await updateEvent(eventId, updatedData);
      setEvents(prevEvents =>
        prevEvents.map(event => (event._id === eventId ? updatedEvent : event)),
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
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

        <SwitchTransition>
          <CSSTransition key={currentWeekStartDate.getTime()} timeout={300} classNames="fade">
            <Calendar weekDates={weekDates} calendarEvents={events} />
          </CSSTransition>
        </SwitchTransition>
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
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={300}
            gravity={0.9}
            wind={0.04}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            recycle={false}
            initialVelocityY={20}
            friction={0.95}
          />
        )}
      </ShowAllDataEventModalContext.Provider>
    </ModalContext.Provider>
  );
};

export default App;