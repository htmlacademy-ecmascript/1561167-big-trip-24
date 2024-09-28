import { BLANK_POINT } from '../../const.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import {
  getDestinationIdByName,
  hasDetailsDestination,
  hasOffersByType,
} from '../../utils/utils.js';
import { createPointEditTemplate } from './template.js';

export default class PointEditView extends AbstractStatefulView {
  #initialPoint = null;
  #destinations = [];
  #offers = [];
  #isNewPoint = false;

  #handleFormSubmit = null;
  #handleCloseFormClick = null;

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
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState({
        point,
        offers: this.#offers,
        destinations: this.#destinations,
      })
    );
  }

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
    const targetPrice = evt.target.value;

    this._setState({ basePrice: targetPrice });
  };

  static parsePointToState({ point, offers, destinations }) {
    const isShowOffers = hasOffersByType({ type: point.type, offers });
    const isShowDestination =
      point.destination.length !== 0 &&
      hasDetailsDestination({
        destinationId: point.destination,
        destinations,
      });

    return {
      ...point,
      isShowOffers,
      isShowDestination,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    if (!point.isShowOffers) {
      point.offers = [];
    }

    delete point.isShowOffers;
    delete point.isShowDestinations;

    return point;
  }
}
