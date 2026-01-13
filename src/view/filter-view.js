import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const { type, count } = filter;
  const labelText = type.charAt(0).toUpperCase() + type.slice(1);
  const isChecked = type === currentFilterType ? 'checked' : '';
  const isDisabled = count === 0 ? 'disabled' : '';

  return `
    <div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"
        ${isChecked}
        ${isDisabled}>
      <label class="trip-filters__filter-label" for="filter-${type}">
        ${labelText}
      </label>
    </div>
  `;
}

function createFilterTemplate(filters, currentType) {
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter, currentType)).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = FilterType.EVERYTHING;

  constructor({ filters, currentFilterType = FilterType.EVERYTHING }) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }
}
