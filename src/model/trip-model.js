import { loadDestinations, loadOffers, loadPoints } from '../mock/mock';

export default class TripModel {
  points = loadPoints(true);
  destination = loadDestinations();
  offers = loadOffers();

  getPoints = () => this.points;

  getDestinations = () => this.destination;

  getOffers = () => this.offers;
}
