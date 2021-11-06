interface i18nString {
  'nl-nl': string;
  'en-gb': string;
}

export interface TimeSlot {
  startHour: number;
  finishHour: number;
}
export interface DayTimeSlot {
  [day: string]: TimeSlot[];
}

interface Container {
  size: number;
  type: string;
  name: i18nString;
  description: i18nString;
  unit_price_purchase: number | null;
  unit_price_rent: number | null;
  unit_price_placement: number | null;
}

interface ContainerTimelot {
  available_timeslots: DayTimeSlot[];
  containers: Container[];
}

interface LogisticsProvider {
  name: string;
  container_timeslots: ContainerTimelot[];
}

export interface AvailableProduct {
  stream_name: i18nString;
  stream_description: Record<symbol, string>;
  size_display: string;
  logistics_providers: LogisticsProvider[];
}
