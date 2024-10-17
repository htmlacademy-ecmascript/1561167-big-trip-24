import { remove, render, RenderPosition } from '../framework/render';
import {
  compareByDate,
  getDestinationById,
  getSelectedOffersByType,
  humanizeDateFormat,
} from '../utils/utils';
import InfoView from '../view/info-view.js/info-view';
import { DateFormat, UpdateType } from '../const';

export default class InfoPresenter {
  #infoContainer = null;

  #tripModel = null;
  #points = [];
  #offers = [];
  #destinations = [];

  #infoComponent = null;

  #title = '';
  #startDateFirstPoint = '';
  #endDateLastPoint = '';
  #costValue = 0;

  constructor({ infoContainer, tripModel }) {
    this.#infoContainer = infoContainer;
    this.#tripModel = tripModel;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  init() {
    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  #calculateIndicators() {
    this.#title = this.#getDestinationsTrip({
      points: this.points,
      destinations: this.destinations,
    });
    this.#startDateFirstPoint = this.#getStartDateFirstPoint({
      points: this.points,
    });
    this.#endDateLastPoint = this.#getEndDateLastPoint({
      points: this.points,
    });
    this.#costValue = this.#getCostValueTrip({
      points: this.points,
      offers: this.offers,
    });
  }

  #renderInfo() {
    this.#infoComponent = new InfoView({
      title: this.#title,
      startDate: this.#startDateFirstPoint,
      endDate: this.#endDateLastPoint,
      costValue: this.#costValue,
    });
    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #clearInfo() {
    if (this.#infoComponent !== null) {
      remove(this.#infoComponent);
    }
  }

  #isEmptyTrip(points) {
    return points.length === 0;
  }

  #getDestinationsTrip({ points, destinations }) {
    if (this.#isEmptyTrip(points)) {
      return;
    }

    const titles = points.map(
      ({ destination: destinationId }) =>
        getDestinationById({ destinations, destinationId }).name
    );

    if (points.length <= 3) {
      for (let i = 3 - points.length; i > 0; i--) {
        titles.unshift(titles[0]);
      }
      return titles.join(' — ');
    }

    return `${titles[0]} — ... — ${titles[titles.length - 1]}`;
  }

  #getStartDateFirstPoint({ points }) {
    const startDate = humanizeDateFormat(
      points[0].dateFrom,
      DateFormat.SHORT_TEMPLATE
    );
    return startDate;
  }

  #getEndDateLastPoint({ points }) {
    const endDate = humanizeDateFormat(
      points[points.length - 1].dateTo,
      DateFormat.SHORT_TEMPLATE
    );
    return endDate;
  }

  #getCostValueTrip({ points, offers }) {
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

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.FAILURE) {
      return;
    }
    this.#points = [...this.#tripModel.points].sort(compareByDate);
    this.#offers = this.#tripModel.offers;
    this.#destinations = this.#tripModel.destinations;

    this.#clearInfo();
    if (!this.#isEmptyTrip(this.points)) {
      this.#calculateIndicators();
      this.#renderInfo();
    }
  };
}
