import Observable from '../framework/observable.js';
import { mockOffers } from '../mock/offers.js';

export default class OffersModel extends Observable {
  #offers = [];

  constructor() {
    super();
    this.#offers = mockOffers;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    const offerGroup = this.#offers.find((offer) => offer.type === type);
    return offerGroup ? offerGroup.offers : [];
  }
}
