import { remove, render, RenderPosition, replace } from '../framework/render';
import {
  compareByDate,
  getDestinationById,
  getSelectedOffersByType,
  humanizeDateFormat,
} from '../utils/utils';
import InfoView from '../view/info-view.js/info-view';
import { DateFormat } from '../const';

export default class InfoPresenter {
  #points = [];
  #offers = [];
  #destinations = [];

  #infoContainer = null;

  #tripModel = null;

  #infoComponent = null;

  constructor({ infoContainer, tripModel }) {
    this.#infoContainer = infoContainer;
    this.#tripModel = tripModel;

    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    return [...this.#tripModel.points].sort(compareByDate);
  }

  get offers() {
    return this.#tripModel.offers;
  }

  get destinations() {
    return this.#tripModel.destinations;
  }

  init() {
    const title = this.#getDestinationsTrip({
      points: this.points,
      destinations: this.destinations,
    });
    const startDateFirstPoint = this.#getStartDateFirstPoint({
      points: this.points,
    });
    const endDateLastPoint = this.#getEndDateLastPoint({
      points: this.points,
    });
    const costValue = this.#getCostValueTrip({
      points: this.points,
      offers: this.offers,
    });
    const prevInfoComponent = this.#infoComponent;

    this.#infoComponent = new InfoView({
      title,
      startDate: startDateFirstPoint,
      endDate: endDateLastPoint,
      costValue,
    });

    if (prevInfoComponent === null) {
      render(
        this.#infoComponent,
        this.#infoContainer,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  #isEmptyTrip = (points) => points.length === 0;

  #getDestinationsTrip({ points, destinations }) {
    if (this.#isEmptyTrip(points)) {
      return;
    }

    const titles = points.map(
      ({ destination: destinationId }) =>
        getDestinationById({ destinations, destinationId }).name
    );

    if (points.length < 3) {
      return titles.join(' — ');
    }

    return `${titles[0]} — ... — ${titles[titles.length - 1]}`;
  }

  #getStartDateFirstPoint({ points }) {
    if (this.#isEmptyTrip(points)) {
      return;
    }

    const startDate = humanizeDateFormat(
      points[0].dateFrom,
      DateFormat.SHORT_TEMPLATE
    );
    return startDate;
  }

  #getEndDateLastPoint({ points }) {
    if (this.#isEmptyTrip(points)) {
      return;
    }

    const endDate = humanizeDateFormat(
      points[points.length - 1].dateTo,
      DateFormat.SHORT_TEMPLATE
    );
    return endDate;
  }

  #getCostValueTrip({ points, offers }) {
    if (this.#isEmptyTrip(points)) {
      return;
    }

    const allPrices = points.reduce((prevPrices, point) => {
      const pointPrices = getSelectedOffersByType({
        point,
        offers,
      }).map(({ price }) => price);

      return [...prevPrices, ...pointPrices];
    }, []);

    const sumAllPrices = allPrices.reduce(
      (prevValue, price) => (prevValue += price),
      0
    );

    const costValue = points.reduce(
      (prevValue, point) => (prevValue += point.basePrice),
      0
    );

    return (costValue + sumAllPrices).toString();
  }

  #handleModelEvent = () => {
    this.init();
  };
}
