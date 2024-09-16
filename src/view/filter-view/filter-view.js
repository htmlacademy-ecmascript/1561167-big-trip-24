import AbstractView from '../../framework/view/abstract-view';
import { createFilterTemplate } from './template';

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
