import { FilterType } from '../const';
import { isPointFuture, isPointPast, isPointPresent } from './utils';

const filterBy = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) =>
    points.filter((point) => isPointFuture(point)),
  [FilterType.PRESENT]: (points) =>
    points.filter((point) => isPointPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point)),
};

export { filterBy };
