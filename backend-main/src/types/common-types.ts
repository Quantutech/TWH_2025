import Evaluate from '../models/Evaluate';

export enum SourceType {
  Body = 'body',
  Query = 'query',
  Params = 'params',
}

export enum AvailableLanguages {
  EN = 'en',
  TR = 'tr',
  DE = 'de',
  HR = 'hr',
}

export enum AppointmentStatus {
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Past = 'past',
  Approved = 'approved',
}

export enum SortingType {
  DEFAULT = '0',
  DEFAULT_DESC = '1',
  RATE_ASC = '2',
  RATE_DESC = '3',
  DISTANCE_ASC = '4',
  DISTANCE_DESC = '5',
  APPROVED_APPOINTMENTS_COUNT_ASC = '6',
  APPROVED_APPOINTMENTS_COUNT_DESC = '7',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum WaitingTimeEnum {
  ZeroToThirty = 0,
  ThirtyToSixty = 1,
  MoreThanSixty = 2,
}

export const WaitingTimeLabels = {
  [WaitingTimeEnum.ZeroToThirty]: '0-30 Minutes',
  [WaitingTimeEnum.ThirtyToSixty]: '30-60 Minutes',
  [WaitingTimeEnum.MoreThanSixty]: '>60 Minutes',
};

export enum DayOfWeekEnum {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export enum AppointmentTypeEnum {
  Online = 'online',
  InPerson = 'in-person',
}

export type EvaluateWithClient = Evaluate & {
  Client?: {
    firstName: string;
    lastName: string;
  };
};

export enum NotificationTypeEnum {
  Appointment = 'appointment',
  Support = 'support',
}

export enum NotificationStatusEnum {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export enum DateRange {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}
