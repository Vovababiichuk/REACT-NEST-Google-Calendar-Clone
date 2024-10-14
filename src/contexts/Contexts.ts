import { createContext } from 'react';
import {
  ModalContextType,
  ShowAllDataEventModalContextType,
  UpdateEventModalContexType,
} from '../types/types';

export const ModalContext = createContext<ModalContextType>({
  handleOpenModal: () => {},
});

export const UpdateEventModalContext = createContext<UpdateEventModalContexType>({
  handleOpenUpdateModal: () => {},
});

export const ShowAllDataEventModalContext = createContext<ShowAllDataEventModalContextType>({
  openModalInfoEvent: () => {},
});

export const CurrentWeekStartDateContext = createContext<Date | null>(null);
