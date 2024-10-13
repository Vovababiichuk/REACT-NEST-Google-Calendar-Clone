export type EventInterface = {
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

export type AppState = {
  weekStartDate: Date;
};

export type CalendarProps = {
  weekDates: Date[];
  calendarEvents: EventInterface[];
};

export type NavigationProps = {
  weekDates: Date[];
};

export type WeekProps = {
  weekDates: Date[];
  calendarEvents: EventInterface[];
};

export type DayProps = {
  dayDate: Date;
  dayEvents: EventInterface[];
  onDeleteEvent?: (_id: string) => void;
};

export type HourProps = {
  dataHour: number;
  dataDay: number;
  hourEvents: EventInterface[];
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

export interface HeaderProps {
  onOpenCreateModal: () => void;
  currentWeekStartDate: Date;
  setCurrentWeekStartDate: React.Dispatch<React.SetStateAction<Date>>;
}

export interface ModalCreateEventProps {
  onCloseModal: () => void;
  onCreateEvent: (event: EventInterface) => void;
  initialEvent?: EventInterface | null;
}

export interface ModalUpdateEventProps {
  calendarEvent: EventInterface | null;
  onCloseModal: () => void;
  onEditEvent: (eventId: string, updatedData: EventInterface) => void;
}

export interface ModalInfoEventInterface {
  calendarEvent: EventInterface;
  onCloseModal: () => void;
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (eventId: string, updatedData: EventInterface) => void;
  onOpenUpdateModal: (calendarEvent: EventInterface) => void;
}

export interface ModalContextInterface {
  handleOpenModal: (event?: EventInterface, selectedDay?: number, selectedHour?: number) => void;
}

export interface UpdateEventModalContextInterface {
  handleOpenUpdateModal: (calendarEvent: EventInterface) => void;
}

export interface ShowAllDataEventModalContextInterface {
  openShowAllDataModal: (calendarEvent: EventInterface) => void;
}

export interface CurrentTimeLineProps {
  dayDate: Date;
}

export type ConfettiComponentProps = {
  show: boolean;
  onHide: () => void;
};

export interface ModalEventProps {
  onCloseModal: () => void;
  onCreateEvent: (eventData: EventInterface) => Promise<void>;
  onEditEvent: (eventId: string, updatedData: EventInterface) => Promise<void>;
  initialEvent?: EventInterface | null;
  events: EventInterface[];
}
