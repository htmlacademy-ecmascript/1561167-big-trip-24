import { BLANK_POINT } from '../../const.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {
  getDestinationIdByName,
  hasDetailsDestination,
  hasOffersByType,
} from '../../utils/utils.js';
import { createPointEditTemplate } from './template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class PointEditView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];
  #isNewPoint = false;

  #handleFormSubmit = null;
  #handleCloseFormClick = null;
  #handleDeleteClick = null;

  #dateFromPicker = null;
  #dateToPicker = null;

  #offerElements = null;

  constructor({
    point = BLANK_POINT,
    destinations,
    offers,
    isNewPoint,
    onFormSubmit,
    onCloseFormClick,
    onDeleteClick,
  }) {
    super();
    this._setState(
      PointEditView.parsePointToState({ point, offers, destinations })
    );
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isNewPoint = isNewPoint ?? false;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormClick = onCloseFormClick;
    this.#handleDeleteClick = onDeleteClick;

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
    const sectionOffersElement = this.element.querySelector(
      '.event__section--offers'
    );

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeToggleHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationToggleHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);

    if (!this.#isNewPoint) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeFormClickHandler);
    }

    if (sectionOffersElement !== null) {
      sectionOffersElement.addEventListener(
        'change',
        this.#offersChangeHandler
      );
      this.#offerElements = sectionOffersElement.querySelectorAll(
        '.event__offer-checkbox'
      );
    }

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

  #validateFields() {
    const elements = [
      ...this.element.querySelectorAll('input[data-monitored-field=""]'),
    ];

    return elements.some((element) => {
      const isEmpty = element.value.length === 0;

      if (element.classList.contains('event__input--destination')) {
        return (
          isEmpty ||
          getDestinationIdByName({
            nameDestination: element.value,
            destinations: this.#destinations,
          }).length === 0
        );
      }
      return isEmpty;
    });
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
    this.#dateToPicker.set('minDate', this._state.dateFrom);
    this.updateElement({
      dateFrom: userDate,
      isDisabledSubmit: this.#validateFields(),
    });
  };

  #dateToCloseHandler = ([userDate]) => {
    this.#dateFromPicker.set('maxDate', this._state.dateTo);
    this.updateElement({
      dateTo: userDate,
      isDisabledSubmit: this.#validateFields(),
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #closeFormClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormClick();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
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

  #offersChangeHandler = (evt) => {
    const offers = [];
    evt.preventDefault();

    this.#offerElements.forEach((offerElement) => {
      if (offerElement.checked) {
        offers.push(offerElement.id);
      }
    });

    this._setState({ offers });
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const destinationId = getDestinationIdByName({
      nameDestination: targetDestination,
      destinations: this.#destinations,
    });

    const isShowDestination =
      destinationId.length !== 0 &&
      hasDetailsDestination({
        destinationId,
        destinations: this.#destinations,
      });
    this.updateElement({
      destination: destinationId,
      isShowDestination,
      isDisabledSubmit: this.#validateFields(),
    });
  };

  #priceInputHandler = (evt) => {
    this._setState({
      basePrice: +evt.target.value,
    });
  };

  static parsePointToState({ point, offers, destinations }) {
    const isShowOffers = hasOffersByType({ type: point.type, offers });
    const isShowDestination =
      point.destination.length !== 0 &&
      hasDetailsDestination({
        destinationId: point.destination,
        destinations,
      });
    const isDisabledSubmit =
      point.destination.length === 0 ||
      point.dateFrom === null ||
      point.dateTo === null;

    return {
      ...point,
      isShowOffers,
      isShowDestination,
      isDisabledSubmit,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    if (point.isShowOffers !== undefined && !point.isShowOffers) {
      point.offers = [];
    }

    delete point.isShowOffers;
    delete point.isShowDestination;
    delete point.isDisabledSubmit;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
