import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ColorResult } from 'react-color';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EventInterface, ModalEventProps } from '../../types/types';
import { validateEvent } from '../../utils/dateUtils';
import ColorPicker from '../ColorPicker/ColorPicker';
import './ModalEvent.scss';

const ModalEvent = ({
  onCloseModal,
  onCreateEvent,
  onEditEvent,
  initialEvent,
  events,
}: ModalEventProps) => {
  const [eventData, setEventData] = useState({
    title: '',
    date: null as Date | null,
    startTime: '',
    endTime: '',
    description: '',
    tag: '',
    color: '#9380ff',
  });

  useEffect(() => {
    if (initialEvent) {
      setEventData({
        title: initialEvent.title || '',
        date: moment(initialEvent.dateFrom).toDate(),
        startTime: moment(initialEvent.dateFrom).format('HH:mm'),
        endTime: moment(initialEvent.dateTo).format('HH:mm'),
        description: initialEvent.description || '',
        tag: initialEvent.tag || '',
        color: initialEvent.color || '#9380ff',
      });
    }
  }, [initialEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setEventData(prev => ({ ...prev, date }));
  };

  const handleColorChange = (color: ColorResult) => {
    setEventData(prev => ({ ...prev, color: color.hex }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, date, startTime, endTime, description, tag, color } = eventData;

    const formattedDate = moment(date).format('YYYY-MM-DD');
    const dateFromMillis = moment(`${formattedDate}T${startTime}`).valueOf();
    const dateToMillis = moment(`${formattedDate}T${endTime}`).valueOf();

    const newEvent: EventInterface = {
      title,
      description,
      dateFrom: new Date(dateFromMillis),
      dateTo: new Date(dateToMillis),
      tag,
      color,
    };

    const errorMessage = validateEvent(newEvent, events);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      if (initialEvent && initialEvent._id) {
        await onEditEvent(initialEvent._id, newEvent);
      } else {
        await onCreateEvent(newEvent);
      }
      onCloseModal();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onCloseModal}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title..."
              className="event-form__field"
              value={eventData.title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <DatePicker
                selected={eventData.date}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="yyyy-mm-dd"
                locale="en"
                className="event-form__field"
              />
              <input
                title="Start time must be before end time"
                type="time"
                name="startTime"
                className="event-form__field"
                value={eventData.startTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                title="End time must be after start time"
                type="time"
                name="endTime"
                className="event-form__field"
                value={eventData.endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description..."
              className="event-form__field"
              value={eventData.description}
              onChange={handleChange}
            />
            <div>
              <input
                title="Add tags"
                className="event-form__field"
                type="text"
                name="tag"
                placeholder="Tag..."
                value={eventData.tag}
                onChange={handleChange}
              />
            </div>
            <ColorPicker color={eventData.color} onChange={handleColorChange} />{' '}
            <button type="submit" className="event-form__submit-btn">
              {initialEvent?._id ? 'Save' : 'Create'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEvent;
