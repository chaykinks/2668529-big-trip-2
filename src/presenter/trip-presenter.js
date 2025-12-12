import { render, RenderPosition } from '../render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import NewFormView from '../view/new-form-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';

export default class TripPresenter {
  constructor({filtersContainer, tripEventsContainer, pointsModel}) {
    this.filtersContainer = filtersContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];
    render(new FilterView(), this.filtersContainer, RenderPosition.BEFOREEND);
    render(new SortView(), this.tripEventsContainer, RenderPosition.AFTERBEGIN);
    render(new NewFormView({}), this.tripEventsContainer);
    this.eventList = new EventListView();
    render(this.eventList, this.tripEventsContainer);
    for (let i = 0; i < this.tripPoints.length; i++) {
      const point = this.tripPoints[i];
      const destination = this.pointsModel.getDestinationById(point.destination);
      const offers = this.pointsModel.getOffersByType(point.type)
        .filter((offer) => point.offers.includes(offer.id));
      render(new EventView({point, offers, destination}),  this.eventList.getElement());
    }
  }
}
