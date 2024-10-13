import AbstractView from '../../framework/view/abstract-view';
import { createLoadingTripTemplate } from './template';

export default class LoadingTripView extends AbstractView {
  get template() {
    return createLoadingTripTemplate();
  }
}
