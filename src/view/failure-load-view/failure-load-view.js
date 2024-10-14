import AbstractView from '../../framework/view/abstract-view';
import { createFailureLoadTemplate } from './template';

export default class FailureLoadView extends AbstractView {
  get template() {
    return createFailureLoadTemplate();
  }
}
