import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DateFormat, MSEC_IN_DAY, MSEC_IN_HOUR } from '../const';

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
  const diffTimeshtamp = getDurationEvent(dateFrom, dateTo);

  if (diffTimeshtamp >= MSEC_IN_DAY) {
    return dayjs
      .duration(diffTimeshtamp)
      .format(DateFormat.LONG_EVENT_DURATION_TEMPLATE);
  }
  if (diffTimeshtamp >= MSEC_IN_HOUR) {
    return dayjs
      .duration(diffTimeshtamp)
      .format(DateFormat.AVERAGE_EVENT_DURATION_TEMPLATE);
  }
  return dayjs
    .duration(diffTimeshtamp)
    .format(DateFormat.SHORT_EVENT_DURATION_TEMPLATE);
};

const shuffle = (items) => {
  const mixedItems = [...items];

  for (let i = mixedItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedItems[i], mixedItems[j]] = [mixedItems[j], mixedItems[i]];
  }

  return mixedItems;
};

const getUppercaseFirstLetter = (word) =>
  word.at(0).toUpperCase() + word.slice(1);

const getLastWord = (value) => {
  const words = value.split(/[\s,]+/);
  return words[words.length - 1];
};

const getDestinationById = ({ destinations, destinationId }) =>
  destinations.find((destination) => destination.id === destinationId);

const getDestinationListNames = (destinations) =>
  destinations.map(({ name }) => name);

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

export {
  humanizeDateCalendarFormat,
  humanizeDateFormat,
  humanizeDurationEvent,
  shuffle,
  getDestinationById,
  getOffersByType,
  getSelectedOffersByType,
  getUppercaseFirstLetter,
  getDestinationListNames,
  getLastWord,
};
