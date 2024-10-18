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

  init() {
    this.#tripModel.addObserver(this.#handleModelEvent);
  }

  #calculateIndicators() {
    this.#title = this.#getDestinationsTrip();
    this.#startDateFirstPoint = this.#getStartDateFirstPoint();
    this.#endDateLastPoint = this.#getEndDateLastPoint();
    this.#costValue = this.#getCostValueTrip();
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

  #isEmptyTrip() {
    return this.#points.length === 0;
  }

  #getDestinationsTrip() {
    if (this.#isEmptyTrip()) {
      return;
    }

    const titles = this.#points.map(
      ({ destination: destinationId }) =>
        getDestinationById({ destinations: this.#destinations, destinationId })
          .name
    );

    if (this.#points.length <= 3) {
      return titles.join(' — ');
    }

    return `${titles[0]} — ... — ${titles[titles.length - 1]}`;
  }

  #getStartDateFirstPoint() {
    const startDate = humanizeDateFormat(
      this.#points[0].dateFrom,
      DateFormat.SHORT_TEMPLATE
    );
    return startDate;
  }

  #getEndDateLastPoint() {
    const endDate = humanizeDateFormat(
      this.#points[this.#points.length - 1].dateTo,
      DateFormat.SHORT_TEMPLATE
    );
    return endDate;
  }

  #getCostValueTrip() {
    const costOffers = this.#points.reduce((prevPrices, point) => {
      const pointPrices = getSelectedOffersByType({
        point,
        offers: this.#offers,
      }).map(({ price }) => price);

      return [...prevPrices, ...pointPrices];
    }, []);

    const sumCostOffers = costOffers.reduce(
      (prevValue, price) => (prevValue += price),
      0
    );

    const summBasePrice = this.#points.reduce(
      (prevValue, point) => (prevValue += point.basePrice),
      0
    );

    return summBasePrice + sumCostOffers;
  }

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.FAILURE) {
      return;
    }
    this.#points = [...this.#tripModel.points].sort(compareByDate);
    this.#offers = this.#tripModel.offers;
    this.#destinations = this.#tripModel.destinations;

    this.#clearInfo();
    if (!this.#isEmptyTrip()) {
      this.#calculateIndicators();
      this.#renderInfo();
    }
  };
}
