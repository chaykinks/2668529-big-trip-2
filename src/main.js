import FilterView from './view/filter-view.js';
import {render} from './render.js';

const filterElement = document.querySelector('.trip-controls__filters');

render(new FilterView(), filterElement);
