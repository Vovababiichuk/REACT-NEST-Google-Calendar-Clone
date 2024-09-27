import { SketchPicker, ColorResult } from 'react-color';
import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import { ModalUpdateEventProps } from '../../types/types';
import './ModalUpdateEvent.scss';

const ModalUpdateEvent = ({ calendarEvent, onCloseModal, onEditEvent }: ModalUpdateEventProps) => {
  const [color, setColor] = useState('#c5bdf5');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calendarEvent) {
      setTitle(calendarEvent.title || '');
      setDate(moment(calendarEvent.dateFrom).format('YYYY-MM-DD'));
      setStartTime(moment(calendarEvent.dateFrom).format('HH:mm'));
      setEndTime(moment(calendarEvent.dateTo).format('HH:mm'));
      setDescription(calendarEvent.description || '');
      setTag(calendarEvent.tag || '');
      setColor(calendarEvent.color || '#c5bdf5');
    }
  }, [calendarEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !startTime || !endTime) {
      alert('Please fill out all fields.');
      return;
    }

    const dateFromMillis = moment(`${date}T${startTime}`).valueOf();
    const dateToMillis = moment(`${date}T${endTime}`).valueOf();

    if (dateFromMillis >= dateToMillis) {
      alert('End time must be after start time.');
      return;
    }

    const updatedEvent = {
      ...calendarEvent,
      title,
      description,
      dateFrom: new Date(dateFromMillis),
      dateTo: new Date(dateToMillis),
      tag,
      color,
    };

    if (calendarEvent && calendarEvent._id) {
      onEditEvent(calendarEvent._id, updatedEvent);
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleShowColorPicker = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowColorPicker(prevState => !prevState);
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
        <div className="update-event">
          <button className="update-event__close-btn" onClick={onCloseModal}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title..."
              className="event-form__field"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={e => setDate(e.target.value)}
                title="Date"
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                title="Start time"
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                title="End time"
              />
            </div>
            <textarea
              name="description"
              placeholder="Description..."
              className="event-form__field"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <input
              type="text"
              name="tags"
              placeholder="Tag..."
              className="event-form__field"
              value={tag}
              onChange={e => setTag(e.target.value)}
            />
            <div className="event-form__color">
              <div className="event-form__color-label">
                <span
                  className="event-form__color-base"
                  style={{ backgroundColor: color }}
                  onClick={handleShowColorPicker}
                ></span>
              </div>
              <div className="event-form__color-picker" ref={colorPickerRef}>
                {showColorPicker && <SketchPicker color={color} onChange={handleColorChange} />}
              </div>
            </div>
            <div className="event-form__actions">
              <button type="submit" className="event-form__save-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateEvent;

