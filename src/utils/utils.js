import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  AVERAGE_EVENT_DURATION_TEMPLATE,
  DATE_EVENT_TEMPLATE,
  INVERTED_SHORT_DATE_TEMPLATE,
  LONG_EVENT_DURATION_TEMPLATE,
  MSEC_IN_DAY,
  MSEC_IN_HOUR,
  SHORT_EVENT_DURATION_TEMPLATE,
} from '../const';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getDurationEvent = (dateFrom, dateTo) =>
  dayjs(dateTo).diff(dayjs(dateFrom));

const humanizeDateCalendarFormat = (date) =>
  date ? dayjs(date).format(DATE_EVENT_TEMPLATE) : '';

const humanizeDateFormat = (date, template = INVERTED_SHORT_DATE_TEMPLATE) =>
  date ? dayjs(date).format(template) : '';

const humanizeDurationEvent = (dateFrom, dateTo) => {
  const diffTimeshtamp = getDurationEvent(dateFrom, dateTo);

  if (diffTimeshtamp >= MSEC_IN_DAY) {
    return dayjs.duration(diffTimeshtamp).format(LONG_EVENT_DURATION_TEMPLATE);
  }
  if (diffTimeshtamp >= MSEC_IN_HOUR) {
    return dayjs
      .duration(diffTimeshtamp)
      .format(AVERAGE_EVENT_DURATION_TEMPLATE);
  }
  return dayjs.duration(diffTimeshtamp).format(SHORT_EVENT_DURATION_TEMPLATE);
};

const shuffle = (array) => {
  const mixedArray = [...array];
  for (let i = mixedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedArray[i], mixedArray[j]] = [mixedArray[j], mixedArray[i]];
  }

  return mixedArray;
};

const getDestinationById = ({ destinations, destinationId }) =>
  destinations.find((destination) => destination.id === destinationId);

const getOffersByType = ({ type, offers }) =>
  offers.find((offer) => offer.type === type).offers;

const getSelectedOffersByType = ({ point, offers }) => {
  const { type, offers: pointOffers } = point;
  const offersByType = getOffersByType({ type, offers });

  if (!offersByType.length || !pointOffers.length) {
    return [];
  }

  return offersByType.filter((offer) => pointOffers.includes(offer.id));
};

export {
  humanizeDateCalendarFormat,
  humanizeDateFormat,
  humanizeDurationEvent,
  shuffle,
  getDestinationById,
  getOffersByType,
  getSelectedOffersByType,
};
