import { Banner } from '@/models/banner.model';
import { http, HttpResponse } from 'msw';

const bannersData: Banner[] = [
  {
    id: 1,
    title: '배너 1 제목',
    description: 'banner 1 description',
    image: 'https://picsum.photos/id/111/1200/400',
    url: 'http://some.url',
    target: '_blank',
  },
  {
    id: 2,
    title: '배너 2 제목',
    description: 'banner 1 description',
    image: 'https://picsum.photos/id/222/1200/400',
    url: 'http://some.url',
    target: '_self',
  },
  {
    id: 1,
    title: '배너 3 제목',
    description: 'banner 3 description',
    image: 'https://picsum.photos/id/3/1200/400',
    url: 'http://some.url',
    target: '_blank',
  },
];
export const banners = http.get('http://localhost:9999/banners', () => {
  return HttpResponse.json(bannersData, {
    status: 200,
  });
});
