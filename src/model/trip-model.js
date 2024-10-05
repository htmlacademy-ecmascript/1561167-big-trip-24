import Observable from '../framework/observable';
import { loadDestinations, loadOffers, loadPoints } from '../mock/mock';

export default class TripModel extends Observable {
  #points = loadPoints();
  #destinations = loadDestinations();
  #offers = loadOffers();

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
