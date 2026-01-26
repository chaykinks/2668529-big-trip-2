import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destinations.js';

export default class DestinationsModel extends Observable {
  #destinations = [];

  constructor() {
    super();
    this.#destinations = mockDestinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
