const DateFormat = {
  TIME_TEMPLATE: 'HH:mm',
  EVENT_TEMPLATE: 'DD/MM/YY HH:mm',
  INVERTED_SHORT_TEMPLATE: 'MMM DD',
  AVERAGE_EVENT_DURATION_TEMPLATE: 'HH[H] mm[M]',
  SHORT_EVENT_DURATION_TEMPLATE: 'mm[M]',
  LONG_EVENT_DURATION_TEMPLATE: 'DD[D] HH[H] mm[M]',
  MACHINE_TEMPLATE: 'YYYY-MM-DD',
  FULL_MACHINE_TEMPLATE: 'YYYY-MM-DD[T]HH:mm',
};

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

const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;

const TypeTextMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const SortingType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const DEFAULT_SORTING_TYPE = SortingType.DAY;

const ALLOWED_SORTING_TYPES = [
  SortingType.DAY,
  SortingType.TIME,
  SortingType.PRICE,
];

const ViewingMode = {
  CARD: 'card',
  FORM: 'form',
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: DEFAULT_POINT_TYPE,
};

const UserAction = {
  UPDATE_POINT: 'update-point',
  ADD_POINT: 'add-point',
  DELETE_POINT: 'delete-point',
};

const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'init',
};

const AUTHORIZATION = 'Basic YTbOIc8zF9dCXvh3tLwEkWgjxuMpQr';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const UrlHandle = {
  READ_POINTS: 'points',
  READ_DESTINATIONS: 'destinations',
  READ_OFFERS: 'offers',
  CREATE: 'points',
  UPDATE: 'points',
  DELETE: 'points',
};

const TEXT_SHOW_LOADING = 'Loading...';

export {
  DateFormat,
  PointType,
  DEFAULT_POINT_TYPE,
  FilterType,
  DEFAULT_FILTER_TYPE,
  SortingType,
  DEFAULT_SORTING_TYPE,
  ALLOWED_SORTING_TYPES,
  BLANK_POINT,
  TypeTextMessage,
  ViewingMode,
  UserAction,
  UpdateType,
  AUTHORIZATION,
  END_POINT,
  Method,
  UrlHandle,
  TEXT_SHOW_LOADING,
};
