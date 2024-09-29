import { BLANK_POINT } from '../../const.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {
  getDestinationIdByName,
  hasDetailsDestination,
  hasOffersByType,
  isDigitsOnly,
} from '../../utils/utils.js';
import { createPointEditTemplate } from './template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class PointEditView extends AbstractStatefulView {
  #initialPoint = null;
  #destinations = [];
  #offers = [];
  #isNewPoint = false;

  #handleFormSubmit = null;
  #handleCloseFormClick = null;

  #dateFromPicker = null;
  #dateToPicker = null;

  constructor({
    point = BLANK_POINT,
    destinations,
    offers,
    isNewPoint,
    onFormSubmit,
    onCloseFormClick,
  }) {
    super();
    this.#initialPoint = point;
    this._setState(
      PointEditView.parsePointToState({ point, offers, destinations })
    );
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isNewPoint = isNewPoint ?? false;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormClick = onCloseFormClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate({
      state: this._state,
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: this.#isNewPoint,
    });
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeFormClickHandler);
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeToggleHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationToggleHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    this.#initDatePicker();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker !== null) {
      this.#dateFromPicker.destroy();
      this.#dateFromPicker = null;
    }

    if (this.#dateToPicker !== null) {
      this.#dateToPicker.destroy();
      this.#dateToPicker = null;
    }
  };

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState({
        point,
        offers: this.#offers,
        destinations: this.#destinations,
      })
    );
  }

  #initDatePicker = () => {
    const KEY = 'time_24hr';
    const commonParameter = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: { firstDayOfWeek: 1 },
      [KEY]: true,
    };

    this.#dateFromPicker = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        ...commonParameter,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo,
      }
    );
    this.#dateToPicker = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        ...commonParameter,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.dateFrom,
      }
    );
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({ dateFrom: userDate });
    this.#dateToPicker.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({ dateTo: userDate });
    this.#dateFromPicker.set('maxDate', this._state.dateTo);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this.#initialPoint));
  };

  #closeFormClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormClick();
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;

    this.updateElement({
      type: targetType,
      offers: [],
      isShowOffers: hasOffersByType({ type: targetType, offers: this.#offers }),
    });
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const destination = getDestinationIdByName({
      nameDestination: targetDestination,
      destinations: this.#destinations,
    });

    this.updateElement({
      destination,
      isShowDestination: destination.length !== 0,
    });
  };

  #priceInputHandler = (evt) => {
    const targetValue = evt.target.value;

    if (!isDigitsOnly(targetValue)) {
      this._setState({ basePrice: this._state.prevValidValue });
      evt.target.value = this._state.prevValidValue.toString();
      return;
    }

    this._setState({ basePrice: +targetValue, prevValidValue: +targetValue });
  };

  static parsePointToState({ point, offers, destinations }) {
    const isShowOffers = hasOffersByType({ type: point.type, offers });
    const isShowDestination =
      point.destination.length !== 0 &&
      hasDetailsDestination({
        destinationId: point.destination,
        destinations,
      });
    const prevValidValue = point.basePrice;

    return {
      ...point,
      isShowOffers,
      isShowDestination,
      prevValidValue,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    if (!point.isShowOffers) {
      point.offers = [];
    }

    delete point.isShowOffers;
    delete point.isShowDestinations;
    delete point.prevValidValue;

    return point;
  }
}
