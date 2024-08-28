import { render } from '../render';
import BoardView from '../view/board-view';
import PointEditView from '../view/point-edit-view';
import PointListView from '../view/point-list-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';

export default class BoardPresenter {
  boardComponent = new BoardView();
  pointListComponent = new PointListView();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init = () => {
    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());

    render(this.pointListComponent, this.boardComponent.getElement());
    render(new PointEditView(), this.pointListComponent.getElement());

    for (let index = 0; index < 3; index++) {
      render(new PointView(), this.pointListComponent.getElement());
    }
  };
}
