import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import {
  getDestinationById,
  getSelectedOffersByType,
  humanizeDateFormat,
  humanizeDurationEvent,
} from '../utils/utils.js';

const createOfferItemTemplate = ({ title, price }) => `
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    +€&nbsp;
    <span class="event__offer-price">${price}</span>
  </li>
`;

const createSelectedOffersTemplate = ({ point, offers }) => {
  const selectedOffers = getSelectedOffersByType({ point, offers });

  if (!selectedOffers.length) {
    return '';
  }

  return `
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${selectedOffers.map((offer) => createOfferItemTemplate(offer)).join('')}
    </ul>
  `;
};

const createPointTemplate = ({ point, destinations, offers }) => {
  const { type: pointType, basePrice, isFavorite, dateFrom, dateTo } = point;
  const destinationName = getDestinationById({
    destinationId: point.destination,
    destinations,
  });
  const classFavoriteButtonActive = isFavorite
    ? 'event__favorite-btn--active'
    : '';
  const machineDateFromTemplate = humanizeDateFormat(
    dateFrom,
    DateFormat.MACHINE_TEMPLATE
  );
  const startTimeTemplate = humanizeDateFormat(
    dateFrom,
    DateFormat.TIME_TEMPLATE
  );
  const endTimeTemplate = humanizeDateFormat(dateTo, DateFormat.TIME_TEMPLATE);
  const fullMachineDateFromTemplate = humanizeDateFormat(
    dateFrom,
    DateFormat.FULL_MACHINE_TEMPLATE
  );
  const fullMachineDateToTemplate = humanizeDateFormat(
    dateTo,
    DateFormat.FULL_MACHINE_TEMPLATE
  );
  return `
    <li class="trip-events__item">
      <div class="event">
        <time
          class="event__date"
          datetime="${machineDateFromTemplate}">
          ${humanizeDateFormat(dateFrom)}
        </time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42"
            src="img/icons/${pointType}.png"
            alt="Event type icon"
          >
        </div>
        <h3 class="event__title">
          ${pointType}
          ${destinationName ? destinationName.name : ''}
        </h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${fullMachineDateFromTemplate}">
              ${startTimeTemplate}
            </time>
            —
            <time class="event__end-time" datetime="${fullMachineDateToTemplate}">
              ${endTimeTemplate}
            </time>
          </p>
          <p class="event__duration">
            ${humanizeDurationEvent(dateFrom, dateTo)}
          </p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        ${createSelectedOffersTemplate({ point, offers })}
        <button class="event__favorite-btn ${classFavoriteButtonActive}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export default class PointView extends AbstractView {
  #point = [];
  #destinations = [];
  #offers = [];

  #handleEditClick = null;

  constructor({ point, destinations, offers, onEditClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
