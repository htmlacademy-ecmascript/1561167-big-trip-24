import AdapterService from '../adapter-service';
import { UpdateType } from '../const';
import Observable from '../framework/observable';

export default class TripModel extends Observable {
  #tripApiService = null;
  #adapterService = new AdapterService();

  #points = [];
  #destinations = [];
  #offers = [];

  constructor({ tripApiService }) {
    super();
    this.#tripApiService = tripApiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const points = await this.#tripApiService.points;
      this.#points = points.map(this.#adapterService.adaptToClient);
      this.#offers = await this.#tripApiService.offers;
      this.#destinations = await this.#tripApiService.destinations;
    } catch (error) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint({ updateType, update }) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Unable to update a non-existent point');
    }

    try {
      const response = await this.#tripApiService.updatePoint(update);
      const updatePoint = this.#adapterService.adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatePoint,
        ...this.#points.slice(index + 1),
      ];
    } catch (error) {
      throw new Error('The task cannot be updated');
    }

    this._notify(updateType, update);
  }

  addPoint({ updateType, update }) {
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  }

  deletePoint({ updateType, update }) {
    const index = this.#points.findIndex(({ id }) => id === update.id);

    if (index === -1) {
      throw new Error('Unable to delete a non-existent point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
