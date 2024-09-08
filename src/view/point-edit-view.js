import { DateFormat, PointType } from '../const.js';
import { createElement } from '../render.js';
import {
  getUppercaseFirstLetter,
  getDestinationById,
  getDestinationListNames,
  getLastWord,
  getOffersByType,
  humanizeDateFormat,
} from '../utils/utils.js';

const createDestinationListItemTemplate = (title) =>
  `<option value="${title}"></option>`;

const createDestinationListNamesTemplate = (destinations) => {
  const titles = getDestinationListNames(destinations);
  return `
    <datalist id="destination-list-1">
      ${titles.map(createDestinationListItemTemplate).join('')}
    </datalist>
  `;
};

const createPointTypeItemTemplate = (pointType, isActive) => `
  <div class="event__type-item">
    <input
      id="event-type-${pointType}-1"
      class="event__type-input  visually-hidden"
      type="radio"
      name="event-type"
      value="${pointType}"
      ${isActive ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${pointType}"
      for="event-type-${pointType}-1">${getUppercaseFirstLetter(pointType)}
    </label>
  </div>
`;

const createPointTypeListTemplate = (currentPointType) => {
  const poinTypetListTemplate = Object.values(PointType)
    .map((type) => createPointTypeItemTemplate(type, type === currentPointType))
    .join('');

  return `
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${poinTypetListTemplate}
      </fieldset>
    </div>
  `;
};

const createOffersItemTemplate = ({
  availableOffer: { id, title, price },
  idSelectedOffers,
}) => {
  const isChecked = idSelectedOffers.includes(id);

  return `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${id}"
        type="checkbox"
        name="event-offer-${getLastWord(title)}"
        ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label"
        for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        +€&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const createAvailableOffersTemplate = ({
  point: { type, offers: idOffers },
  offers,
}) => {
  const availableOffers = getOffersByType({ offers, type });
  const offersItemTemplate = availableOffers
    .map((availableOffer) =>
      createOffersItemTemplate({
        availableOffer,
        idSelectedOffers: idOffers,
      })
    )
    .join('');

  if (!offers.length || !availableOffers.length) {
    return '';
  }

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersItemTemplate}
      </div>
    </section>`;
};

const createPhotoTemplate = ({ src, description }) => `
  <img class="event__photo" src="${src}" alt="${description}">
`;

const createPhotosTapeTemplate = (pictures) => {
  if (!pictures || !pictures.length) {
    return '';
  }

  const photoTemplate = pictures.map(createPhotoTemplate).join('');

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photoTemplate}
      </div>
    </div>
  `;
};

const createDestinationDetailsTemplate = ({ point, destinations }) => {
  const destination = getDestinationById({
    destinations,
    destinationId: point.destination,
  });
  const photosTapeTemplate = createPhotosTapeTemplate(destination?.pictures);

  if (!destination) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">
        ${destination.name}
      </h3>
      <p class="event__destination-description">
        ${destination.description}
      </p>
      ${photosTapeTemplate}
    </section>`;
};

const createPointDetailsTemplate = ({ point, destinations, offers }) => {
  const offersDetailsTemplate = createAvailableOffersTemplate({
    point,
    offers,
  });
  const destinationDetailsTemplate = createDestinationDetailsTemplate({
    point,
    destinations,
  });

  if (!offersDetailsTemplate.length && !destinationDetailsTemplate.length) {
    return '';
  }

  return `
    <section class="event__details">
      ${offersDetailsTemplate}
      ${destinationDetailsTemplate}
    </section>
  `;
};

const createPointEditTemplate = ({
  point,
  destinations,
  offers,
  isNewPoint,
}) => {
  const {
    type,
    dateFrom,
    dateTo,
    basePrice,
    destination: destinationId,
  } = point;
  const destinationTitle =
    getDestinationById({
      destinations,
      destinationId,
    })?.name ?? '';
  const dateFromPointTemplate = humanizeDateFormat(
    dateFrom,
    DateFormat.EVENT_TEMPLATE
  );
  const dateToPointTemplate = humanizeDateFormat(
    dateTo,
    DateFormat.EVENT_TEMPLATE
  );
  const rollupButtonTemplate = !isNewPoint
    ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `
    : '';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17"\
                src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            ${createPointTypeListTemplate(type)}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${getUppercaseFirstLetter(type)}
            </label>
            <input class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destinationTitle}" list="destination-list-1">
            ${createDestinationListNamesTemplate(destinations)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromPointTemplate}">
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToPointTemplate}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text"
              name="event-price"
              value="${basePrice}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">
            ${isNewPoint ? 'Cancel' : 'Delete'}
          </button>
          ${rollupButtonTemplate}
        </header>
        ${createPointDetailsTemplate({ point, destinations, offers })}
      </form>
    </li>
  `;
};

export default class PointEditView {
  constructor({ point, destinations, offers, isNewPoint = false }) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.isNewPoint = isNewPoint;
  }

  getTemplate() {
    return createPointEditTemplate({
      point: this.point,
      destinations: this.destinations,
      offers: this.offers,
      isNewPoint: this.isNewPoint,
    });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
