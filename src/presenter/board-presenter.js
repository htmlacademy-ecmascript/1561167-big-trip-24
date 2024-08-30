import { render } from '../render';
import { getDestinationById } from '../utils';
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

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());

    render(this.pointListComponent, this.boardComponent.getElement());
    render(
      new PointEditView({ isNewPoint: true }),
      this.pointListComponent.getElement()
    );

    this.boardPoints.forEach((point) => {
      const destination = getDestinationById({
        destinations: this.tripModel.getDestinations(),
        destinationId: point.destination,
      });
      const offers = this.tripModel.getOffers();

      render(
        new PointView({
          point,
          destination,
          offers,
        }),
        this.pointListComponent.getElement()
      );
    });

    render(new PointEditView(), this.pointListComponent.getElement());
  };
}
