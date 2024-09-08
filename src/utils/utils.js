import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DateFormat } from '../const';

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
