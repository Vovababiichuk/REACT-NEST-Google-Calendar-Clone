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

export type NavigationProps = {
  weekDates: Date[];
};

export type WeekProps = {
  weekDates: Date[];
  calendarEvents: EventType[];
};

export type DayProps = {
  dayDate: Date;
  dayEvents: EventType[];
  onDeleteEvent?: (_id: string) => void;
};

export type HourProps = {
  dataHour: number;
  dataDay: number;
  hourEvents: EventType[];
};

export type EventProps = {
  _id: string | undefined;
  height: number;
  marginTop: number;
  title: string;
  time: string;
  description?: string;
  color?: string;
  tag?: string;
  completed?: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export type HeaderProps = {
  onOpenCreateModal: () => void;
  currentWeekStartDate: Date;
  setCurrentWeekStartDate: React.Dispatch<React.SetStateAction<Date>>;
};

export type ModalCreateEventProps = {
  onCloseModal: () => void;
  onCreateEvent: (event: EventType) => void;
  initialEvent?: EventType | null;
};

export type ModalUpdateEventProps = {
  calendarEvent: EventType | null;
  onCloseModal: () => void;
  onEditEvent: (eventId: string, updatedData: EventType) => void;
};

export type ModalInfoEventType = {
  calendarEvent: EventType;
  onCloseModal: () => void;
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (eventId: string, updatedData: EventType) => void;
  onOpenUpdateModal: (calendarEvent: EventType) => void;
};

export type ModalContextInterface = {
  handleOpenModal: (event?: EventType, selectedDay?: number, selectedHour?: number) => void;
};

export type UpdateEventModalContextInterface = {
  handleOpenUpdateModal: (calendarEvent: EventType) => void;
};

export type ShowAllDataEventModalContextInterface = {
  openShowAllDataModal: (calendarEvent: EventType) => void;
};

export type CurrentTimeLineProps = {
  dayDate: Date;
};

export type ConfettiComponentProps = {
  show: boolean;
  onHide: () => void;
};

export type ModalEventProps = {
  onCloseModal: () => void;
  onCreateEvent: (eventData: EventType) => Promise<void>;
  onEditEvent: (eventId: string, updatedData: EventType) => Promise<void>;
  initialEvent?: EventType | null;
  events: EventType[];
};
