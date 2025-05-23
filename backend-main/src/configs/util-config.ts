import { readFileSync } from 'fs';
import path from 'path';
import AppointmentType from '../models/AppointmentType';
import Language from '../models/Language';

const languageFilePath = path.join(process.cwd(), 'languages.json');
const stateFilePath = path.join(process.cwd(), 'states.json');
const appointmentTypesFilePath = path.join(process.cwd(), 'appointment-types.json');

export const loadLanguages = (): { name: string }[] => {
  try {
    const rawData = JSON.parse(readFileSync(languageFilePath, 'utf-8'));

    if (!rawData || !Array.isArray(rawData.languages)) {
      console.error('Invalid languages.json format');
      return [];
    }

    return rawData.languages.map((lang: Language) => ({ name: lang.name }));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error loading languages:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
};

export const loadAppointmentTypes = (): { name: string }[] => {
  try {
    const rawData = JSON.parse(readFileSync(appointmentTypesFilePath, 'utf-8'));
    if (!rawData || !Array.isArray(rawData.appointmentTypes)) {
      console.error('Invalid languages.json format');
      return [];
    }

    return rawData.appointmentTypes.map((appointmentTypes: AppointmentType) => ({ name: appointmentTypes.name }));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error loading languages:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return [];
  }
};

export const loadAddress = (): { name: string }[] => {
  try {
    const rawData = JSON.parse(readFileSync(stateFilePath, 'utf-8'));

    if (!rawData || !Array.isArray(rawData.states)) {
      console.error('Invalid states.json format');
      return [];
    }

    return rawData.states.map((state: any) => ({ name: state.name }));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error loading states:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }

    return [];
  }
};