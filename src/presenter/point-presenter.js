import { render, replace, RenderPosition } from '../framework/render.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';

export default class PointPresenter {
  #eventList = null;
  #point = null;
  #pointsModel = null;
  #pointView = null;
  #formView = null;
  #onModeChange = null;
  #onDataChange = null;

  constructor({ eventList, pointsModel, onModeChange, onDataChange }) {
    this.#eventList = eventList;
    this.#pointsModel = pointsModel;
    this.#onModeChange = onModeChange;
    this.#onDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const destination = this.#pointsModel.getDestinationById(point.destination);
    const offers = this.#pointsModel.getOffersByType(point.type).filter((offer) => point.offers.includes(offer.id));
    const formOffers = this.#pointsModel.getOffersByType(point.type);

    this.#pointView = new PointView({
      point,
      offers,
      destination,
      onEditClick: () => this.#replacePointToForm()
    });

    this.#formView = new FormView({
      point,
      offers: formOffers,
      selectedOffers: point.offers,
      destination,
      isNew: false,
      onSubmit: () => this.#replaceFormToPoint(),
      onRollupClick: () => this.#replaceFormToPoint()
    });

    render(this.#pointView, this.#eventList.element, RenderPosition.BEFOREEND);
  }

  #replacePointToForm() {
    replace(this.#formView, this.#pointView);
    document.addEventListener('keydown', this.#handleFormEscKeyDown);
  }

  #replaceFormToPoint() {
    replace(this.#pointView, this.#formView);
    document.removeEventListener('keydown', this.#handleFormEscKeyDown);
  }

  #handleFormEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.#replaceFormToPoint();
    }
  };
}
