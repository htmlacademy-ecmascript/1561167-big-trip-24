import { nanoid } from 'nanoid';
import { UpdateType, UserAction } from '../const';
import { remove, render, RenderPosition } from '../framework/render';
import PointEditView from '../view/point-edit-view/point-edit-view';

export default class NewPointPresenter {
  #pointListContainer = null;

  #destinations = [];
  #offers = [];

  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  constructor({
    pointListContainer,
    destinations,
    offers,
    onDataChange,
    onDestroy,
  }) {
    this.#pointListContainer = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointEditView({
      destinations: this.#destinations,
      offers: this.#offers,
      isNewPoint: true,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick,
    });

    render(
      this.#pointEditComponent,
      this.#pointListContainer,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener('keydown', this.#escapeKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange({
      actionType: UserAction.ADD_POINT,
      updateType: UpdateType.MINOR,
      update: { id: nanoid(), ...point },
    });
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
