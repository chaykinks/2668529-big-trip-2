import {remove, render, RenderPosition} from '../framework/render.js';
import FormView from '../view/form-view.js';
import {UserAction, UpdateType, POINTS_TYPE} from '../const.js';

const BLANK_POINT = {
  id: null,
  type: POINTS_TYPE[0],
  destination: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  basePrice: 0,
  offers: []
};

export default class NewPointPresenter {
  #eventList = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #formView = null;
  #pointsModel = null;
  #allDestinations = null;

  constructor({ eventList, onDataChange, onDestroy, pointsModel, allDestinations }) {
    this.#eventList = eventList;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#pointsModel = pointsModel;
    this.#allDestinations = allDestinations;
  }

  init() {
    if (this.#formView !== null) {
      return;
    }

    this.#formView = new FormView({
      point: BLANK_POINT,
      offers: [],
      selectedOffers: [],
      destination: null,
      pointsModel: this.#pointsModel,
      allDestinations: this.#allDestinations,
      onSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleRollupClick,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#formView, this.#eventList.element, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#formView === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#formView);
    this.#formView = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
    this.destroy();
  };

  #handleRollupClick = () => {
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
