export interface EventInterface {
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
}

export interface AppState {
  weekStartDate: Date;
}

export interface CalendarProps {
  weekDates: Date[];
  calendarEvents: EventInterface[];
}

export interface NavigationProps {
  weekDates: Date[];
}

export interface WeekProps {
  weekDates: Date[];
  calendarEvents: EventInterface[];
}

export interface DayProps {
  dataDay: number;
  dayEvents: EventInterface[];
  onDeleteEvent?: (_id: string) => void;
}

export interface HourProps {
  dataHour: number;
  dataDay: number;
  hourEvents: EventInterface[];
}

export interface EventProps {
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
}

export interface HeaderProps {
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  onOpenCreateModal: () => void;
  currentWeekStartDate: Date;
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

export interface ModalShowAllDataEventInterface {
  calendarEvent: EventInterface;
  onCloseModal: () => void;
  onDeleteEvent: (eventId: string) => void;
  onEditEvent: (eventId: string, updatedData: EventInterface) => void;
  onOpenUpdateModal: (calendarEvent: EventInterface) => void;
}

export interface ModalContextInterface {
  handleOpenCreateModal: (selectedDay?: number, selectedHour?: number) => void;
}

export interface UpdateEventModalContextInterface {
  handleOpenUpdateModal: (calendarEvent: EventInterface) => void;
}

export interface ShowAllDataEventModalContextInterface {
  handleOpenShowAllDataModal: (calendarEvent: EventInterface) => void;
}
