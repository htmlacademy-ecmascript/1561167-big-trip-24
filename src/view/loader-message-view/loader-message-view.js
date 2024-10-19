import AbstractView from '../../framework/view/abstract-view';
import { createLoaderMessageTemplate } from './template';

export default class LoaderMessageView extends AbstractView {
  #message = '';

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createLoaderMessageTemplate(this.#message);
  }
}
