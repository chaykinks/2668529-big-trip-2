import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    id: 'point-1',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'dest-1', // Amsterdam
    isFavorite: false,
    offers: ['of-taxi-1', 'of-taxi-2'], // ID из mockOffers
    type: 'taxi',
  },
  {
    id: 'point-2',
    basePrice: 1300,
    dateFrom: '2019-06-10T22:55:56.845Z',
    dateTo: '2019-06-11T11:22:13.375Z',
    destination: 'dest-2', // Geneva
    isFavorite: false,
    offers: ['of-bus-1'], // ID из mockOffers
    type: 'bus',
  },
  {
    id: 'point-3',
    basePrice: 2500,
    dateFrom: '2019-08-10T22:55:56.845Z',
    dateTo: '2019-08-11T11:22:13.375Z',
    destination: 'dest-3', // Chamonix
    isFavorite: true,
    offers: ['of-drive-1'], // ID из mockOffers
    type: 'drive',
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { mockPoints, getRandomPoint };
