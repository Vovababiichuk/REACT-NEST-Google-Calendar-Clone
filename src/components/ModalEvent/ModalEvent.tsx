import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EventInterface, ModalEventProps } from '../../types/types';
import './ModalEvent.scss';

const ModalEvent = ({
  onCloseModal,
  onCreateEvent,
  onEditEvent,
  initialEvent,
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
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

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
    } else {
      setEventData({
        title: '',
        date: null,
        startTime: '',
        endTime: '',
        description: '',
        tag: '',
        color: '#9380ff',
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

  const handleShowColorPicker = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowColorPicker(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, date, startTime, endTime, description, tag, color } = eventData;

    if (!title || !date || !startTime || !endTime) {
      const messages = [
        !title && 'Enter a title.',
        !date && 'Enter a date.',
        !startTime && !endTime && 'Enter a time.',
      ].filter(Boolean);
      alert(messages.join(' '));
      return;
    }

    const formattedDate = moment(date).format('YYYY-MM-DD');
    const dateFromMillis = moment(`${formattedDate}T${startTime}`).valueOf();
    let dateToMillis = moment(`${formattedDate}T${endTime}`).valueOf();

    if (dateFromMillis >= dateToMillis) {
      if (endTime < startTime) {
        dateToMillis = moment(`${formattedDate}T${endTime}`).add(1, 'day').valueOf();
      } else {
        alert('End time must be greater than start time.');
        return;
      }
    }

    const newEvent: EventInterface = {
      title,
      description,
      dateFrom: new Date(dateFromMillis),
      dateTo: new Date(dateToMillis),
      tag,
      color,
    };

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

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
            <div className="event-form__color">
              <span
                className="event-form__color-base"
                style={{ backgroundColor: eventData.color }}
                onClick={handleShowColorPicker}
              ></span>
              <div className="event-form__color-picker" ref={colorPickerRef}>
                {showColorPicker && (
                  <SketchPicker color={eventData.color} onChange={handleColorChange} />
                )}
              </div>
            </div>
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
