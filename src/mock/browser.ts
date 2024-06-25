import { setupWorker } from 'msw/browser';
import { banners } from './banner';
import { addReview, reviewForMain, reviewsById } from './review';

const handlers = [reviewsById, addReview, reviewForMain, banners];

export const worker = setupWorker(...handlers);
