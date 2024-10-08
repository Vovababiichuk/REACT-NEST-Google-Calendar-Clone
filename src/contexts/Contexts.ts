import { createContext } from 'react';
import {
  ModalContextInterface,
  ShowAllDataEventModalContextInterface,
  UpdateEventModalContextInterface,
} from '../types/types';

export const ModalContext = createContext<ModalContextInterface>({
  handleOpenModal: () => { },
});

export const UpdateEventModalContext = createContext<UpdateEventModalContextInterface>({
  handleOpenUpdateModal: () => { },
});

export const ShowAllDataEventModalContext = createContext<ShowAllDataEventModalContextInterface>({
  openShowAllDataModal: () => { },
});

export const CurrentWeekStartDateContext = createContext<Date | null>(null);
