import axios from 'axios';
import { EventType } from '../types/types';

const baseUrl = 'https://nest-back-google-calendar-clone.vercel.app/events';

export const createEvent = async (eventData: EventType) => {
  try {
    const response = await axios.post(baseUrl, eventData);
    return response.data;
  } catch (error) {
    console.error('Error in createEvent', error);
    throw error;
  }
};

export const updateEvent = async (_id: string, updatedData: EventType) => {
  try {
    const res = await axios.put(`${baseUrl}/${_id}`, updatedData);
    return res.data;
  } catch (err) {
    console.error('Error in updateEvent', err);
    throw err;
  }
};

export const deleteEvent = async (_id: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/${_id}`);
    return res.data;
  } catch (err) {
    console.error('Error in deleteEvent', err);
    throw err;
  }
};

export const getEvents = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (err) {
    console.error('Error in getEvents', err);
    throw err;
  }
};
