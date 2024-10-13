import { useEffect, useState } from 'react';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../gateway/events';
import { EventType } from '../types/types';

const useEvents = (handleCloseModal: () => void, setShowConfetti: (show: boolean) => void) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleCreateEvent = async (eventData: EventType) => {
    try {
      const newEvent = await createEvent(eventData);
      setEvents(prevEvents => [...prevEvents, newEvent]);
      handleCloseModal();
      setShowConfetti(true);
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

  const handleUpdateEvent = async (eventId: string, updatedData: EventType) => {
    try {
      const updatedEvent = await updateEvent(eventId, updatedData);
      setEvents(prevEvents =>
        prevEvents.map(event => (event._id === eventId ? updatedEvent : event)),
      );
      handleCloseModal();
      setShowConfetti(true);
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  return { events, errorMessage, handleCreateEvent, handleUpdateEvent, handleDeleteEvent };
};

export default useEvents;
