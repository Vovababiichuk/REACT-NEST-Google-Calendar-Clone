import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { ModalCreateEventProps } from '../../types/types';
import './ModalCreateEvent.scss';

const ModalCreateEvent = ({ onCloseModal, onCreateEvent, initialEvent }: ModalCreateEventProps) => {
  const [color, setColor] = useState('#9380ff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialEvent) {
      setDate(moment(initialEvent.dateFrom).format('YYYY-MM-DD'));
      setStartTime(moment(initialEvent.dateFrom).format('HH:mm'));
      setEndTime(moment(initialEvent.dateTo).format('HH:mm'));
    }
  }, [initialEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !startTime || !endTime) {
      const messages = [
        !title && 'Please enter a title.',
        !date && 'Please select a date.',
        !startTime && !endTime && 'Please select both start and end time.',
      ].filter(Boolean);
      alert(messages.join(' '));
      return;
    }

    const dateFromMillis = moment(`${date}T${startTime}`).valueOf();
    let dateToMillis = moment(`${date}T${endTime}`).valueOf();

    if (dateFromMillis >= dateToMillis) {
      if (endTime < startTime) {
        dateToMillis = moment(`${date}T${endTime}`).add(1, 'day').valueOf();
      } else {
        alert('End time must be after start time.');
        return;
      }
    }

    const newEvent = {
      title,
      description,
      dateFrom: new Date(dateFromMillis),
      dateTo: new Date(dateToMillis),
      tag,
      color,
    };

    onCreateEvent(newEvent);
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
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="event-form__time">
              <input
                title="Date must be in the future"
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
              <input
                title="Start time must be before end time"
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
              />
              <span>-</span>
              <input
                title="End time must be after start time"
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description..."
              className="event-form__field"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <div>
              <input
                title="Add tags"
                className="event-form__field"
                type="text"
                name="tags"
                placeholder="Tag..."
                value={tag}
                onChange={e => setTag(e.target.value)}
              />
            </div>
            <div className="event-form__color">
              <span
                className="event-form__color-base"
                style={{ backgroundColor: color }}
                onClick={handleShowColorPicker}
              ></span>
              <div className="event-form__color-picker" ref={colorPickerRef}>
                {showColorPicker && <SketchPicker color={color} onChange={handleColorChange} />}
              </div>
            </div>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateEvent;
