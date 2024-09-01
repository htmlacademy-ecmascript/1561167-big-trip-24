const POINT_COUNT = 5;

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

// const DAY_MONTH_TEMPLATE = 'DD';
// const SHORT_DATE_TEMPLATE = 'DD MMM';

const DATE_EVENT_TEMPLATE = 'DD/MM/YY hh:mm';
const INVERTED_SHORT_DATE_TEMPLATE = 'MMM DD';
const AVERAGE_EVENT_DURATION_TEMPLATE = 'HH[H] mm[M]';
const SHORT_EVENT_DURATION_TEMPLATE = 'mm[M]';
const LONG_EVENT_DURATION_TEMPLATE = 'DD[D] HH[H] mm[M]';
const MACHINE_DATE_TEMPLATE = 'YYYY-MM-DD';
const TIME_TEMPLATE = 'HH:mm';
const FULL_MACHINE_DATE_TEMPLATE = `${MACHINE_DATE_TEMPLATE}[T]${TIME_TEMPLATE}`;

const PointType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

const DEFAULT_POINT_TYPE = PointType.FLIGHT;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const ACCEPTABLE_SORTING = [SortType.DAY, SortType.TIME, SortType.PRICE];

const BLANK_POINT = {
  id: '',
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: DEFAULT_POINT_TYPE,
};

export {
  POINT_COUNT,
  MSEC_IN_HOUR,
  MSEC_IN_DAY,
  DATE_EVENT_TEMPLATE,
  INVERTED_SHORT_DATE_TEMPLATE,
  AVERAGE_EVENT_DURATION_TEMPLATE,
  SHORT_EVENT_DURATION_TEMPLATE,
  LONG_EVENT_DURATION_TEMPLATE,
  MACHINE_DATE_TEMPLATE,
  FULL_MACHINE_DATE_TEMPLATE,
  TIME_TEMPLATE,
  PointType,
  DEFAULT_POINT_TYPE,
  FilterType,
  SortType,
  ACCEPTABLE_SORTING,
  BLANK_POINT,
};
