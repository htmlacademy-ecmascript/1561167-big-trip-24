import { BLANK_POINT } from '../const';
import { render } from '../render';
import BoardView from '../view/board-view';
import PointEditView from '../view/point-edit-view';
import PointListView from '../view/point-list-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';

export default class BoardPresenter {
  boardComponent = new BoardView();
  pointListComponent = new PointListView();

  constructor({ boardContainer, tripModel }) {
    this.boardContainer = boardContainer;
    this.tripModel = tripModel;
  }

  init = () => {
    this.boardPoints = [...this.tripModel.getPoints()];
    this.offers = this.tripModel.getOffers();
    this.destinations = this.tripModel.getDestinations();

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());

    render(this.pointListComponent, this.boardComponent.getElement());
    render(
      new PointEditView({
        point: BLANK_POINT,
        destinations: this.destinations,
        offers: this.offers,
        isNewPoint: true,
      }),
      this.pointListComponent.getElement()
    );

    this.boardPoints.forEach((point) => {
      render(
        new PointView({
          point,
          destinations: this.destinations,
          offers: this.offers,
        }),
        this.pointListComponent.getElement()
      );
    });
    // debugger;
    render(
      new PointEditView({
        point: this.boardPoints[1],
        destinations: this.destinations,
        offers: this.offers,
        isNewPoint: true,
      }),
      this.pointListComponent.getElement()
    );
  };
}
