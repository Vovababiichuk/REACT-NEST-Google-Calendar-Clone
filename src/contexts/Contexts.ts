import { createContext } from 'react';
import { ModalContextInterface, UpdateEventModalContextInterface, ShowAllDataEventModalContextInterface } from '../types/types';

export const ModalContext = createContext<ModalContextInterface>({
  handleOpenCreateModal: () => {},
});

export const UpdateEventModalContext = createContext<UpdateEventModalContextInterface>({
  handleOpenUpdateModal: () => {},
});

export const ShowAllDataEventModalContext = createContext<ShowAllDataEventModalContextInterface>({
  handleOpenShowAllDataModal: () => {},
})
