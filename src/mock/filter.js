import { filterBy } from '../utils/filter.js';

function generateFilter(points) {
  return Object.entries(filterBy).map(([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints(points).length,
  }));
}

export { generateFilter };
