import { loadDestinations, loadOffers, loadPoints } from '../mock/mock';

export default class TripModel {
  points = loadPoints();
  destinations = loadDestinations();
  offers = loadOffers();

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
