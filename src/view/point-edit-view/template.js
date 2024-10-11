import he from 'he';
import { DateFormat, PointType } from '../../const.js';
import {
  getUppercaseFirstLetter,
  getDestinationById,
  getDestinationListNames,
  getLastWord,
  getOffersByType,
  humanizeDateFormat,
} from '../../utils/utils.js';

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
  selectedOffersIDs,
}) => {
  const isChecked = selectedOffersIDs.includes(id);

  return `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="${id}"
        type="checkbox"
        name="event-offer-${getLastWord(title)}"
        ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label"
        for="${id}">
        <span class="event__offer-title">${title}</span>
        +€&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const createAvailableOffersTemplate = ({
  state: { type, offers: offersIDs, isShowOffers },
  offers,
}) => {
  if (!isShowOffers) {
    return '';
  }

  const availableOffers = getOffersByType({ offers, type });
  const offersItemTemplate = availableOffers
    .map((availableOffer) =>
      createOffersItemTemplate({
        availableOffer,
        selectedOffersIDs: offersIDs,
      })
    )
    .join('');

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

const createDestinationDescriptionTemplate = (destination) => {
  if (destination.description.length === 0) {
    return '';
  }

  return `
    <p class="event__destination-description">
      ${destination.description}
    </p>
  `;
};

const createDestinationDetailsTemplate = ({ state, destinations }) => {
  if (!state.isShowDestination) {
    return '';
  }

  const destination = getDestinationById({
    destinations,
    destinationId: state.destination,
  });
  const photosTapeTemplate = createPhotosTapeTemplate(destination?.pictures);

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">
        ${destination.name}
      </h3>
      ${createDestinationDescriptionTemplate(destination)}
      ${photosTapeTemplate}
    </section>`;
};

const createPointDetailsTemplate = ({ state, destinations, offers }) => {
  if (!state.isShowOffers && !state.isShowDestination) {
    return '';
  }

  const offersDetailsTemplate = createAvailableOffersTemplate({
    state,
    offers,
  });
  const destinationDetailsTemplate = createDestinationDetailsTemplate({
    state,
    destinations,
  });

  return `
    <section class="event__details">
      ${offersDetailsTemplate}
      ${destinationDetailsTemplate}
    </section>
  `;
};

const createPointEditTemplate = ({
  state,
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
    isDisabledSubmit,
    isDisabled,
    isSaving,
    isDeleting,
  } = state;
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
  const valueResetButtonTemplate = isDeleting ? 'Deleting...' : 'Delete';
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
              value="${he.encode(destinationTitle)}"
              list="destination-list-1"
              data-monitored-field=""
              ${isDisabled ? 'disabled' : ''}>
            ${createDestinationListNamesTemplate(destinations)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${dateFromPointTemplate}"
              data-monitored-field=""
              ${isDisabled ? 'disabled' : ''}>
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
            class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${dateToPointTemplate}"
            data-monitored-field=""
            ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-1"
              type="number" min="1" max="100000" step="1"
              pattern="^/\\d{1,5}$"
              name="event-price"
              value="${basePrice}"
              ${isDisabled ? 'disabled' : ''}
              required>
          </div>
          <button
            class="event__save-btn  btn  btn--blue"
            type="submit"
            ${isDisabledSubmit || isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            class="event__reset-btn"
            type="reset"
            ${isDisabled ? 'disabled' : ''}>
            ${isNewPoint ? 'Cancel' : valueResetButtonTemplate}
          </button>
          ${rollupButtonTemplate}
        </header>
        ${createPointDetailsTemplate({ state, destinations, offers })}
      </form>
    </li>
  `;
};

export { createPointEditTemplate };
