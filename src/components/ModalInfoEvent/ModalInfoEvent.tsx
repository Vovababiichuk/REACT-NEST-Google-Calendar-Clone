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
import { updateEvent } from '../../gateway/events';
import { EventType } from '../../types/types';
import './ModalInfoEvent.scss';

type ModalInfoEventType = {
  calendarEvent: EventType;
  onCloseModal: () => void;
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (eventId: string, updatedData: EventType) => void;
  onOpenUpdateModal: (calendarEvent: EventType) => void;
};

const ModalInfoEvent = ({
  calendarEvent,
  onCloseModal,
  onDeleteEvent,
  onEditEvent,
  onOpenUpdateModal,
}: ModalInfoEventType) => {
  const { _id, color, done, title, dateFrom, dateTo, description, tag } = calendarEvent;

  const handleMarkCompleted = async () => {
    if (_id) {
      try {
        const updatedEvent = await updateEvent(_id, {
          ...calendarEvent,
          done: !done,
        });
        onEditEvent(_id, updatedEvent);
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
                onClick={() => _id && onDeleteEvent(_id)}
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
              style={{ backgroundColor: color || '#c5bdf5' }}
            ></span>
            <h2 className="show-event__heading-title">{title}</h2>
          </div>
          <div className="show-event__info">
            <CalendarClock size={18} />
            <span className="show-event__info-date">{moment(dateFrom).format('dddd, MMMM D')}</span>
            <span className="show-event__info-time">
              {moment(dateFrom).format('h:mm')} – {moment(dateTo).format('h:mmA')}
            </span>
          </div>
          <div className="show-event__description-container">
            <AlignLeft className="show-event__description-icon" size={20} />
            <textarea
              className="show-event__description"
              rows={3}
              value={description}
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
              value={tag}
              readOnly
              placeholder="no tag..."
              title="Tag"
            />
          </div>
          <div className="show-event__mark" style={{ color: color || '#c5bdf5' }}>
            <CalendarCheck className="show-event__mark-icon" size={16} />
            <span className="show-event__mark-btn" onClick={handleMarkCompleted}>
              {done ? 'Mark uncompleted' : 'Mark completed'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInfoEvent;
