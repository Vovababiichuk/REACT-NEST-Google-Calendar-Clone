import {
  AlignLeft,
  CalendarCheck,
  CalendarClock,
  CircleX,
  EditIcon,
  Mail,
  Tag,
  Trash2,
} from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { updateEvent } from '../../gateway/events';
import { ModalInfoEventInterface } from '../../types/types';
import './ModalInfoEvent.scss';

const ModalInfoEvent = ({
  calendarEvent,
  onCloseModal,
  onDeleteEvent,
  onEditEvent,
  onOpenUpdateModal,
}: ModalInfoEventInterface) => {
  const [eventData, setEventData] = useState({
    color: '#c5bdf5',
    title: '',
    dateFormatted: '',
    timeRange: '',
    description: '',
    tag: '',
    done: false,
  });

  useEffect(() => {
    if (calendarEvent) {
      const eventStart = moment(calendarEvent.dateFrom);
      const eventEnd = moment(calendarEvent.dateTo);

      setEventData({
        title: calendarEvent.title || '',
        dateFormatted: eventStart.format('dddd, MMMM D'),
        timeRange: `${eventStart.format('h:mm')} – ${eventEnd.format('h:mmA')}`,
        description: calendarEvent.description || '',
        tag: calendarEvent.tag || '',
        color: calendarEvent.color || '#c5bdf5',
        done: calendarEvent.done || false,
      });
    }
  }, [calendarEvent]);

  const handleMarkCompleted = async () => {
    if (calendarEvent && calendarEvent._id) {
      try {
        const updatedEvent = await updateEvent(calendarEvent._id, {
          ...calendarEvent,
          done: !eventData.done,
        });
        onEditEvent(calendarEvent._id, updatedEvent);
        setEventData(prevData => ({ ...prevData, done: !prevData.done }));
      } catch (error) {
        console.error('Error updating event status:', error);
      }
    }
  };

  const getModalPosition = () => {
    const modalWidth = 300;
    const modalHeight = 200;

    let top = (calendarEvent?.position?.y || 0) + window.scrollY;
    let left = calendarEvent?.position?.x || 0;

    if (left + modalWidth > window.innerWidth) {
      left -= modalWidth;
    }

    top = Math.max(top, window.scrollY);
    if (top + modalHeight > window.innerHeight + window.scrollY) {
      top = window.innerHeight + window.scrollY - modalHeight;
    }

    return { top, left };
  };

  const { top, left } = getModalPosition();

  const handleClickEmail = () => {
    alert('This feature is coming soon');
  };

  return (
    <div
      className="modal-show show-overlay"
      style={{
        position: 'absolute',
        top: top,
        left: left,
      }}
    >
      <div className="modal-show__content">
        <div className="show-event">
          <div className="show-event__container">
            <div className="show-event__buttons">
              <EditIcon
                className="show-event__button show-event__button_edit"
                size={20}
                onClick={() => onOpenUpdateModal(calendarEvent)}
              />
              <Trash2
                className="show-event__button show-event__button_delete"
                size={20}
                onClick={() => calendarEvent?._id && onDeleteEvent(calendarEvent._id)}
              />
              <Mail
                className="show-event__button show-event__button_email"
                size={20}
                onClick={handleClickEmail}
              />
            </div>
            <div className="show-event__close">
              <CircleX size={20} onClick={onCloseModal} />
            </div>
          </div>
          <div className="show-event__heading">
            <span
              className="show-event__heading-color"
              style={{ backgroundColor: eventData.color }}
            ></span>
            <h2 className="show-event__heading-title">{eventData.title}</h2>
          </div>
          <div className="show-event__info">
            <CalendarClock size={18} />
            <span className="show-event__info-date">{eventData.dateFormatted}</span>
            <span className="show-event__info-time">{eventData.timeRange}</span>
          </div>
          <div className="show-event__description-container">
            <AlignLeft className="show-event__description-icon" size={20} />
            <textarea
              className="show-event__description"
              rows={3}
              value={eventData.description}
              readOnly
              title="Description"
              placeholder="no description..."
            />
          </div>
          <div className="show-event__tag">
            <Tag size={18} />
            <input
              className="show-event__tag-input"
              type="text"
              value={eventData.tag}
              readOnly
              placeholder="no tag..."
              title="Tag"
            />
          </div>
          <div className="show-event__mark" style={{ color: eventData.color }}>
            <CalendarCheck className="show-event__mark-icon" size={16} />
            <span className="show-event__mark-btn" onClick={handleMarkCompleted}>
              {eventData.done ? 'Mark uncompleted' : 'Mark completed'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInfoEvent;
