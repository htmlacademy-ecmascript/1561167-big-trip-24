import { UpdateType, UserAction, ViewingMode } from '../const';
import { remove, render, replace } from '../framework/render';
import { isDatesEqual, isNumbersEqual } from '../utils/utils';
import PointEditView from '../view/point-edit-view/point-edit-view';
import PointView from '../view/point-view/point-view';

export default class PointPresenter {
  #pointListContainer = null;

  #point = null;
  #destinations = [];
  #offers = [];

  #pointComponent = null;
  #pointEditComponent = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = ViewingMode.CARD;

  constructor({
    pointListContainer,
    destinations,
    offers,
    onDataChange,
    onModeChange,
  }) {
    this.#pointListContainer = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onCloseFormClick: this.#handleCloseFormClick,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === ViewingMode.CARD) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === ViewingMode.FORM) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = ViewingMode.CARD;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  setAborting() {
    if (this.#mode === ViewingMode.CARD) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  setSaving() {
    if (this.#mode !== ViewingMode.FORM) {
      return;
    }

    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setDeleting() {
    if (this.#mode !== ViewingMode.FORM) {
      return;
    }

    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetViewingMode() {
    if (this.#mode !== ViewingMode.CARD) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
    this.#mode = ViewingMode.CARD;
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escapeKeyDownHandler);
    this.#handleModeChange();
    this.#mode = ViewingMode.FORM;
  }

  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#point.dateTo, update.dateTo) ||
      !isNumbersEqual(this.#point.basePrice, update.basePrice);

    this.#handleDataChange({
      actionType: UserAction.UPDATE_POINT,
      updateType: isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    });
  };

  #handleCloseFormClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToCard();
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    const update = {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    };
    this.#handleDataChange({
      actionType: UserAction.UPDATE_POINT,
      updateType: UpdateType.PATCH,
      update,
    });
  };

  #handleDeleteClick = (update) => {
    this.#handleDataChange({
      actionType: UserAction.DELETE_POINT,
      updateType: UpdateType.MINOR,
      update,
    });
  };
}
