import { loadDestinations, loadOffers, loadPoints } from '../mock/mock';

export default class TripModel {
  points = loadPoints();
  destinations = loadDestinations();
  offers = loadOffers();

  getPoints = () => this.points;

  getDestinations = () => this.destinations;

  getOffers = () => this.offers;
}
