import AdapterService from './adapter-service';
import { Method, UrlHandle } from './const';
import ApiService from './framework/api-service';

export default class TripApiService extends ApiService {
  #adapterService = new AdapterService();

  get points() {
    return this._load({ url: UrlHandle.READ_POINTS }).then(
      ApiService.parseResponse
    );
  }

  get offers() {
    return this._load({ url: UrlHandle.READ_OFFERS }).then(
      ApiService.parseResponse
    );
  }

  get destinations() {
    return this._load({ url: UrlHandle.READ_DESTINATIONS }).then(
      ApiService.parseResponse
    );
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${UrlHandle.UPDATE}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adapterService.adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async createPoint(point) {
    const response = await this._load({
      url: `${UrlHandle.CREATE}`,
      method: Method.POST,
      body: JSON.stringify(this.#adapterService.adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `${UrlHandle.DELETE}/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }
}
