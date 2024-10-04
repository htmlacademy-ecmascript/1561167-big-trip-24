import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ALLOWED_SORTING_TYPES, DateFormat } from '../const';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getDurationEvent = (dateFrom, dateTo) =>
  dayjs(dateTo).diff(dayjs(dateFrom));

const humanizeDateCalendarFormat = (date) =>
  date ? dayjs(date).format(DateFormat.EVENT_TEMPLATE) : '';

const humanizeDateFormat = (
  date,
  template = DateFormat.INVERTED_SHORT_TEMPLATE
) => (date ? dayjs(date).format(template) : '');

const humanizeDurationEvent = (dateFrom, dateTo) => {
  const diffTimestamp = getDurationEvent(dateFrom, dateTo);
  const eventDuration = dayjs.duration(diffTimestamp);
  const days = Math.floor(eventDuration.asDays());
  const hours = eventDuration.hours();
  const minutes = eventDuration.minutes();

  const getFromScratch = (value) => value.toString().padStart(2, '0');

  let daysFormat = '';
  let hoursFormat = '';
  let minutesFormat = '';

  if (days) {
    daysFormat = days < 10 ? `0${days}D ` : `${days}D `;
    hoursFormat = '00H ';
    minutesFormat = '00M';
  }

  if (hours) {
    hoursFormat = getFromScratch(hours).concat('H ');
    minutesFormat = '00M';
  }

  if (minutes) {
    minutesFormat = getFromScratch(minutes).concat('M');
  }

  return daysFormat + hoursFormat + minutesFormat;
};

const getUppercaseFirstLetter = (word) =>
  word.at(0).toUpperCase() + word.slice(1);

const getLastWord = (value) => {
  const words = value.split(/[\s,]+/);
  return words[words.length - 1];
};

const getDestinationById = ({ destinations, destinationId }) =>
  destinations.find((destination) => destination.id === destinationId);

const getDestinationIdByName = ({ nameDestination, destinations }) =>
  destinations.find((destination) => destination.name === nameDestination)
    ?.id ?? '';

const getDestinationListNames = (destinations) =>
  destinations.map(({ name }) => name);

const hasDetailsDestination = ({ destinations, destinationId }) => {
  const { description = '', pictures = [] } =
    getDestinationById({
      destinationId,
      destinations,
    }) ?? {};

  return description.length !== 0 || pictures.length !== 0;
};

const getOffersByType = ({ type, offers }) =>
  offers.find((offer) => offer.type === type).offers;

const getSelectedOffersByType = ({ point, offers }) => {
  const { type, offers: selectedOffers } = point;
  const availableOffers = getOffersByType({ type, offers });

  if (!availableOffers.length || !selectedOffers.length) {
    return [];
  }

  return availableOffers.filter((offer) => selectedOffers.includes(offer.id));
};

const hasOffersByType = ({ type, offers }) =>
  getOffersByType({ type, offers }).length !== 0;

const isPointFuture = ({ dateFrom }) => dayjs().isBefore(dateFrom);

const isPointPresent = ({ dateFrom, dateTo }) =>
  dayjs().isAfter(dateFrom) && dayjs().isBefore(dateTo);

const isPointPast = ({ dateTo }) => dayjs().isAfter(dateTo);

const isAllowedSortingType = (sortingType) =>
  ALLOWED_SORTING_TYPES.includes(sortingType);

const compareByDuration = (pointA, pointB) => {
  const getDurationPoint = (dateFrom, dateTo) =>
    dayjs(dateTo).diff(dayjs(dateFrom));
  const durrationPointA = getDurationPoint(pointA.dateFrom, pointA.dateTo);
  const durrationPointB = getDurationPoint(pointB.dateFrom, pointB.dateTo);

  return durrationPointB - durrationPointA;
};

const compareByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const compareByDate = ({ dateFrom: datePointA }, { dateFrom: datePointB }) => {
  if (dayjs(datePointA).isBefore(datePointB)) {
    return -1;
  } else if (dayjs(datePointA).isAfter(datePointB)) {
    return 1;
  }
  return 0;
};

export {
  humanizeDateCalendarFormat,
  humanizeDateFormat,
  humanizeDurationEvent,
  getDestinationById,
  getDestinationIdByName,
  getOffersByType,
  hasOffersByType,
  hasDetailsDestination,
  getSelectedOffersByType,
  getUppercaseFirstLetter,
  getDestinationListNames,
  getLastWord,
  isPointFuture,
  isPointPresent,
  isPointPast,
  compareByDuration,
  isAllowedSortingType,
  compareByPrice,
  compareByDate,
};
