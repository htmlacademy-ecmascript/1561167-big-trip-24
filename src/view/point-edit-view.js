import { DATE_EVENT_TEMPLATE, PointType } from '../const.js';
import { createElement } from '../render.js';
import {
  firstLetterToUpperCase,
  getDestinationById,
  getDestinationListNames,
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
      for="event-type-${pointType}-1">${firstLetterToUpperCase(pointType)}
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

const createOffersDetailsTemplate = ({ point, offers }) => {
  const offersByType = getOffersByType({ offers, type: point.type });
  console.log('createOffersDetailsTemplate  offersByType:', offersByType);
  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">Add luggage</span>
            +€&nbsp;
            <span class="event__offer-price">30</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked="">
          <label class="event__offer-label" for="event-offer-comfort-1">
            <span class="event__offer-title">Switch to comfort class</span>
            +€&nbsp;
            <span class="event__offer-price">100</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
          <label class="event__offer-label" for="event-offer-meal-1">
            <span class="event__offer-title">Add meal</span>
            +€&nbsp;
            <span class="event__offer-price">15</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
          <label class="event__offer-label" for="event-offer-seats-1">
            <span class="event__offer-title">Choose seats</span>
            +€&nbsp;
            <span class="event__offer-price">5</span>
          </label>
        </div>

        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
          <label class="event__offer-label" for="event-offer-train-1">
            <span class="event__offer-title">Travel by train</span>
            +€&nbsp;
            <span class="event__offer-price">40</span>
          </label>
        </div>
      </div>
    </section>`;
};

const createDestinationDetailsTemplate = ({ point, destinations }) => {
  const destination = getDestinationById({
    destinations,
    destinationId: point.destination,
  });
  console.log('createDestinationDetailsTemplate  destination:', destination);
  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
          <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
        </div>
      </div>
    </section>`;
};

const createPointDetailsTemplate = ({ point, destinations, offers }) => {
  const offersDetailsTemplate = createOffersDetailsTemplate({ point, offers });
  const destinationDetailsTemplate = createDestinationDetailsTemplate({
    point,
    destinations,
  });

  if (!offersDetailsTemplate.length || !destinationDetailsTemplate.length) {
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
    }).name ?? '';
  const dateFromPointTemplate = humanizeDateFormat(
    dateFrom,
    DATE_EVENT_TEMPLATE
  );
  const dateToPointTemplate = humanizeDateFormat(dateTo, DATE_EVENT_TEMPLATE);
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
              ${firstLetterToUpperCase(type)}
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
  constructor({ point, destinations, offers, isNewPoint = true }) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.isNewPoint = isNewPoint;
  }

  getTemplate = () =>
    createPointEditTemplate({
      point: this.point,
      destinations: this.destinations,
      offers: this.offers,
      isNewPoint: this.isNewPoint,
    });

  getElement = () => {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  };

  removeElement = () => (this.element = null);
}
