export type EventType = {
  _id?: string;
  title: string;
  dateFrom: Date;
  dateTo: Date;
  description?: string;
  tag?: string;
  color?: string;
  done?: boolean;
  position?: {
    x: number;
    y: number;
  };
};

export type ModalContextType = {
  handleOpenModal: (
    event?: EventType | null,
    selectedDay?: number | null,
    selectedHour?: number | null,
  ) => void;
};

export type UpdateEventModalContexType = {
  handleOpenUpdateModal: (calendarEvent: EventType) => void;
};

export type ShowAllDataEventModalContextType = {
  openModalInfoEvent: (calendarEvent: EventType) => void;
};
