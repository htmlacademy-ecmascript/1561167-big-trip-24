import { TypeTextMessage } from '../../const';

const createNoPointsTemplate = (filterType) =>
  `<p class="trip-events__msg">${TypeTextMessage[filterType]}</p>`;

export default createNoPointsTemplate;
